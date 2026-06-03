import { useEffect, useRef } from "react";

// Warm amber microbiome palette — stored as [r, g, b] for gradient construction
const PALETTE: [number, number, number][] = [
  [251, 146,  60],  // orange-400
  [245, 158,  11],  // amber-400
  [253, 186, 116],  // orange-300
  [217, 119,   6],  // amber-600
  [254, 215, 170],  // orange-200
  [234,  88,  12],  // orange-600
];

type BacteriaType = "cocci" | "bacilli" | "spirilli" | "bifido";

interface Particle {
  type: BacteriaType;
  x: number; y: number;
  vx: number; vy: number;
  baseVx: number; baseVy: number;
  rotation: number;
  rotationSpeed: number;
  color: [number, number, number];
  layerScale: number;
  layerOpacity: number;
  layerSpeed: number;
  // cocci
  radius: number;
  pulseOffset: number;
  // bacilli
  bw: number; bh: number;
  wobbleOffset: number;
  // spirilli + bifido (stroke weight)
  strokeW: number;
  // spirilli
  span: number;
  // bifido (Y-shape Bifidobacterium)
  stemLen: number;
  branchLen: number;
  branchAngle: number;
}

function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function mkParticle(cw: number, ch: number): Particle {
  // Type distribution: cocci 30%, bacilli 30%, spirilli 25%, bifido 15%
  const tr = Math.random();
  const type: BacteriaType =
    tr < 0.30 ? "cocci" :
    tr < 0.60 ? "bacilli" :
    tr < 0.85 ? "spirilli" :
    "bifido";

  // Three depth layers — back dim/slow → front bright/fast
  const lr = Math.random();
  let layerScale: number, layerOpacity: number, layerSpeed: number;
  if (lr < 0.25)      { layerScale = 0.5; layerOpacity = 0.35; layerSpeed = 0.25; }
  else if (lr < 0.75) { layerScale = 0.8; layerOpacity = 0.65; layerSpeed = 0.60; }
  else                 { layerScale = 1.0; layerOpacity = 0.90; layerSpeed = 1.00; }

  // Floaty, slow base velocities
  const bvx = rand(-0.09, 0.09);
  const bvy = rand(-0.12, 0.05);

  // Stroke weight per type
  let strokeW = 1;
  if (type === "spirilli") strokeW = rand(1.5, 3.0);
  else if (type === "bifido") strokeW = rand(1.5, 2.5);

  return {
    type,
    x: rand(0, cw), y: rand(0, ch),
    vx: bvx, vy: bvy, baseVx: bvx, baseVy: bvy,
    rotation: rand(0, Math.PI * 2),
    rotationSpeed: rand(-0.003, 0.003),
    color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
    layerScale, layerOpacity, layerSpeed,
    // Cocci: smaller radius range
    radius: rand(5, 14),
    pulseOffset: rand(0, Math.PI * 2),
    // Bacilli: smaller capsule
    bw: rand(12, 26), bh: rand(4, 9),
    wobbleOffset: rand(0, Math.PI * 2),
    // Spirilli: smaller S-curve span
    span: rand(14, 30),
    strokeW,
    // Bifido: Y-shape dimensions
    stemLen: rand(10, 18),
    branchLen: rand(6, 12),
    branchAngle: rand(35 * Math.PI / 180, 45 * Math.PI / 180),
  };
}

function drawCocci(ctx: CanvasRenderingContext2D, p: Particle, frame: number) {
  const [r, g, b] = p.color;
  const a = p.layerOpacity;
  // Universal breathing: ±8% of base radius, phase-offset per particle
  const breathe = 1 + Math.sin(frame * 0.003 + p.pulseOffset) * 0.08;
  const rad = p.radius * p.layerScale * breathe;

  // Soft biological glow at 2× radius, 4% opacity
  ctx.beginPath();
  ctx.arc(0, 0, rad * 2, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(${r},${g},${b},0.04)`;
  ctx.fill();

  // Radial gradient fill
  const grd = ctx.createRadialGradient(0, 0, 0, 0, 0, rad);
  grd.addColorStop(0, `rgba(${r},${g},${b},${(0.9 * a).toFixed(3)})`);
  grd.addColorStop(1, `rgba(${r},${g},${b},0)`);
  ctx.beginPath();
  ctx.arc(0, 0, rad, 0, Math.PI * 2);
  ctx.fillStyle = grd;
  ctx.fill();

  // Outer ring — depth cue at 25% opacity
  ctx.beginPath();
  ctx.arc(0, 0, rad + 4 * p.layerScale, 0, Math.PI * 2);
  ctx.strokeStyle = `rgba(${r},${g},${b},${(0.25 * a).toFixed(3)})`;
  ctx.lineWidth = 1;
  ctx.stroke();
}

function drawBacilli(ctx: CanvasRenderingContext2D, p: Particle, frame: number) {
  const [r, g, b] = p.color;
  const a = p.layerOpacity;
  // Universal breathing applied to capsule dimensions
  const breathe = 1 + Math.sin(frame * 0.003 + p.pulseOffset) * 0.08;
  const w = p.bw * p.layerScale * breathe;
  const h = p.bh * p.layerScale * breathe;
  // Gentler wobble
  const wobble = Math.sin(frame * 0.008 + p.wobbleOffset) * 0.2;

  ctx.save();
  ctx.rotate(wobble);

  // Capsule path
  const capR = h / 2;
  const halfInner = Math.max(0, (w - h) / 2);

  ctx.beginPath();
  ctx.moveTo(-halfInner, -capR);
  ctx.lineTo(halfInner, -capR);
  ctx.arc(halfInner, 0, capR, -Math.PI / 2, Math.PI / 2);
  ctx.lineTo(-halfInner, capR);
  ctx.arc(-halfInner, 0, capR, Math.PI / 2, 3 * Math.PI / 2);
  ctx.closePath();

  // Linear gradient along long axis
  const grd = ctx.createLinearGradient(-halfInner, 0, halfInner, 0);
  grd.addColorStop(0, `rgba(${r},${g},${b},${(0.75 * a).toFixed(3)})`);
  grd.addColorStop(1, `rgba(${r},${g},${b},${(0.25 * a).toFixed(3)})`);
  ctx.fillStyle = grd;
  ctx.fill();

  // Highlight sheen at 10% opacity in upper third
  ctx.save();
  ctx.translate(-halfInner * 0.2, -capR * 0.45);
  ctx.scale(w * 0.26, h * 0.18);
  ctx.beginPath();
  ctx.arc(0, 0, 1, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(255,255,255,${(0.10 * a).toFixed(3)})`;
  ctx.fill();
  ctx.restore();

  ctx.restore();
}

function drawSpirilli(ctx: CanvasRenderingContext2D, p: Particle, frame: number) {
  const [r, g, b] = p.color;
  const a = p.layerOpacity;
  // Universal breathing applied to spiral span
  const breathe = 1 + Math.sin(frame * 0.003 + p.pulseOffset) * 0.08;
  const s = (p.span / 2) * p.layerScale * breathe;

  // 3 bezier segments forming a visible S-curve
  ctx.beginPath();
  ctx.moveTo(-s, 0);
  ctx.bezierCurveTo(-s * 0.70, -s * 0.80, -s * 0.20, -s * 0.80, 0, -s * 0.35);
  ctx.bezierCurveTo( s * 0.20,  0,         -s * 0.20,  0,          0,  s * 0.35);
  ctx.bezierCurveTo( s * 0.20,  s * 0.80,   s * 0.70,  s * 0.80,   s,  0);

  ctx.strokeStyle = `rgba(${r},${g},${b},${(0.70 * a).toFixed(3)})`;
  ctx.lineWidth = p.strokeW * p.layerScale;
  ctx.lineCap = "round";
  ctx.stroke();
}

// Bifidobacterium: Y-shape representing the bifid (forked) morphology
// This genus is the primary target of prebiotic inulin in the Flourish formula
function drawBifido(ctx: CanvasRenderingContext2D, p: Particle, frame: number) {
  const [r, g, b] = p.color;
  const a = p.layerOpacity;
  // Universal breathing applied to Y dimensions
  const breathe = 1 + Math.sin(frame * 0.003 + p.pulseOffset) * 0.08;
  const stemHalf = (p.stemLen / 2) * p.layerScale * breathe;
  const bLen = p.branchLen * p.layerScale * breathe;
  const angle = p.branchAngle;

  ctx.beginPath();
  // Vertical stem: bottom to top
  ctx.moveTo(0, stemHalf);
  ctx.lineTo(0, -stemHalf);
  // Left branch from top of stem
  ctx.moveTo(0, -stemHalf);
  ctx.lineTo(-bLen * Math.sin(angle), -stemHalf - bLen * Math.cos(angle));
  // Right branch from top of stem
  ctx.moveTo(0, -stemHalf);
  ctx.lineTo(bLen * Math.sin(angle), -stemHalf - bLen * Math.cos(angle));

  ctx.strokeStyle = `rgba(${r},${g},${b},${(0.60 * a).toFixed(3)})`;
  ctx.lineWidth = p.strokeW * p.layerScale;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.stroke();
}

export function MicrobiomeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    if (!ctx) return;

    let cw = canvas.offsetWidth;
    let ch = canvas.offsetHeight;
    canvas.width = cw;
    canvas.height = ch;

    // More particles to compensate for smaller size
    const targetCount = () => (window.innerWidth < 768 ? 65 : 110);
    let particles = Array.from({ length: targetCount() }, () => mkParticle(cw, ch));
    let mx = -999, my = -999;
    let frame = 0;
    let raf: number;

    const onMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mx = e.clientX - rect.left;
      my = e.clientY - rect.top;
    };

    const onMouseLeave = () => { mx = -999; my = -999; };

    const onResize = () => {
      cw = canvas.offsetWidth;
      ch = canvas.offsetHeight;
      canvas.width = cw;
      canvas.height = ch;
      particles = Array.from({ length: targetCount() }, () => mkParticle(cw, ch));
    };

    window.addEventListener("mousemove", onMouse);
    window.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("resize", onResize);

    function tick() {
      ctx.clearRect(0, 0, cw, ch);
      frame++;

      for (const p of particles) {
        // Mouse repulsion within 90px
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist2 = dx * dx + dy * dy;
        if (dist2 < 8100 && dist2 > 0) {
          const dist = Math.sqrt(dist2);
          const force = ((90 - dist) / 90) * 0.35;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }

        // Lerp back toward base velocity
        p.vx += (p.baseVx - p.vx) * 0.02;
        p.vy += (p.baseVy - p.vy) * 0.02;

        // Cap speed (proportional to reduced velocity range)
        const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (spd > 1.0) { p.vx = (p.vx / spd) * 1.0; p.vy = (p.vy / spd) * 1.0; }

        p.x += p.vx * p.layerSpeed;
        p.y += p.vy * p.layerSpeed;
        p.rotation += p.rotationSpeed;

        // Seamless edge wrap
        const pad = 60;
        if (p.x < -pad) p.x = cw + pad;
        else if (p.x > cw + pad) p.x = -pad;
        if (p.y < -pad) p.y = ch + pad;
        else if (p.y > ch + pad) p.y = -pad;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        if (p.type === "cocci")        drawCocci(ctx, p, frame);
        else if (p.type === "bacilli") drawBacilli(ctx, p, frame);
        else if (p.type === "spirilli") drawSpirilli(ctx, p, frame);
        else                            drawBifido(ctx, p, frame);
        ctx.restore();
      }

      raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}
