"use client";

import { useEffect, useRef, useState } from "react";
import type Matter from "matter-js";

/*
 * Decorative blocks for the CTA card. Same idea as TagPile, but quieter: when
 * the card scrolls into view, faint squares rain in and heap up to the level of
 * the button (the count is derived from that area, so the fill holds at every
 * width). The layer sits behind the copy and never takes pointer events; the
 * host card's mouse events drive it instead. The cursor is a solid, invisible
 * disc in the world, so blocks make room around it and get shoved aside when it
 * sweeps through; faster sweeps add a kick on top. Pressing near a block picks
 * the closest one up on a spring, to drag and fling. Touch devices just watch
 * the drop; reduced motion renders nothing.
 */

type Look = "outline" | "fill" | "warm";
/** Loose boxes don't tile perfectly; roughly this much of the heap is solid. */
const PACKING = 0.78;
/** Hard cap on block count. */
const MAX_BLOCKS = { desktop: 110, phone: 55 } as const;
/** Block edge range in px: [min, max] for desktop and phone (<640px). */
const SIZES = { desktop: [34, 64], phone: [22, 40] } as const;
const STEP = 1000 / 60;
const SPAWN_GAP = 22; // ms of sim time between drops
const CURSOR_RADIUS = 48; // px: the solid disc the cursor carries through the heap
const CURSOR_STEP = 36; // px the disc may travel per step while catching up with the cursor
const KICK_REACH = 40; // px beyond the disc where fast sweeps still kick blocks
const GRAB_REACH = 16; // px beyond the disc a press can still pick a block up
const MAX_SPEED = 28; // cap on a kicked block's velocity (px per step)
const WALL_CATEGORY = 0x0002;
const PARKED = { x: -5000, y: -5000 };

const LOOK_CLASS: Record<Look, string> = {
  outline: "border border-yellow/20",
  fill: "bg-white/[0.04]",
  warm: "bg-yellow/[0.07]",
};

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

export function CtaBlocks() {
  const rootRef = useRef<HTMLDivElement>(null);
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
      const { Engine, Bodies, Body, Composite, Constraint, Sleeping } = M;
      // The runtime takes an `updateVelocity` flag the typings leave out.
      const setPosition = Body.setPosition as (body: Matter.Body, position: Matter.Vector, updateVelocity?: boolean) => void;

      type Block = { el: HTMLDivElement; size: number; body: Matter.Body; added: boolean; entered: boolean; spawnAt: number };
      let engine: Matter.Engine | null = null;
      let blocks: Block[] = [];
      let nodes: HTMLDivElement[] = [];
      let cursorBody: Matter.Body | null = null;
      let simTime = 0;
      let acc = 0;
      let last = 0;
      let raf = 0;
      let visible = false;
      let started = false;
      let builtWidth = 0;
      let builtPhone = false;
      const rand = seeded(20260927);

      // Pointer state, in layer coordinates. `aim` is where the cursor disc is
      // heading (null = parked off-world); `grab` is the drag spring, if any.
      const host = (root.closest("[data-blocks-host]") as HTMLElement | null) ?? root;
      const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
      let aim: { x: number; y: number } | null = null;
      let prev: { x: number; y: number } | null = null;
      let grab: { constraint: Matter.Constraint; pointA: { x: number; y: number }; body: Matter.Body } | null = null;

      const teardownWorld = () => {
        if (!engine) return;
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

        engine = Engine.create({ enableSleeping: true, gravity: { x: 0, y: 1.3, scale: 0.001 } });
        engine.positionIterations = 12;
        engine.velocityIterations = 8;
        const T = 400;
        const wallOpts = { isStatic: true, friction: 0.8, restitution: 0.5, collisionFilter: { category: WALL_CATEGORY } };
        Composite.add(engine.world, [
          Bodies.rectangle(W / 2, H + T / 2, W + 2 * T, T, wallOpts),
          Bodies.rectangle(-T / 2, H / 2 - 500, T, H + 1400, wallOpts),
          Bodies.rectangle(W + T / 2, H / 2 - 500, T, H + 1400, wallOpts),
        ]);
        cursorBody = Bodies.circle(PARKED.x, PARKED.y, CURSOR_RADIUS, { isStatic: true, restitution: 0.6, friction: 0.1 });
        Composite.add(engine.world, cursorBody);

        // The heap should rise to the top of the button, no higher.
        const ceiling = host.querySelector("[data-blocks-ceiling]");
        const heapH = ceiling
          ? Math.max(40, H - (ceiling.getBoundingClientRect().top - root.getBoundingClientRect().top))
          : H / 3;

        const r = seeded(4471);
        nodes.forEach((n) => n.remove());
        nodes = [];
        blocks = [];
        const [lo, hi] = builtPhone ? SIZES.phone : SIZES.desktop;
        const target = W * heapH * PACKING;
        let filled = 0;
        for (let n = 0; filled < target && n < (builtPhone ? MAX_BLOCKS.phone : MAX_BLOCKS.desktop); n++) {
          const size = Math.round(lo + r() * (hi - lo));
          filled += size * size;
          const roll = r();
          const el = document.createElement("div");
          el.className = `absolute left-0 top-0 rounded-md will-change-transform ${LOOK_CLASS[roll < 0.55 ? "fill" : roll < 0.8 ? "outline" : "warm"]}`;
          el.style.width = el.style.height = `${size}px`;
          el.style.visibility = "hidden";
          root.appendChild(el);
          nodes.push(el);
          // Golden-ratio spread keeps consecutive drops far apart and the heap level.
          const frac = (0.31 + n * 0.618034 + (r() - 0.5) * 0.06 + 1) % 1;
          const x = size / 2 + 2 + frac * (W - size - 4);
          const body = Bodies.rectangle(x, -size, size, size, {
            chamfer: { radius: size * 0.18 },
            angle: (r() - 0.5) * 0.8,
            restitution: 0.55,
            friction: 0.8,
            frictionStatic: 1,
            frictionAir: 0.015,
            density: 0.0015,
          });
          Body.setVelocity(body, { x: (r() - 0.5) * 1.2, y: 4 });
          Body.setAngularVelocity(body, (r() - 0.5) * 0.06);
          blocks.push({ el, size, body, added: false, entered: false, spawnAt: n * SPAWN_GAP });
        }
      };

      const sync = () => {
        for (const b of blocks) {
          if (!b.added || b.body.isSleeping) continue;
          const { position, angle } = b.body;
          b.el.style.transform = `translate3d(${position.x - b.size / 2}px, ${position.y - b.size / 2}px, 0) rotate(${angle}rad)`;
        }
      };

      // Keep blocks inside the card: kicks, flings and drags can outrun (or
      // tunnel through) the walls, so push any escaping block back in and
      // bounce it off the edge. The top only applies once a block has dropped in.
      const contain = () => {
        const W = root.clientWidth;
        const H = root.clientHeight;
        for (const b of blocks) {
          if (!b.added) continue;
          const { min, max } = b.body.bounds;
          if (!b.entered && min.y >= 0) b.entered = true;
          let dx = 0;
          let dy = 0;
          if (min.x < 0) dx = -min.x;
          else if (max.x > W) dx = W - max.x;
          if (max.y > H) dy = H - max.y;
          else if (b.entered && min.y < 0) dy = -min.y;
          if (!dx && !dy) continue;
          Body.translate(b.body, { x: dx, y: dy });
          const v = b.body.velocity;
          Body.setVelocity(b.body, {
            x: dx ? Math.abs(v.x) * Math.sign(dx) * 0.5 : v.x,
            y: dy ? Math.abs(v.y) * Math.sign(dy) * 0.5 : v.y,
          });
        }
      };

      const spawnDue = () => {
        if (!engine) return;
        for (const b of blocks) {
          if (b.added || simTime < b.spawnAt) continue;
          b.added = true;
          Composite.add(engine.world, b.body);
          b.el.style.visibility = "visible";
        }
      };

      /** Walk the cursor disc toward the pointer, carrying real velocity so it shoves what it hits. */
      const moveCursor = () => {
        const c = cursorBody;
        if (!c) return;
        if (!aim || grab) {
          if (c.position.x !== PARKED.x) {
            setPosition(c, PARKED, false);
            Body.setVelocity(c, { x: 0, y: 0 });
          }
          return;
        }
        if (c.position.x === PARKED.x) {
          setPosition(c, aim, false); // arriving: appear in place, no momentum
        } else {
          const dx = aim.x - c.position.x;
          const dy = aim.y - c.position.y;
          const d = Math.hypot(dx, dy);
          const k = d > CURSOR_STEP ? CURSOR_STEP / d : 1;
          setPosition(c, { x: c.position.x + dx * k, y: c.position.y + dy * k }, true);
        }
        // Static bodies never wake sleepers, so wake whatever the disc is about to touch.
        for (const b of blocks) {
          if (!b.added || !b.body.isSleeping) continue;
          const reach = CURSOR_RADIUS + b.size + 8;
          if (Math.abs(b.body.position.x - c.position.x) < reach && Math.abs(b.body.position.y - c.position.y) < reach) {
            Sleeping.set(b.body, false);
          }
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
          Engine.update(engine, STEP);
          contain();
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
      /** The closest block a press at `p` would pick up, if any is in reach. */
      const nearest = (p: { x: number; y: number }) => {
        let best: Block | null = null;
        let bestD = Infinity;
        for (const b of blocks) {
          if (!b.added) continue;
          const d = Math.hypot(b.body.position.x - p.x, b.body.position.y - p.y) - b.size / 2;
          if (d < bestD && d < CURSOR_RADIUS + GRAB_REACH) {
            best = b;
            bestD = d;
          }
        }
        return best;
      };
      const onButton = (e: Event) => !!(e.target as Element | null)?.closest("a, button");

      // Fast sweeps kick blocks just beyond the disc, so the heap splashes
      // rather than only parting.
      const kick = (p: { x: number; y: number }, v: { x: number; y: number }) => {
        const speed = Math.min(40, Math.hypot(v.x, v.y));
        if (speed < 4) return;
        const reach = CURSOR_RADIUS + KICK_REACH + speed;
        for (const b of blocks) {
          if (!b.added) continue;
          const dx = b.body.position.x - p.x;
          const dy = b.body.position.y - p.y;
          const d = Math.hypot(dx, dy) || 1;
          const edge = reach + b.size / 2;
          if (d > edge) continue;
          const falloff = 1 - d / edge;
          const light = Math.min(1.4, Math.max(0.8, 45 / b.size)); // small blocks fly further
          const push = speed * 0.6 * falloff * light;
          let vx = b.body.velocity.x + (dx / d) * push + v.x * 0.3 * falloff;
          let vy = b.body.velocity.y + (dy / d) * push + v.y * 0.3 * falloff - push * 0.7;
          const s = Math.hypot(vx, vy);
          if (s > MAX_SPEED) {
            vx *= MAX_SPEED / s;
            vy *= MAX_SPEED / s;
          }
          Sleeping.set(b.body, false);
          Body.setVelocity(b.body, { x: vx, y: vy });
          Body.setAngularVelocity(b.body, b.body.angularVelocity + (rand() - 0.5) * 0.12 * push);
        }
      };

      const onMove = (e: MouseEvent) => {
        const p = toLocal(e);
        const v = prev ? { x: p.x - prev.x, y: p.y - prev.y } : { x: 0, y: 0 };
        prev = p;
        if (!engine) return;
        aim = p;
        if (grab) return;
        if (!onButton(e) && nearest(p)) host.dataset.cursor = "Drag";
        else delete host.dataset.cursor;
        kick(p, v);
      };
      const onLeave = () => {
        prev = null;
        if (grab) return;
        aim = null;
        delete host.dataset.cursor;
      };
      const onDown = (e: MouseEvent) => {
        if (e.button !== 0 || onButton(e) || !engine) return;
        const p = toLocal(e);
        const b = nearest(p);
        if (!b) return;
        e.preventDefault(); // no text selection while dragging
        const pointA = { ...p };
        const constraint = Constraint.create({ pointA, bodyB: b.body, length: 0, stiffness: 0.12, damping: 0.08 });
        Composite.add(engine.world, constraint);
        Sleeping.set(b.body, false);
        grab = { constraint, pointA, body: b.body };
        host.dataset.cursor = "Drag";
      };
      // Drags follow the pointer on the window, but the spring's anchor stays
      // inside the card so a dragged block can't be pulled out of it.
      const onWindowMove = (e: MouseEvent) => {
        if (!grab) return;
        const p = toLocal(e);
        grab.pointA.x = Math.min(root.clientWidth, Math.max(0, p.x));
        grab.pointA.y = Math.min(root.clientHeight, Math.max(0, p.y));
        Sleeping.set(grab.body, false);
      };
      const onWindowUp = (e: MouseEvent) => {
        if (!grab) return;
        if (engine) Composite.remove(engine.world, grab.constraint);
        grab = null;
        if (!host.contains(e.target as Node)) {
          aim = null;
          delete host.dataset.cursor;
        }
      };
      if (fine) {
        host.addEventListener("mousemove", onMove, { passive: true });
        host.addEventListener("mouseleave", onLeave, { passive: true });
        host.addEventListener("mousedown", onDown);
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
        { threshold: 0.35 },
      );
      io.observe(root);

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
        nodes.forEach((n) => n.remove());
        host.removeEventListener("mousemove", onMove);
        host.removeEventListener("mouseleave", onLeave);
        host.removeEventListener("mousedown", onDown);
        window.removeEventListener("mousemove", onWindowMove);
        window.removeEventListener("mouseup", onWindowUp);
        delete host.dataset.cursor;
      };
    });

    return () => {
      cancelled = true;
      cleanup();
    };
  }, [reduced]);

  if (reduced !== false) return null;

  return <div ref={rootRef} className="pointer-events-none absolute inset-0" />;
}
