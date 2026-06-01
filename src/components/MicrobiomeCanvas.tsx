import { useRef, useEffect } from "react";

type PType = "cocci" | "bacillus" | "spirillus";
type Layer = 1 | 2 | 3;
type RGB = [number, number, number];

const COLORS: RGB[] = [
  [251, 146, 60],
  [245, 158, 11],
  [253, 186, 116],
  [217, 119, 6],
  [254, 215, 170],
  [180, 83, 9],
];

interface Particle {
  type: PType;
  layer: Layer;
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseVx: number;
  baseVy: number;
  color: RGB;
  rotation: number;
  rotationSpeed: number;
  // cocci
  baseRadius: number;
  pulseSpeed: number;
  pulseOffset: number;
  hasRing: boolean;
  // bacillus
  bw: number;
  bh: number;
  wobbleOffset: number;
  // spirillus
  span: number;
  strokeW: number;
  curveS: boolean;
}

function makeParticle(w: number, h: number): Particle {
  const tr = Math.random();
  const type: PType = tr < 0.4 ? "cocci" : tr < 0.75 ? "bacillus" : "spirillus";

  const lr = Math.random();
  const layer: Layer = lr < 0.3 ? 1 : lr < 0.8 ? 2 : 3;

  const sm = layer === 1 ? 0.4 : layer === 2 ? 0.7 : 1;
  const baseVx = (Math.random() * 0.24 - 0.12) * sm;
  const baseVy = (Math.random() * 0.26 - 0.18) * sm;

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
    rotationSpeed: Math.random() * 0.008 - 0.004,
    baseRadius: 10 + Math.random() * 18,
    pulseSpeed: 0.008 + Math.random() * 0.012,
    pulseOffset: Math.random() * Math.PI * 2,
    hasRing: Math.random() < 0.4,
    bw: 28 + Math.random() * 27,
    bh: 10 + Math.random() * 8,
    wobbleOffset: Math.random() * Math.PI * 2,
    span: 30 + Math.random() * 30,
    strokeW: 3 + Math.random() * 3,
    curveS: Math.random() < 0.5,
  };
}

function drawParticle(ctx: CanvasRenderingContext2D, p: Particle, fc: number) {
  const [r, g, b] = p.color;
  const ls = p.layer === 1 ? 0.5 : p.layer === 2 ? 0.8 : 1;
  const lo = p.layer === 1 ? 0.6 : p.layer === 2 ? 0.85 : 1;
  const a = (v: number) => +(v * lo).toFixed(3);

  if (p.type === "cocci") {
    const rad =
      (p.baseRadius + Math.sin(fc * p.pulseSpeed + p.pulseOffset) * 2) * ls;
    const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, rad);
    grad.addColorStop(0, `rgba(${r},${g},${b},${a(1.0)})`);
    grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
    ctx.beginPath();
    ctx.arc(p.x, p.y, rad, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();
    if (p.hasRing) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, rad + 4 * ls, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${r},${g},${b},${a(0.20)})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
  } else if (p.type === "bacillus") {
    const rot = p.rotation + Math.sin(fc * 0.01 + p.wobbleOffset) * 0.3;
    const w = p.bw * ls;
    const h = p.bh * ls;
    const cr = h / 2;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(rot);
    const grad = ctx.createLinearGradient(-w / 2, 0, w / 2, 0);
    grad.addColorStop(0, `rgba(${r},${g},${b},${a(0.85)})`);
    grad.addColorStop(1, `rgba(${r},${g},${b},${a(0.45)})`);
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.moveTo(-w / 2 + cr, -cr);
    ctx.lineTo(w / 2 - cr, -cr);
    ctx.arc(w / 2 - cr, 0, cr, -Math.PI / 2, Math.PI / 2);
    ctx.lineTo(-w / 2 + cr, cr);
    ctx.arc(-w / 2 + cr, 0, cr, Math.PI / 2, (3 * Math.PI) / 2);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  } else {
    const span = p.span * ls;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation);
    ctx.beginPath();
    if (p.curveS) {
      ctx.moveTo(-span / 2, 0);
      ctx.bezierCurveTo(-span / 4, -span / 3, span / 4, span / 3, span / 2, 0);
    } else {
      ctx.moveTo(-span / 2, 0);
      ctx.quadraticCurveTo(0, -span / 3, span / 2, 0);
    }
    ctx.strokeStyle = `rgba(${r},${g},${b},${a(0.75)})`;
    ctx.lineWidth = p.strokeW * ls;
    ctx.lineCap = "round";
    ctx.stroke();
    ctx.restore();
  }
}

export function MicrobiomeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const fcRef = useRef(0);

  useEffect(() => {
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
      particlesRef.current = Array.from({ length: mobile ? 50 : 90 }, () =>
        makeParticle(canvas.width, canvas.height)
      );
    };

    const loop = () => {
      fcRef.current++;
      const fc = fcRef.current;
      const w = canvas.width;
      const h = canvas.height;
      const mouse = mouseRef.current;
      const m = 40;

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
          if (spd > 1.5) {
            p.vx = (p.vx / spd) * 1.5;
            p.vy = (p.vy / spd) * 1.5;
          }
        }
        p.vx += (p.baseVx - p.vx) * 0.02;
        p.vy += (p.baseVy - p.vy) * 0.02;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;

        if (p.x < -m) { p.x = w + m; p.y = Math.random() * h; }
        else if (p.x > w + m) { p.x = -m; p.y = Math.random() * h; }
        if (p.y < -m) { p.y = h + m; p.x = Math.random() * w; }
        else if (p.y > h + m) { p.y = -m; p.x = Math.random() * w; }

        drawParticle(ctx, p, fc);
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };
    const onResize = () => resize();

    resize();
    loop();
    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseleave", onLeave);
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none"
    />
  );
}
