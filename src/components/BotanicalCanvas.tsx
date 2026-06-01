import { useRef, useEffect } from "react";

type ShapeType = "lemon" | "turmeric" | "cinnamon" | "leaf" | "spice";
type Layer = 1 | 2 | 3;

const COLORS: [number, number, number, number][] = [
  [251, 191, 36, 0.12],
  [234, 88, 12, 0.10],
  [180, 83, 9, 0.13],
  [253, 186, 116, 0.15],
  [161, 98, 7, 0.11],
  [254, 240, 138, 0.14],
];

interface Particle {
  type: ShapeType;
  layer: Layer;
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseVx: number;
  baseVy: number;
  color: [number, number, number, number];
  rotation: number;
  rotationSpeed: number;
  lemonR: number;
  blobPts: [number, number][];
  blobR: number;
  cinR: number;
  cinSweep: number;
  cinLW: number;
  cinStart: number;
  leafH: number;
  leafW: number;
  dots: { dx: number; dy: number; r: number }[];
}

function makeParticle(w: number, h: number): Particle {
  const tr = Math.random();
  const type: ShapeType =
    tr < 0.2 ? "lemon" : tr < 0.4 ? "turmeric" : tr < 0.6 ? "cinnamon" : tr < 0.8 ? "leaf" : "spice";

  const lr = Math.random();
  const layer: Layer = lr < 0.3 ? 1 : lr < 0.8 ? 2 : 3;
  const sm = layer === 1 ? 0.4 : layer === 2 ? 0.7 : 1;

  const baseVx = (Math.random() * 0.2 - 0.1) * sm;
  const baseVy = -(0.06 + Math.random() * 0.14) * sm;

  const blobPts: [number, number][] = Array.from({ length: 5 }, (_, i) => {
    const a = (i / 5) * Math.PI * 2;
    const r = 0.6 + Math.random() * 0.7;
    return [Math.cos(a) * r, Math.sin(a) * r];
  });

  const dotCount = 3 + Math.floor(Math.random() * 3);
  const dots = Array.from({ length: dotCount }, () => ({
    dx: (Math.random() - 0.5) * 12,
    dy: (Math.random() - 0.5) * 12,
    r: 1.5 + Math.random() * 1.5,
  }));

  return {
    type,
    layer,
    x: Math.random() * w,
    y: Math.random() * h,
    vx: baseVx,
    vy: baseVy,
    baseVx,
    baseVy,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    rotation: Math.random() * Math.PI * 2,
    rotationSpeed: Math.random() * 0.006 - 0.003,
    lemonR: 6 + Math.random() * 8,
    blobPts,
    blobR: 10 + Math.random() * 12,
    cinR: 8 + Math.random() * 8,
    cinSweep: 3.49 + Math.random() * 1.4,
    cinLW: 2 + Math.random() * 2,
    cinStart: Math.random() * Math.PI * 2,
    leafH: 12 + Math.random() * 8,
    leafW: 6 + Math.random() * 4,
    dots,
  };
}

function drawParticle(ctx: CanvasRenderingContext2D, p: Particle) {
  const [r, g, b, baseA] = p.color;
  const layerAlpha = p.layer === 1 ? 0.35 : p.layer === 2 ? 0.65 : 1.0;
  const scale = p.layer === 1 ? 0.5 : p.layer === 2 ? 0.75 : 1.0;
  const a = (v: number) => +(v * layerAlpha).toFixed(3);
  const fill = `rgba(${r},${g},${b},${a(baseA)})`;
  const stroke = `rgba(${r},${g},${b},${a(baseA * 1.4)})`;

  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate(p.rotation);

  if (p.type === "lemon") {
    const lr = p.lemonR * scale;
    ctx.beginPath();
    ctx.arc(0, 0, lr, 0, Math.PI * 2);
    ctx.fillStyle = fill;
    ctx.fill();
    ctx.strokeStyle = stroke;
    ctx.lineWidth = 0.8 * scale;
    for (let i = 0; i < 6; i++) {
      const ang = (i / 6) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(Math.cos(ang) * lr, Math.sin(ang) * lr);
      ctx.stroke();
    }
  } else if (p.type === "turmeric") {
    const br = p.blobR * scale;
    const pts = p.blobPts;
    ctx.beginPath();
    ctx.moveTo((pts[0][0] + pts[pts.length - 1][0]) / 2 * br, (pts[0][1] + pts[pts.length - 1][1]) / 2 * br);
    for (let i = 0; i < pts.length; i++) {
      const next = pts[(i + 1) % pts.length];
      const cx = (pts[i][0] + next[0]) / 2 * br;
      const cy = (pts[i][1] + next[1]) / 2 * br;
      ctx.quadraticCurveTo(pts[i][0] * br, pts[i][1] * br, cx, cy);
    }
    ctx.closePath();
    ctx.fillStyle = fill;
    ctx.fill();
  } else if (p.type === "cinnamon") {
    ctx.beginPath();
    ctx.arc(0, 0, p.cinR * scale, p.cinStart, p.cinStart + p.cinSweep);
    ctx.strokeStyle = stroke;
    ctx.lineWidth = p.cinLW * scale;
    ctx.lineCap = "round";
    ctx.stroke();
  } else if (p.type === "leaf") {
    const lh = p.leafH * scale / 2;
    const lw = p.leafW * scale;
    ctx.beginPath();
    ctx.moveTo(0, -lh);
    ctx.bezierCurveTo(lw, -lh / 2, lw, lh / 2, 0, lh);
    ctx.bezierCurveTo(-lw, lh / 2, -lw, -lh / 2, 0, -lh);
    ctx.closePath();
    ctx.fillStyle = fill;
    ctx.fill();
  } else {
    ctx.fillStyle = fill;
    for (const d of p.dots) {
      ctx.beginPath();
      ctx.arc(d.dx * scale, d.dy * scale, d.r * scale, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  ctx.restore();
}

export function BotanicalCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const runningRef = useRef(false);

  useEffect(() => {
    // Respect reduced motion preference — skip animation entirely
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const section = canvas.parentElement;
    if (!section) return;

    const resize = () => {
      canvas.width = section.offsetWidth;
      canvas.height = section.offsetHeight;
      const mobile = window.innerWidth < 768;
      particlesRef.current = Array.from({ length: mobile ? 40 : 80 }, () =>
        makeParticle(canvas.width, canvas.height),
      );
    };

    const loop = () => {
      if (!runningRef.current) return;
      const w = canvas.width;
      const h = canvas.height;
      const mouse = mouseRef.current;
      const m = 30;

      ctx.clearRect(0, 0, w, h);

      for (const p of particlesRef.current) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 80 && dist > 0) {
          const angle = Math.atan2(dy, dx);
          p.vx += Math.cos(angle) * 0.3;
          p.vy += Math.sin(angle) * 0.3;
          const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
          if (spd > 1.5) { p.vx = (p.vx / spd) * 1.5; p.vy = (p.vy / spd) * 1.5; }
        }
        p.vx += (p.baseVx - p.vx) * 0.02;
        p.vy += (p.baseVy - p.vy) * 0.02;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;

        if (p.x < -m) p.x = w + m;
        else if (p.x > w + m) p.x = -m;
        if (p.y < -m) { p.y = h + m; p.x = Math.random() * w; }

        drawParticle(ctx, p);
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    const start = () => {
      if (runningRef.current) return;
      runningRef.current = true;
      loop();
    };

    const stop = () => {
      runningRef.current = false;
      cancelAnimationFrame(rafRef.current);
    };

    const onVisibilityChange = () => {
      document.hidden ? stop() : start();
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };

    resize();
    start();
    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseleave", onLeave);
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      stop();
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 z-0 pointer-events-none"
    />
  );
}
