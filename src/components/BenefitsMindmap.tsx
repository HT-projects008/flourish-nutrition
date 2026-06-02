import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

// ── SVG layout constants (all in viewBox "0 0 600 600" units) ────────────────
const CX = 300, CY = 300;
const CENTRAL_R   = 58;   // central node radius  (~120px at full container width)
const OUTER_RING_R = 67;  // decorative outer ring radius
const BENEFIT_R   = 26;   // benefit node radius  (~56px)
const SUB_R       = 16;   // sub-node radius      (~36px)
const BENEFIT_D   = 175;  // center → benefit node center
const SUB_D       = 65;   // benefit node edge → sub-node center
const CURVE       = 22;   // perpendicular offset for organic quadratic bezier
const SUB_ANG     = 0.63; // ±36° sub-branch spread (radians)

interface SubNode { label: string; angleOffset: number }
interface Benefit  { angle: number; label: string; subs: SubNode[] }

// Angles match standard math (0° = right, CCW positive) which maps correctly
// to SVG's y-down coordinate system:
//   270° → top, 330° → top-right, 30° → bottom-right, etc.
const BENEFITS: Benefit[] = [
  {
    angle: -Math.PI / 2,        // 270° — top
    label: "Reduced\nBloating",
    subs: [
      { label: "Ginger", angleOffset: -SUB_ANG },
      { label: "ACV",    angleOffset:  SUB_ANG },
    ],
  },
  {
    angle: -Math.PI / 6,        // 330° — top-right
    label: "Fat Loss\nSupport",
    subs: [
      { label: "ACV",      angleOffset: -SUB_ANG },
      { label: "Cinnamon", angleOffset:  SUB_ANG },
    ],
  },
  {
    angle: Math.PI / 6,         // 30° — bottom-right
    label: "Blood Sugar\nBalance",
    subs: [
      { label: "Cinnamon", angleOffset: -SUB_ANG },
      { label: "Inulin",   angleOffset:  SUB_ANG },
    ],
  },
  {
    angle: Math.PI / 2,         // 90° — bottom
    label: "Stronger\nImmunity",
    subs: [
      { label: "Turmeric",     angleOffset: -SUB_ANG },
      { label: "Black Pepper", angleOffset:  SUB_ANG },
    ],
  },
  {
    angle: 5 * Math.PI / 6,     // 150° — bottom-left
    label: "Clearer\nSkin",
    subs: [
      { label: "Inulin", angleOffset: -SUB_ANG },
      { label: "Lemon",  angleOffset:  SUB_ANG },
    ],
  },
  {
    angle: -5 * Math.PI / 6,    // 210° — top-left
    label: "Mental\nClarity",
    subs: [
      { label: "Inulin", angleOffset: -SUB_ANG },
      { label: "Ginger", angleOffset:  SUB_ANG },
    ],
  },
];

// Quadratic bezier from central node edge to benefit node center
// Control point is offset perpendicular to the branch for an organic curve
function mainBranchPath(angle: number): string {
  const s = { x: CX + CENTRAL_R * Math.cos(angle), y: CY + CENTRAL_R * Math.sin(angle) };
  const e = { x: CX + BENEFIT_D  * Math.cos(angle), y: CY + BENEFIT_D  * Math.sin(angle) };
  const mid = (CENTRAL_R + BENEFIT_D) / 2;
  const cp = {
    x: CX + mid * Math.cos(angle) + CURVE * (-Math.sin(angle)),
    y: CY + mid * Math.sin(angle) + CURVE *   Math.cos(angle),
  };
  return `M ${s.x.toFixed(1)} ${s.y.toFixed(1)} Q ${cp.x.toFixed(1)} ${cp.y.toFixed(1)} ${e.x.toFixed(1)} ${e.y.toFixed(1)}`;
}

// Straight dashed line from benefit node edge to sub-node center
function subBranchPath(bx: number, by: number, subAngle: number): string {
  const sx = bx + BENEFIT_R         * Math.cos(subAngle);
  const sy = by + BENEFIT_R         * Math.sin(subAngle);
  const ex = bx + (BENEFIT_R + SUB_D) * Math.cos(subAngle);
  const ey = by + (BENEFIT_R + SUB_D) * Math.sin(subAngle);
  return `M ${sx.toFixed(1)} ${sy.toFixed(1)} L ${ex.toFixed(1)} ${ey.toFixed(1)}`;
}

// Vertically-centred multi-line SVG text using tspan
function SvgLabel({
  lines, fontSize, fill, fontFamily, fontWeight = "normal",
}: {
  lines: string[]; fontSize: number; fill: string; fontFamily: string; fontWeight?: string | number;
}) {
  const lineH = fontSize * 1.3;
  const startDy = -(lines.length * lineH) / 2 + fontSize * 0.38;
  return (
    <text
      textAnchor="middle"
      fontSize={fontSize}
      fill={fill}
      fontFamily={fontFamily}
      fontWeight={fontWeight}
      style={{ userSelect: "none", pointerEvents: "none" }}
    >
      {lines.map((line, i) => (
        <tspan key={i} x="0" dy={i === 0 ? startDy : lineH}>
          {line}
        </tspan>
      ))}
    </text>
  );
}

export function BenefitsMindmap() {
  const svgRef = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const svg = svgRef.current;
      if (!svg) return;
      const q = gsap.utils.selector(svg);

      const tl = gsap.timeline({
        scrollTrigger: { trigger: svg, start: "top 80%", once: true },
        onComplete() {
          // Ambient pulse starts after the reveal finishes
          gsap.to(q(".mc-circle"), {
            scale: 1.05, duration: 2, ease: "sine.inOut",
            repeat: -1, yoyo: true, transformOrigin: "0px 0px",
          });
        },
      });

      tl
        // 1. Central node scales in with a spring feel
        .from(q(".mc-group"), {
          scale: 0, opacity: 0, duration: 0.6, ease: "back.out(1.4)",
          transformOrigin: "0px 0px",
        })
        // 2. Main branch lines draw from centre outward
        .from(q(".mb-path"), {
          strokeDashoffset: 1, duration: 0.5, ease: "power2.out", stagger: 0.08,
        }, "-=0.15")
        // 3. Benefit nodes pop in after their branch finishes
        .from(q(".bn-group"), {
          scale: 0, opacity: 0, duration: 0.35, ease: "back.out(1.7)", stagger: 0.08,
          transformOrigin: "0px 0px",
        }, "-=0.3")
        // 4. Sub-branch lines fade in (dashed paths — fade not draw for clean look)
        .from(q(".sb-path"), {
          opacity: 0, duration: 0.3, ease: "power2.out", stagger: 0.04,
        }, "-=0.1")
        // 5. Sub-nodes pop in last
        .from(q(".sn-group"), {
          scale: 0, opacity: 0, duration: 0.25, ease: "back.out(1.7)", stagger: 0.04,
          transformOrigin: "0px 0px",
        }, "-=0.15");
    },
    { scope: svgRef },
  );

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 600 600"
      width="100%"
      aria-label="Diagram showing how Flourish's six key benefits connect back to gut health"
      role="img"
      className="block mx-auto max-w-2xl"
    >
      <defs>
        <radialGradient id="centralGrad" cx="35%" cy="30%" r="70%">
          <stop offset="0%"   stopColor="#E8622A" />
          <stop offset="100%" stopColor="#D4744A" />
        </radialGradient>
      </defs>

      {/* ── Main branch paths (rendered first — behind all nodes) ─────────── */}
      {BENEFITS.map((b, i) => (
        <path
          key={`mb-${i}`}
          className="mb-path"
          d={mainBranchPath(b.angle)}
          stroke="#D4744A"
          strokeWidth="1.5"
          fill="none"
          pathLength="1"
          strokeDasharray="1"
        />
      ))}

      {/* ── Sub-branch paths (dashed, faded in by GSAP) ───────────────────── */}
      {BENEFITS.map((b, bi) => {
        const bx = CX + BENEFIT_D * Math.cos(b.angle);
        const by = CY + BENEFIT_D * Math.sin(b.angle);
        return b.subs.map((s, si) => {
          const sa = b.angle + s.angleOffset;
          return (
            <path
              key={`sb-${bi}-${si}`}
              className="sb-path"
              d={subBranchPath(bx, by, sa)}
              stroke="#FDBA74"
              strokeWidth="1"
              fill="none"
              strokeDasharray="3 3"
            />
          );
        });
      })}

      {/* ── Sub-nodes ─────────────────────────────────────────────────────── */}
      {BENEFITS.map((b, bi) => {
        const bx = CX + BENEFIT_D * Math.cos(b.angle);
        const by = CY + BENEFIT_D * Math.sin(b.angle);
        return b.subs.map((s, si) => {
          const sa = b.angle + s.angleOffset;
          const sx = bx + (BENEFIT_R + SUB_D) * Math.cos(sa);
          const sy = by + (BENEFIT_R + SUB_D) * Math.sin(sa);
          // Split multi-word ingredient names across 2 lines for small circles
          const lines = s.label.includes(" ") ? s.label.split(" ") : [s.label];
          return (
            <g key={`sn-${bi}-${si}`} className="sn-group" transform={`translate(${sx.toFixed(1)},${sy.toFixed(1)})`}>
              <circle r={SUB_R} fill="#FFF7ED" stroke="#FED7AA" strokeWidth="1" />
              <SvgLabel
                lines={lines}
                fontSize={6.5}
                fill="#C2410C"
                fontFamily="Inter, system-ui, sans-serif"
                fontWeight="500"
              />
            </g>
          );
        });
      })}

      {/* ── Benefit nodes ─────────────────────────────────────────────────── */}
      {BENEFITS.map((b, i) => {
        const bx = CX + BENEFIT_D * Math.cos(b.angle);
        const by = CY + BENEFIT_D * Math.sin(b.angle);
        const lines = b.label.split("\n");
        return (
          <g key={`bn-${i}`} className="bn-group" transform={`translate(${bx.toFixed(1)},${by.toFixed(1)})`}>
            <circle r={BENEFIT_R} fill="var(--color-cream)" stroke="#E8622A" strokeWidth="1.5" />
            <SvgLabel
              lines={lines}
              fontSize={9}
              fill="#27272a"
              fontFamily="Inter, system-ui, sans-serif"
              fontWeight="500"
            />
          </g>
        );
      })}

      {/* ── Central node (last — always on top) ───────────────────────────── */}
      <g className="mc-group" transform={`translate(${CX},${CY})`}>
        <circle className="mc-circle" r={CENTRAL_R} fill="url(#centralGrad)" />
        <circle r={OUTER_RING_R} fill="none" stroke="#FED7AA" strokeWidth="2" opacity="0.55" />
        <SvgLabel
          lines={["Gut", "Health"]}
          fontSize={13.5}
          fill="white"
          fontFamily="Playfair Display, Georgia, serif"
          fontWeight="700"
        />
      </g>
    </svg>
  );
}
