"use client";

import { useEffect, useRef, useState } from "react";
import type Matter from "matter-js";

/*
 * Tags that rain down like bricks when the section scrolls into view. A small
 * matter-js world (ground, walls, open top) drives DOM chips: each chip is
 * measured, turned into a pill-shaped rigid body, dropped from above the
 * clipped area one after another, and its transform is synced every frame, so
 * the chips bounce, collide and settle into a pile without overlapping.
 * Desktop users can drag and fling chips; touch devices only watch (so swipes
 * keep scrolling the page). Reduced motion gets a static, wrapped arrangement.
 */

/** Chips drawn as filled accent pills; the rest are bordered. */
const FILLED = new Set([2, 6, 11, 14, 16, 21]);
/** Chips shown on phones (<640px), so the heap isn't crowded. */
const PHONE_COUNT = 14;
const STEP = 1000 / 60;
const SPAWN_GAP = 80; // ms of sim time between drops
const GROUND_GAP = 14; // px between the area's bottom edge and the ground (room for the shadow)
const WALL_CATEGORY = 0x0002;

function pillClass(i: number) {
  return `inline-flex items-center whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium shadow-[0_6px_16px_-10px_rgb(0_0_0/0.35)] sm:px-7 sm:py-3 sm:text-base ${
    FILLED.has(i) ? "border-transparent bg-accent text-accent-fg" : "border-border-strong bg-surface text-fg"
  }`;
}

/** Small seeded PRNG, so every drop looks the same. */
function seeded(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function TagPile({ tags }: { tags: string[] }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const chipRefs = useRef<(HTMLDivElement | null)[]>([]);
  // null until mounted: physics only ever runs client-side.
  const [reduced, setReduced] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reduced !== false) return;
    const root = rootRef.current;
    if (!root) return;

    let cancelled = false;
    let cleanup = () => {};

    import("matter-js").then((M) => {
      if (cancelled) return;
      const { Engine, Bodies, Body, Composite, Events, Mouse, MouseConstraint } = M;

      type Chip = { el: HTMLDivElement; pill: HTMLElement; i: number; w: number; h: number; body: Matter.Body; added: boolean; spawnAt: number; lastHit: number };
      let engine: Matter.Engine | null = null;
      let chips: Chip[] = [];
      let walls: Matter.Body[] = [];
      let simTime = 0;
      let acc = 0;
      let last = 0;
      let raf = 0;
      let visible = false;
      let started = false;
      let builtWidth = 0;
      let builtPhone = false;

      const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
      const mouse = fine ? Mouse.create(root) : null;
      const handlers = mouse as unknown as Record<string, EventListener> | null;
      const onWindowMove = (e: MouseEvent) => handlers?.mousemove(e);
      const onWindowUp = (e: MouseEvent) => handlers?.mouseup(e);
      if (mouse) {
        // Matter's listeners would swallow wheel/touch scrolling; drop them and
        // track move/up on the window so a drag can leave the area.
        const el = mouse.element as HTMLElement;
        const m = mouse as unknown as Record<string, EventListener>;
        el.removeEventListener("wheel", m.mousewheel);
        el.removeEventListener("mousewheel", m.mousewheel);
        el.removeEventListener("DOMMouseScroll", m.mousewheel);
        el.removeEventListener("touchmove", m.mousemove);
        el.removeEventListener("touchstart", m.mousedown);
        el.removeEventListener("touchend", m.mouseup);
        el.removeEventListener("mousemove", m.mousemove);
        el.removeEventListener("mouseup", m.mouseup);
        window.addEventListener("mousemove", onWindowMove, { passive: true });
        window.addEventListener("mouseup", onWindowUp, { passive: true });
      }

      const puff = (x: number, y: number, strength: number) => {
        const dust = document.createElement("span");
        dust.className = "pile-dust";
        dust.style.left = `${x}px`;
        dust.style.top = `${y}px`;
        root.appendChild(dust);
        const s = Math.min(1.8, 0.9 + strength * 0.08);
        dust
          .animate(
            [
              { transform: "translate(-50%, -50%) scale(0.3)", opacity: 0.55 },
              { transform: `translate(-50%, -60%) scale(${s})`, opacity: 0 },
            ],
            { duration: 420, easing: "cubic-bezier(0.2, 0.7, 0.3, 1)" },
          )
          .finished.then(
            () => dust.remove(),
            () => dust.remove(),
          );
      };

      const onCollide = (event: Matter.IEventCollision<Matter.Engine>) => {
        for (const pair of event.pairs) {
          const { bodyA, bodyB, collision } = pair;
          const rel = { x: bodyA.velocity.x - bodyB.velocity.x, y: bodyA.velocity.y - bodyB.velocity.y };
          const speed = Math.abs(rel.x * collision.normal.x + rel.y * collision.normal.y);
          if (speed < 3.5) continue;
          for (const body of [bodyA, bodyB]) {
            const chip = chips.find((c) => c.body === body);
            if (!chip || simTime - chip.lastHit < 180) continue;
            chip.lastHit = simTime;
            const k = Math.min(1, speed / 14);
            chip.pill.animate(
              [{ scale: "1 1" }, { scale: `${1 + 0.05 * k} ${1 - 0.1 * k}` }, { scale: "1 1" }],
              { duration: 260, easing: "ease-out" },
            );
          }
          const ground = walls[0];
          if ((bodyA === ground || bodyB === ground) && collision.supports[0]) {
            puff(collision.supports[0].x, collision.supports[0].y, speed);
          }
        }
      };

      const teardownWorld = () => {
        if (!engine) return;
        Events.off(engine, "collisionStart", onCollide);
        Composite.clear(engine.world, false, true);
        Engine.clear(engine);
        engine = null;
      };

      const build = () => {
        teardownWorld();
        const W = root.clientWidth;
        const H = root.clientHeight;
        builtWidth = W;
        builtPhone = window.innerWidth < 640;
        simTime = 0;
        acc = 0;

        engine = Engine.create({ enableSleeping: true, gravity: { x: 0, y: 1.5, scale: 0.001 } });
        engine.positionIterations = 10;
        engine.velocityIterations = 8;
        const T = 400;
        const wallOpts = { isStatic: true, friction: 0.8, restitution: 0.2, collisionFilter: { category: WALL_CATEGORY } };
        walls = [
          Bodies.rectangle(W / 2, H - GROUND_GAP + T / 2, W + 2 * T, T, wallOpts), // ground (index 0)
          Bodies.rectangle(-T / 2, H / 2 - 500, T, H + 1400, wallOpts),
          Bodies.rectangle(W + T / 2, H / 2 - 500, T, H + 1400, wallOpts),
          Bodies.rectangle(W / 2, -1000 - T / 2, W + 2 * T, T, wallOpts), // far-off ceiling for flung chips
        ];
        Composite.add(engine.world, walls);

        const rand = seeded(20240927);
        chips = [];
        chipRefs.current.forEach((el, i) => {
          if (!el || !el.offsetParent) return; // hidden on this breakpoint
          const pill = el.firstElementChild as HTMLElement;
          el.style.visibility = "hidden";
          const w = el.offsetWidth;
          const h = el.offsetHeight;
          const n = chips.length;
          // Golden-ratio spread keeps consecutive drops far apart.
          // Drop over the middle ~80% so the chips heap up rather than spread thin.
          const min = Math.max(w / 2 + 4, W * 0.1 + w / 2);
          const max = Math.max(min, Math.min(W - w / 2 - 4, W * 0.9 - w / 2));
          const frac = (0.17 + n * 0.618034 + (rand() - 0.5) * 0.08 + 1) % 1;
          const x = min + frac * (max - min);
          const angle = (rand() - 0.5) * 0.3;
          const spin = (rand() - 0.5) * 0.03;
          const body = Bodies.rectangle(x, -h / 2 - 12, w, h, {
            // Slightly flatter ends than the drawn pill so resting chips do not
            // roll over; the visual gap at the corners is a few px at most.
            chamfer: { radius: h * 0.4 },
            angle,
            restitution: 0.25,
            friction: 0.75,
            frictionStatic: 1.1,
            frictionAir: 0.012,
            density: 0.0018,
            slop: 0.02,
          });
          Body.setVelocity(body, { x: (rand() - 0.5) * 1.5, y: 5 });
          // Extra rotational inertia: chips still tilt and tip, but rarely roll
          // over onto their backs (upside-down labels read badly).
          Body.setInertia(body, body.inertia * 3);
          Body.setAngularVelocity(body, spin);
          chips.push({ el, pill, i, w, h, body, added: false, spawnAt: n * SPAWN_GAP, lastHit: -1e9 });
        });

        if (mouse) {
          const mc = MouseConstraint.create(engine, {
            mouse,
            constraint: { stiffness: 0.2, damping: 0.1, render: { visible: false } },
            collisionFilter: { category: 0x0001, mask: 0x0001 },
          });
          Composite.add(engine.world, mc);
        }
        Events.on(engine, "collisionStart", onCollide);
      };

      const sync = () => {
        for (const c of chips) {
          const b = c.body;
          if (!c.added || b.isSleeping) continue;
          c.el.style.transform = `translate3d(${b.position.x - c.w / 2}px, ${b.position.y - c.h / 2}px, 0) rotate(${b.angle}rad)`;
        }
      };

      const spawnDue = () => {
        if (!engine) return;
        for (const c of chips) {
          if (c.added || simTime < c.spawnAt) continue;
          c.added = true;
          Composite.add(engine.world, c.body);
          c.el.style.visibility = "visible";
        }
      };

      const frame = (t: number) => {
        raf = requestAnimationFrame(frame);
        if (!engine) return;
        acc += Math.min(100, t - (last || t));
        last = t;
        let steps = 0;
        while (acc >= STEP && steps < 4) {
          spawnDue();
          // Rolling resistance: bleed off spin so chips tilt and settle
          // instead of slowly rolling over onto their backs.
          for (const c of chips) {
            if (c.added && !c.body.isSleeping) Body.setAngularVelocity(c.body, c.body.angularVelocity * 0.95);
          }
          Engine.update(engine, STEP);
          simTime += STEP;
          acc -= STEP;
          steps++;
        }
        if (steps === 4) acc = 0;
        sync();
      };

      const play = () => {
        if (raf) return;
        last = 0;
        raf = requestAnimationFrame(frame);
      };
      const pause = () => {
        cancelAnimationFrame(raf);
        raf = 0;
      };

      const io = new IntersectionObserver(
        ([entry]) => {
          visible = entry.isIntersecting;
          if (visible && !started) {
            started = true;
            build();
          }
          if (visible) play();
          else pause();
        },
        { threshold: 0.3 },
      );
      io.observe(root);

      // Re-drop when the width changes meaningfully (or crosses the phone breakpoint).
      const ro = new ResizeObserver(() => {
        if (!started) return;
        const phone = window.innerWidth < 640;
        if (Math.abs(root.clientWidth - builtWidth) > 24 || phone !== builtPhone) {
          build();
          if (visible) play();
        }
      });
      ro.observe(root);

      cleanup = () => {
        io.disconnect();
        ro.disconnect();
        pause();
        teardownWorld();
        window.removeEventListener("mousemove", onWindowMove);
        window.removeEventListener("mouseup", onWindowUp);
        if (mouse) {
          const el = mouse.element as HTMLElement;
          const m = mouse as unknown as Record<string, EventListener>;
          el.removeEventListener("mousedown", m.mousedown);
        }
        root.querySelectorAll(".pile-dust").forEach((d) => d.remove());
      };
    });

    return () => {
      cancelled = true;
      cleanup();
    };
  }, [reduced]);

  return (
    <div ref={rootRef} className="relative h-80 select-none overflow-hidden sm:h-[22rem]" aria-label="What we work on">
      <ul className="sr-only">
        {tags.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
      {reduced ? (
        <div aria-hidden="true" className="flex h-full flex-wrap content-end items-end justify-center gap-2 pb-4 sm:gap-3">
          {tags.map((tag, i) => (
            <span key={tag} className={`${i >= PHONE_COUNT ? "max-sm:hidden" : ""} ${pillClass(i)}`}>
              {tag}
            </span>
          ))}
        </div>
      ) : (
        tags.map((tag, i) => (
          <div
            key={tag}
            ref={(el) => {
              chipRefs.current[i] = el;
            }}
            aria-hidden="true"
            data-cursor="Drag"
            style={{ visibility: "hidden" }}
            className={`${i >= PHONE_COUNT ? "max-sm:hidden" : ""} absolute left-0 top-0 inline-block will-change-transform [@media(hover:hover)_and_(pointer:fine)]:cursor-grab [@media(hover:hover)_and_(pointer:fine)]:active:cursor-grabbing`}
          >
            <span className={pillClass(i)}>{tag}</span>
          </div>
        ))
      )}
    </div>
  );
}
