import { useEffect, useRef } from "react";

// Warm amber microbiome palette — [r, g, b] for gradient construction
const PALETTE: [number, number, number][] = [
  [251, 146,  60],  // orange-400
  [245, 158,  11],  // amber-400
  [253, 186, 116],  // orange-300
  [217, 119,   6],  // amber-600
  [254, 215, 170],  // orange-200
  [234,  88,  12],  // orange-600
];

type BacteriaType = "cocci" | "bacilli" | "spirilli" | "bifido" | "akkermansia";

// Scientific label for each bacteria type shown as a floating annotation
const LABEL_NAMES: Record<BacteriaType, string> = {
  cocci:       "Lactobacillus",
  bacilli:     "Bacteroidetes",
  spirilli:    "Faecalibacterium",
  bifido:      "Bifidobacterium",
  akkermansia: "Akkermansia",
};

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
  // Label (one representative per type, desktop only)
  isLabel: boolean;
  labelName: string;
  // cocci
  radius: number;
  pulseOffset: number;
  // bacilli
  bw: number; bh: number;
  wobbleOffset: number;
  // spirilli + bifido stroke weight
  strokeW: number;
  // spirilli
  span: number;
  // bifido: Y-shape or V-shape (50/50)
  stemLen: number;
  branchLen: number;
  branchAngle: number;
  bifidoVariant: "Y" | "V";
  // akkermansia: oval shape
  akkRadiusX: number;
  akkRadiusY: number;
}

// Boundary constants: keep particles within visible hero area
const NAV_HEIGHT = 72;
const MARQUEE_BUFFER = 60;

function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function mkParticle(cw: number, ch: number): Particle {
  // Distribution: cocci 25%, bacilli 25%, spirilli 20%, bifido 20%, akkermansia 10%
  const tr = Math.random();
  const type: BacteriaType =
    tr < 0.25 ? "cocci" :
    tr < 0.50 ? "bacilli" :
    tr < 0.70 ? "spirilli" :
    tr < 0.90 ? "bifido" :
    "akkermansia";

  // Three depth layers — back dim/slow → front bright/fast
  const lr = Math.random();
  let layerScale: number, layerOpacity: number, layerSpeed: number;
  if (lr < 0.25)      { layerScale = 0.5; layerOpacity = 0.35; layerSpeed = 0.25; }
  else if (lr < 0.75) { layerScale = 0.8; layerOpacity = 0.65; layerSpeed = 0.60; }
  else                 { layerScale = 1.0; layerOpacity = 0.90; layerSpeed = 1.00; }

  const bvx = rand(-0.09, 0.09);
  const bvy = rand(-0.12, 0.05);

  let strokeW = 1;
  if (type === "spirilli")    strokeW = rand(1.5, 3.0);
  else if (type === "bifido") strokeW = rand(1.5, 2.5);

  return {
    type,
    x: rand(0, cw), y: rand(0, ch),
    vx: bvx, vy: bvy, baseVx: bvx, baseVy: bvy,
    rotation: rand(0, Math.PI * 2),
    rotationSpeed: rand(-0.003, 0.003),
    color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
    layerScale, layerOpacity, layerSpeed,
    // Label fields — populated by labelParticles() after array is built
    isLabel: false,
    labelName: LABEL_NAMES[type],
    // Cocci
    radius: rand(5, 14),
    pulseOffset: rand(0, Math.PI * 2),
    // Bacilli
    bw: rand(12, 26), bh: rand(4, 9),
    wobbleOffset: rand(0, Math.PI * 2),
    // Spirilli
    span: rand(14, 30),
    strokeW,
    // Bifido
    stemLen: rand(10, 18),
    branchLen: rand(6, 12),
    branchAngle: rand(35 * Math.PI / 180, 45 * Math.PI / 180),
    bifidoVariant: Math.random() < 0.5 ? "Y" : "V",
    // Akkermansia
    akkRadiusX: rand(4, 8),
    akkRadiusY: rand(6, 12),
  };
}

// Mark one label carrier per type — prefer front-layer particles (full opacity)
// so labels always render at maximum brightness. Fall back to mid-layer if needed.
function labelParticles(ps: Particle[]) {
  const frontSeen = new Set<BacteriaType>();
  const midSeen = new Set<BacteriaType>();

  for (const p of ps) p.isLabel = false;

  // First pass: front layer (layerOpacity === 0.90)
  for (const p of ps) {
    if (p.layerOpacity === 0.90 && !frontSeen.has(p.type)) {
      p.isLabel = true;
      frontSeen.add(p.type);
    }
  }
  // Second pass: mid layer fallback (layerOpacity === 0.65)
  for (const p of ps) {
    if (p.layerOpacity === 0.65 && !frontSeen.has(p.type) && !midSeen.has(p.type)) {
      p.isLabel = true;
      midSeen.add(p.type);
    }
  }
}

function drawCocci(ctx: CanvasRenderingContext2D, p: Particle, frame: number) {
  const [r, g, b] = p.color;
  const a = p.layerOpacity;
  const breathe = 1 + Math.sin(frame * 0.003 + p.pulseOffset) * 0.08;
  const rad = p.radius * p.layerScale * breathe;

  // Soft biological glow at 2× radius
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

  // Outer ring — depth cue
  ctx.beginPath();
  ctx.arc(0, 0, rad + 4 * p.layerScale, 0, Math.PI * 2);
  ctx.strokeStyle = `rgba(${r},${g},${b},${(0.25 * a).toFixed(3)})`;
  ctx.lineWidth = 1;
  ctx.stroke();
}

function drawBacilli(ctx: CanvasRenderingContext2D, p: Particle, frame: number) {
  const [r, g, b] = p.color;
  const a = p.layerOpacity;
  const breathe = 1 + Math.sin(frame * 0.003 + p.pulseOffset) * 0.08;
  const w = p.bw * p.layerScale * breathe;
  const h = p.bh * p.layerScale * breathe;
  const wobble = Math.sin(frame * 0.008 + p.wobbleOffset) * 0.2;

  ctx.save();
  ctx.rotate(wobble);

  const capR = h / 2;
  const halfInner = Math.max(0, (w - h) / 2);

  ctx.beginPath();
  ctx.moveTo(-halfInner, -capR);
  ctx.lineTo(halfInner, -capR);
  ctx.arc(halfInner, 0, capR, -Math.PI / 2, Math.PI / 2);
  ctx.lineTo(-halfInner, capR);
  ctx.arc(-halfInner, 0, capR, Math.PI / 2, 3 * Math.PI / 2);
  ctx.closePath();

  const grd = ctx.createLinearGradient(-halfInner, 0, halfInner, 0);
  grd.addColorStop(0, `rgba(${r},${g},${b},${(0.75 * a).toFixed(3)})`);
  grd.addColorStop(1, `rgba(${r},${g},${b},${(0.25 * a).toFixed(3)})`);
  ctx.fillStyle = grd;
  ctx.fill();

  // Highlight sheen in upper third
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
  const breathe = 1 + Math.sin(frame * 0.003 + p.pulseOffset) * 0.08;
  const s = (p.span / 2) * p.layerScale * breathe;

  ctx.beginPath();
  ctx.moveTo(-s, 0);
  ctx.bezierCurveTo(-s * 0.70, -s * 0.80, -s * 0.20, -s * 0.80, 0, -s * 0.35);
  ctx.bezierCurveTo( s * 0.20,  0,          -s * 0.20,  0,          0,  s * 0.35);
  ctx.bezierCurveTo( s * 0.20,  s * 0.80,    s * 0.70,  s * 0.80,   s,  0);

  ctx.strokeStyle = `rgba(${r},${g},${b},${(0.70 * a).toFixed(3)})`;
  ctx.lineWidth = p.strokeW * p.layerScale;
  ctx.lineCap = "round";
  ctx.stroke();
}

// Bifidobacterium: Y-shape (stem + two branches) or V-shape (two branches only)
// Primary target of prebiotic inulin in the Flourish formula
function drawBifido(ctx: CanvasRenderingContext2D, p: Particle, frame: number) {
  const [r, g, b] = p.color;
  const a = p.layerOpacity;
  const breathe = 1 + Math.sin(frame * 0.003 + p.pulseOffset) * 0.08;
  const bLen = p.branchLen * p.layerScale * breathe;
  const angle = p.branchAngle;

  ctx.strokeStyle = `rgba(${r},${g},${b},${(0.60 * a).toFixed(3)})`;
  ctx.lineWidth = p.strokeW * p.layerScale;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  if (p.bifidoVariant === "Y") {
    const stemHalf = (p.stemLen / 2) * p.layerScale * breathe;
    ctx.beginPath();
    // Vertical stem
    ctx.moveTo(0, stemHalf);
    ctx.lineTo(0, -stemHalf);
    // Left branch from top
    ctx.moveTo(0, -stemHalf);
    ctx.lineTo(-bLen * Math.sin(angle), -stemHalf - bLen * Math.cos(angle));
    // Right branch from top
    ctx.moveTo(0, -stemHalf);
    ctx.lineTo( bLen * Math.sin(angle), -stemHalf - bLen * Math.cos(angle));
  } else {
    // V-shape: two branches spreading at ±40° from base, no stem
    const vAngle = 40 * Math.PI / 180;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-bLen * Math.sin(vAngle), -bLen * Math.cos(vAngle));
    ctx.moveTo(0, 0);
    ctx.lineTo( bLen * Math.sin(vAngle), -bLen * Math.cos(vAngle));
  }

  ctx.stroke();
}

// Akkermansia muciniphila: oval/egg shape that lines the gut wall
// Supported by ACV and inulin in the Flourish formula
function drawAkkermansia(ctx: CanvasRenderingContext2D, p: Particle, frame: number) {
  const [r, g, b] = p.color;
  const a = p.layerOpacity;
  const breathe = 1 + Math.sin(frame * 0.003 + p.pulseOffset) * 0.08;
  const rx = p.akkRadiusX * p.layerScale * breathe;
  const ry = p.akkRadiusY * p.layerScale * breathe;

  // Filled ellipse at 50% opacity
  ctx.beginPath();
  ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(${r},${g},${b},${(0.50 * a).toFixed(3)})`;
  ctx.fill();

  // Outer ring at 1.2× size, 15% opacity
  ctx.beginPath();
  ctx.ellipse(0, 0, rx * 1.2, ry * 1.2, 0, 0, Math.PI * 2);
  ctx.strokeStyle = `rgba(${r},${g},${b},${(0.15 * a).toFixed(3)})`;
  ctx.lineWidth = 0.8;
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

    const targetCount = () => (window.innerWidth < 768 ? 80 : 140);

    const makeParticles = () => {
      const bTop = NAV_HEIGHT;
      const bBottom = ch - MARQUEE_BUFFER;
      const bLeft = 8;
      const bRight = cw - 8;
      const ps = Array.from({ length: targetCount() }, () => {
        const p = mkParticle(cw, ch);
        // Constrain initial spawn within visible bounds
        p.x = bLeft + p.radius + Math.random() * Math.max(0, bRight - bLeft - p.radius * 2);
        p.y = bTop + p.radius + Math.random() * Math.max(0, bBottom - bTop - p.radius * 2);
        return p;
      });
      labelParticles(ps);
      return ps;
    };

    let particles = makeParticles();
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
      particles = makeParticles();
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

        p.vx += (p.baseVx - p.vx) * 0.02;
        p.vy += (p.baseVy - p.vy) * 0.02;

        const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (spd > 1.0) { p.vx = (p.vx / spd) * 1.0; p.vy = (p.vy / spd) * 1.0; }

        p.x += p.vx * p.layerSpeed;
        p.y += p.vy * p.layerSpeed;
        p.rotation += p.rotationSpeed;

        // Wall bouncing — constrained to visible hero area between nav and marquee
        const bTop = NAV_HEIGHT;
        const bBottom = ch - MARQUEE_BUFFER;
        const bLeft = 8;
        const bRight = cw - 8;
        const pr = p.radius; // approximation for all particle types

        if (p.y - pr < bTop)    { p.y = bTop + pr;    p.vy =  Math.abs(p.vy) * 0.85; }
        if (p.y + pr > bBottom) { p.y = bBottom - pr;  p.vy = -Math.abs(p.vy) * 0.85; }
        if (p.x - pr < bLeft)   { p.x = bLeft + pr;   p.vx =  Math.abs(p.vx) * 0.85; }
        if (p.x + pr > bRight)  { p.x = bRight - pr;  p.vx = -Math.abs(p.vx) * 0.85; }

        // Velocity cap + gentle drift to prevent particles from stopping
        const MAX_SPEED = 0.8;
        p.vx = Math.max(-MAX_SPEED, Math.min(MAX_SPEED, p.vx));
        p.vy = Math.max(-MAX_SPEED, Math.min(MAX_SPEED, p.vy));
        p.vx += (Math.random() - 0.5) * 0.018;
        p.vy += (Math.random() - 0.5) * 0.018;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        if (p.type === "cocci")            drawCocci(ctx, p, frame);
        else if (p.type === "bacilli")     drawBacilli(ctx, p, frame);
        else if (p.type === "spirilli")    drawSpirilli(ctx, p, frame);
        else if (p.type === "bifido")      drawBifido(ctx, p, frame);
        else                               drawAkkermansia(ctx, p, frame);
        ctx.restore();

        // Draw floating label with white pill background — all screen sizes
        if (p.isLabel) {
          const [r, g, b] = p.color;
          // Compute x offset clear of the particle's visual extent
          let lx = p.x + 12;
          if (p.type === "cocci")            lx = p.x + p.radius * p.layerScale + 4;
          else if (p.type === "bacilli")     lx = p.x + p.bw * 0.5 * p.layerScale + 4;
          else if (p.type === "spirilli")    lx = p.x + (p.span / 2) * p.layerScale + 4;
          else if (p.type === "bifido")      lx = p.x + p.branchLen * p.layerScale + 4;
          else if (p.type === "akkermansia") lx = p.x + p.akkRadiusX * 1.2 * p.layerScale + 4;

          ctx.save();
          ctx.font = cw < 768 ? "500 8px Inter, sans-serif" : "500 10px Inter, sans-serif";
          const textWidth = ctx.measureText(p.labelName).width;
          const padding = 4;
          const pillX = lx - 2;
          const pillY = p.y - 8;

          // White pill background for legibility
          ctx.fillStyle = "rgba(255,255,255,0.75)";
          ctx.beginPath();
          ctx.roundRect(pillX, pillY, textWidth + padding * 2, 16, 4);
          ctx.fill();

          // Fixed dark amber — readable on the white pill regardless of particle colour
          ctx.fillStyle = "rgb(120, 60, 10)";
          ctx.fillText(p.labelName, pillX + padding, p.y + 4);
          ctx.restore();
        }
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
