"use client";

import { useEffect, useRef, useState } from "react";
import type Matter from "matter-js";

/*
 * Tags that rain down like bricks when the section scrolls into view. A small
 * matter-js world (ground, walls, open top) drives DOM chips: each chip is
 * measured, turned into a pill-shaped rigid body, dropped from above the
 * clipped area one after another, and its transform is synced every frame, so
 * the chips bounce, collide and settle into a pile without overlapping.
 * Once a chip has come to rest it is put to sleep, so the heap holds perfectly
 * still. On desktop the cursor carries a small, invisible disc through the
 * world, so chips lean and shuffle out of its way, and pressing near a chip
 * picks it up to drag and fling. Touch devices only watch (so swipes keep
 * scrolling the page). Reduced motion gets a static, wrapped arrangement.
 */

/** Chips drawn as filled accent pills; the rest are bordered. */
const FILLED = new Set([2, 6, 11, 14, 16, 21]);
/** Chips shown on phones (<640px), so the heap isn't crowded. */
const PHONE_COUNT = 14;
const STEP = 1000 / 60;
const SPAWN_GAP = 80; // ms of sim time between drops
const GROUND_GAP = 14; // px between the area's bottom edge and the ground (room for the shadow)
const WALL_CATEGORY = 0x0002;
const CURSOR_RADIUS = 26; // px: the invisible disc the cursor carries through the heap
const CURSOR_STEP = 14; // px the disc may travel per step while catching up (keeps shoves gentle)
const GRAB_REACH = 10; // px beyond the disc a press can still pick a chip up
const MAX_SPEED = 22; // cap on chip velocity (px per step)
const EDGE_SLACK = 1.5; // px a chip may sink into a wall before contain() steps in
const SETTLE_SPEED = 0.18; // below this speed (px per step) a chip counts as resting...
const SETTLE_SPIN = 0.004; // ...and below this spin (rad per step)...
const SETTLE_STEPS = 24; // ...for this many steps in a row, then it is put to sleep
const PARKED = { x: -5000, y: -5000 };

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
      const { Engine, Bodies, Body, Composite, Constraint, Events, Sleeping } = M;
      // The runtime takes an `updateVelocity` flag the typings leave out.
      const setPosition = Body.setPosition as (body: Matter.Body, position: Matter.Vector, updateVelocity?: boolean) => void;

      type Chip = { el: HTMLDivElement; pill: HTMLElement; i: number; w: number; h: number; body: Matter.Body; added: boolean; entered: boolean; spawnAt: number; lastHit: number; calm: number };
      let engine: Matter.Engine | null = null;
      let chips: Chip[] = [];
      let walls: Matter.Body[] = [];
      let cursorBody: Matter.Body | null = null;
      let simTime = 0;
      let acc = 0;
      let last = 0;
      let raf = 0;
      let visible = false;
      let started = false;
      let builtWidth = 0;
      let builtPhone = false;

      // Pointer state, in area coordinates. `aim` is where the cursor disc is
      // heading (null = parked off-world); `grab` is the drag spring, if any.
      const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
      let aim: { x: number; y: number } | null = null;
      let grab: { constraint: Matter.Constraint; pointA: { x: number; y: number }; chip: Chip } | null = null;

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
          if (bodyA === cursorBody || bodyB === cursorBody) continue;
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
        cursorBody = null;
        grab = null;
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
        ];
        Composite.add(engine.world, walls);
        if (fine) {
          cursorBody = Bodies.circle(PARKED.x, PARKED.y, CURSOR_RADIUS, { isStatic: true, restitution: 0.1, friction: 0.05 });
          Composite.add(engine.world, cursorBody);
        }

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
          chips.push({ el, pill, i, w, h, body, added: false, entered: false, spawnAt: n * SPAWN_GAP, lastHit: -1e9, calm: 0 });
        });

        Events.on(engine, "collisionStart", onCollide);
      };

      const place = (c: Chip) => {
        const b = c.body;
        c.el.style.transform = `translate3d(${b.position.x - c.w / 2}px, ${b.position.y - c.h / 2}px, 0) rotate(${b.angle}rad)`;
      };

      const sync = () => {
        for (const c of chips) {
          if (c.added && !c.body.isSleeping) place(c);
        }
      };

      // Keep chips inside the visible box: a hard drag, fling or cursor shove
      // can outrun the walls (or tunnel through them), so pull any escaping chip
      // back in. Resting contacts sink a hair into the walls, so small overlaps
      // are left to the solver (correcting those every step is what made the
      // heap shiver). The top only applies once a chip has dropped in.
      const contain = () => {
        const W = root.clientWidth;
        const floor = root.clientHeight - GROUND_GAP;
        for (const c of chips) {
          if (!c.added || c.body.isSleeping) continue;
          const b = c.body;
          const { min, max } = b.bounds;
          if (!c.entered && min.y >= 0) c.entered = true;
          let dx = 0;
          let dy = 0;
          if (min.x < -EDGE_SLACK) dx = -min.x;
          else if (max.x > W + EDGE_SLACK) dx = W - max.x;
          if (max.y > floor + EDGE_SLACK) dy = floor - max.y;
          else if (c.entered && min.y < -EDGE_SLACK) dy = -min.y;
          if (!dx && !dy) continue;
          Body.translate(b, { x: dx, y: dy });
          Body.setVelocity(b, {
            x: dx ? Math.abs(b.velocity.x) * Math.sign(dx) * 0.3 : b.velocity.x,
            y: dy ? Math.abs(b.velocity.y) * Math.sign(dy) * 0.3 : b.velocity.y,
          });
        }
      };

      /** Gap between the cursor disc's centre and a chip's outline (0 = inside it). */
      const gapTo = (c: Chip, p: { x: number; y: number }) => {
        const b = c.body;
        const cos = Math.cos(-b.angle);
        const sin = Math.sin(-b.angle);
        const dx = p.x - b.position.x;
        const dy = p.y - b.position.y;
        const lx = Math.abs(dx * cos - dy * sin) - c.w / 2;
        const ly = Math.abs(dx * sin + dy * cos) - c.h / 2;
        return Math.hypot(Math.max(0, lx), Math.max(0, ly));
      };

      // Put chips to rest once they've barely moved for a moment. Matter's own
      // sleeping rarely kicks in for a stacked heap, which leaves the pile
      // shimmering forever; a sleeping chip holds perfectly still. Chips near
      // the cursor or in a drag stay awake so they can still react.
      const settle = () => {
        const c0 = cursorBody;
        for (const c of chips) {
          const b = c.body;
          if (!c.added || b.isSleeping) continue;
          const near = !!c0 && c0.position.x !== PARKED.x && gapTo(c, c0.position) < CURSOR_RADIUS + 12;
          if (grab?.chip === c || near || b.speed > SETTLE_SPEED || Math.abs(b.angularVelocity) > SETTLE_SPIN) {
            c.calm = 0;
            continue;
          }
          if (++c.calm < SETTLE_STEPS) continue;
          c.calm = 0;
          place(c);
          Sleeping.set(b, true);
        }
      };

      // A moving chip wakes any sleeping chip it touches, so nothing is left
      // hanging in mid-air when the chip holding it up gets pushed away.
      const wakeNeighbours = () => {
        for (const a of chips) {
          if (!a.added || a.body.isSleeping || a.body.speed < 0.4) continue;
          const A = a.body.bounds;
          for (const c of chips) {
            if (c === a || !c.added || !c.body.isSleeping) continue;
            const B = c.body.bounds;
            if (A.min.x - 6 < B.max.x && A.max.x + 6 > B.min.x && A.min.y - 6 < B.max.y && A.max.y + 6 > B.min.y) {
              Sleeping.set(c.body, false);
            }
          }
        }
      };

      /** Walk the cursor disc toward the pointer, so chips part around it. */
      const moveCursor = () => {
        const c0 = cursorBody;
        if (!c0) return;
        if (!aim || grab) {
          if (c0.position.x !== PARKED.x) {
            setPosition(c0, PARKED, false);
            Body.setVelocity(c0, { x: 0, y: 0 });
          }
          return;
        }
        if (c0.position.x === PARKED.x) {
          setPosition(c0, aim, false); // arriving: appear in place, no momentum
        } else {
          const dx = aim.x - c0.position.x;
          const dy = aim.y - c0.position.y;
          const d = Math.hypot(dx, dy);
          const k = d > CURSOR_STEP ? CURSOR_STEP / d : 1;
          setPosition(c0, { x: c0.position.x + dx * k, y: c0.position.y + dy * k }, true);
        }
        // Static bodies never wake sleepers, so wake whatever the disc is about to touch.
        for (const c of chips) {
          if (c.added && c.body.isSleeping && gapTo(c, c0.position) < CURSOR_RADIUS + 8) Sleeping.set(c.body, false);
        }
      };

      /** Cap chip speed so shoves and flings stay playful and never tunnel out. */
      const limit = () => {
        for (const c of chips) {
          const b = c.body;
          if (!c.added || b.isSleeping || b.speed <= MAX_SPEED) continue;
          const k = MAX_SPEED / b.speed;
          Body.setVelocity(b, { x: b.velocity.x * k, y: b.velocity.y * k });
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
          moveCursor();
          // Rolling resistance: bleed off spin so chips tilt and settle
          // instead of slowly rolling over onto their backs.
          for (const c of chips) {
            if (c.added && !c.body.isSleeping) Body.setAngularVelocity(c.body, c.body.angularVelocity * 0.95);
          }
          Engine.update(engine, STEP);
          limit();
          contain();
          wakeNeighbours();
          settle();
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

      const toLocal = (e: MouseEvent) => {
        const rect = root.getBoundingClientRect();
        return { x: e.clientX - rect.left, y: e.clientY - rect.top };
      };
      /** The closest chip a press at `p` would pick up, if any is in reach. */
      const nearest = (p: { x: number; y: number }) => {
        let best: Chip | null = null;
        let bestD = CURSOR_RADIUS + GRAB_REACH;
        for (const c of chips) {
          if (!c.added) continue;
          const d = gapTo(c, p);
          if (d < bestD) {
            best = c;
            bestD = d;
          }
        }
        return best;
      };

      const onMove = (e: MouseEvent) => {
        if (!engine) return;
        const p = toLocal(e);
        aim = p;
        if (grab) return;
        if (nearest(p)) root.dataset.cursor = "Drag";
        else delete root.dataset.cursor;
      };
      const onLeave = () => {
        if (grab) return;
        aim = null;
        delete root.dataset.cursor;
      };
      const onDown = (e: MouseEvent) => {
        if (e.button !== 0 || !engine) return;
        const p = toLocal(e);
        const c = nearest(p);
        if (!c) return;
        e.preventDefault(); // no text selection while dragging
        const pointA = { ...p };
        const constraint = Constraint.create({ pointA, bodyB: c.body, length: 0, stiffness: 0.2, damping: 0.1 });
        Composite.add(engine.world, constraint);
        Sleeping.set(c.body, false);
        grab = { constraint, pointA, chip: c };
        root.dataset.cursor = "Drag";
      };
      // Drags follow the pointer on the window, but the spring's anchor stays
      // inside the area so a dragged chip can't be pulled out of it.
      const onWindowMove = (e: MouseEvent) => {
        if (!grab) return;
        const p = toLocal(e);
        grab.pointA.x = Math.min(root.clientWidth, Math.max(0, p.x));
        grab.pointA.y = Math.min(root.clientHeight - GROUND_GAP, Math.max(0, p.y));
        Sleeping.set(grab.chip.body, false);
      };
      const onWindowUp = (e: MouseEvent) => {
        if (!grab) return;
        if (engine) Composite.remove(engine.world, grab.constraint);
        grab = null;
        if (!root.contains(e.target as Node)) {
          aim = null;
          delete root.dataset.cursor;
        }
      };
      if (fine) {
        root.addEventListener("mousemove", onMove, { passive: true });
        root.addEventListener("mouseleave", onLeave, { passive: true });
        root.addEventListener("mousedown", onDown);
        window.addEventListener("mousemove", onWindowMove, { passive: true });
        window.addEventListener("mouseup", onWindowUp, { passive: true });
      }

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
        root.removeEventListener("mousemove", onMove);
        root.removeEventListener("mouseleave", onLeave);
        root.removeEventListener("mousedown", onDown);
        window.removeEventListener("mousemove", onWindowMove);
        window.removeEventListener("mouseup", onWindowUp);
        delete root.dataset.cursor;
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
