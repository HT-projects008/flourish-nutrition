import { useRef, useEffect, useCallback } from "react";
import * as d3 from "d3";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface TreeDatum {
  name: string;
  type: "root" | "benefit" | "ingredient";
  children?: TreeDatum[];
}

const TREE_DATA: TreeDatum = {
  name: "Gut Health",
  type: "root",
  children: [
    {
      name: "Reduced Bloating", type: "benefit",
      children: [
        { name: "Ginger", type: "ingredient" },
        { name: "ACV", type: "ingredient" },
      ],
    },
    {
      name: "Fat Loss", type: "benefit",
      children: [
        { name: "ACV", type: "ingredient" },
        { name: "Cinnamon", type: "ingredient" },
      ],
    },
    {
      name: "Blood Sugar", type: "benefit",
      children: [
        { name: "Cinnamon", type: "ingredient" },
        { name: "Inulin", type: "ingredient" },
      ],
    },
    {
      name: "Immunity", type: "benefit",
      children: [
        { name: "Turmeric", type: "ingredient" },
        { name: "Black Pepper", type: "ingredient" },
      ],
    },
    {
      name: "Clearer Skin", type: "benefit",
      children: [
        { name: "Inulin", type: "ingredient" },
        { name: "Lemon", type: "ingredient" },
      ],
    },
    {
      name: "Mental Clarity", type: "benefit",
      children: [
        { name: "Inulin", type: "ingredient" },
        { name: "Ginger", type: "ingredient" },
      ],
    },
  ],
};

// d3.linkRadial() has .angle()/.radius() at runtime but TS types expose .x()/.y()
type LinkPoint = { x: number; y: number };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const radialLink = (d3 as any).linkRadial()
  .angle((d: LinkPoint) => d.x)
  .radius((d: LinkPoint) => d.y) as (link: { source: LinkPoint; target: LinkPoint }) => string | null;

function appendWrappedText(
  el: d3.Selection<SVGTextElement, unknown, null, undefined>,
  words: string[],
  fontSize: number,
) {
  const lh = fontSize * 1.2;
  if (words.length === 1) {
    el.append("tspan").attr("x", 0).attr("dy", "0.35em").text(words[0]);
  } else {
    const firstDy = -((words.length - 1) * lh) / 2 + fontSize * 0.35;
    words.forEach((w, i) => {
      el.append("tspan").attr("x", 0).attr("dy", i === 0 ? firstDy : lh).text(w);
    });
  }
}

export function BenefitsMindmap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const gsapCtxRef = useRef<gsap.Context | null>(null);
  const hasAnimatedRef = useRef(false);

  const draw = useCallback((width: number) => {
    // Kill previous GSAP context before clearing the DOM
    gsapCtxRef.current?.revert();
    gsapCtxRef.current = null;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const height = Math.round(width * 0.9);
    const pad = width < 400 ? 52 : 68;
    const outerR = Math.min(width, height) / 2 - pad;
    const innerR = outerR * 0.56;

    svg
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", `0 0 ${width} ${height}`);

    // Gradient for root node
    const defs = svg.append("defs");
    const grad = defs.append("radialGradient")
      .attr("id", "bmGrad")
      .attr("cx", "35%").attr("cy", "30%").attr("r", "70%");
    grad.append("stop").attr("offset", "0%").attr("stop-color", "#E8622A");
    grad.append("stop").attr("offset", "100%").attr("stop-color", "#D4744A");

    const g = svg.append("g").attr("transform", `translate(${width / 2},${height / 2})`);

    // Build hierarchy + radial tree layout
    const root = d3.hierarchy(TREE_DATA);
    const treeLayout = d3.tree<TreeDatum>()
      .size([2 * Math.PI, outerR])
      .separation((a, b) => (a.parent === b.parent ? 1 : 2) / (a.depth || 1));
    const treeRoot = treeLayout(root);

    // Fix radii to desired rings
    treeRoot.each(node => {
      if (node.depth === 1) node.y = innerR;
      if (node.depth === 2) node.y = outerR;
    });

    const benefits = treeRoot.children ?? [];

    // ── Main links: center → benefit ────────────────────────────────
    const mainLinksG = g.append("g").attr("class", "main-links");
    benefits.forEach((bNode, i) => {
      mainLinksG.append("path")
        .attr("class", "main-link")
        .attr("data-branch", i)
        .attr("fill", "none")
        .attr("stroke", "#D4744A")
        .attr("stroke-width", 1.5)
        .attr("pathLength", 1)
        .attr("stroke-dasharray", 1)
        .attr("d", radialLink({ source: treeRoot, target: bNode }) ?? "");
    });

    // ── Branch groups: sub-links + ingredient nodes + benefit node ───
    benefits.forEach((bNode, i) => {
      const branchG = g.append("g")
        .attr("class", "benefit-branch")
        .attr("data-branch", i);

      // Sub links: benefit → ingredient (dashed)
      (bNode.children ?? []).forEach(iNode => {
        branchG.append("path")
          .attr("class", "sub-link")
          .attr("fill", "none")
          .attr("stroke", "#E8B84B")
          .attr("stroke-width", 1)
          .attr("stroke-dasharray", "4 3")
          .attr("d", radialLink({ source: bNode, target: iNode }) ?? "");
      });

      // Ingredient nodes
      (bNode.children ?? []).forEach(iNode => {
        const ix = iNode.y * Math.sin(iNode.x);
        const iy = -iNode.y * Math.cos(iNode.x);
        const ig = branchG.append("g")
          .attr("class", "ingredient-node-g")
          .attr("transform", `translate(${ix.toFixed(2)},${iy.toFixed(2)})`);

        ig.append("circle")
          .attr("r", 18)
          .attr("fill", "#FFF7ED")
          .attr("stroke", "#FED7AA")
          .attr("stroke-width", 1);

        const it = ig.append("text")
          .attr("text-anchor", "middle")
          .attr("font-size", 6.5)
          .attr("font-weight", "500")
          .attr("font-family", "Inter, system-ui, sans-serif")
          .attr("fill", "#C2410C")
          .style("user-select", "none")
          .style("pointer-events", "none");

        appendWrappedText(it, iNode.data.name.split(" "), 6.5);
      });

      // Benefit node (on top of sub-links within group)
      const bx = bNode.y * Math.sin(bNode.x);
      const by = -bNode.y * Math.cos(bNode.x);

      const bG = branchG.append("g")
        .attr("class", "benefit-node-group")
        .attr("transform", `translate(${bx.toFixed(2)},${by.toFixed(2)})`)
        .style("cursor", "pointer");

      bG.append("circle")
        .attr("r", 28)
        .attr("fill", "#faf9f7")
        .attr("stroke", "#D4744A")
        .attr("stroke-width", 1.5);

      const bt = bG.append("text")
        .attr("text-anchor", "middle")
        .attr("font-size", 9)
        .attr("font-weight", "500")
        .attr("font-family", "Inter, system-ui, sans-serif")
        .attr("fill", "#27272a")
        .style("user-select", "none")
        .style("pointer-events", "none");

      appendWrappedText(bt, bNode.data.name.split(" "), 9);

      // Hover: highlight this branch, dim siblings
      bG.on("mouseenter", () => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        g.selectAll<SVGGElement, unknown>(".benefit-branch")
          .transition().duration(200).style("opacity", "0.2");
        g.selectAll<SVGPathElement, unknown>(".main-link")
          .transition().duration(200).style("opacity", "0.2");
        branchG.transition().duration(200).style("opacity", "1");
        g.select<SVGPathElement>(`.main-link[data-branch="${i}"]`)
          .transition().duration(200).style("opacity", "1");
      });

      bG.on("mouseleave", () => {
        g.selectAll<SVGGElement, unknown>(".benefit-branch")
          .transition().duration(200).style("opacity", "1");
        g.selectAll<SVGPathElement, unknown>(".main-link")
          .transition().duration(200).style("opacity", "1");
      });
    });

    // ── Root node (always on top) ────────────────────────────────────
    const rootG = g.append("g").attr("class", "root-node");
    rootG.append("circle").attr("r", 42).attr("fill", "url(#bmGrad)");
    rootG.append("circle")
      .attr("r", 50)
      .attr("fill", "none")
      .attr("stroke", "#FED7AA")
      .attr("stroke-width", 2)
      .attr("opacity", 0.55);

    const rt = rootG.append("text")
      .attr("text-anchor", "middle")
      .attr("font-size", 13)
      .attr("font-weight", "700")
      .attr("font-family", "Playfair Display, Georgia, serif")
      .attr("fill", "white")
      .style("user-select", "none")
      .style("pointer-events", "none");

    appendWrappedText(rt, ["Gut", "Health"], 13);

    // ── GSAP scroll animations ───────────────────────────────────────
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      if (!hasAnimatedRef.current) {
        // Hide everything before scroll trigger fires
        gsap.set(".root-node", { scale: 0, opacity: 0, transformOrigin: "0px 0px" });
        gsap.set(".main-link", { strokeDashoffset: 1 });
        gsap.set(".benefit-node-group", { scale: 0, opacity: 0, transformOrigin: "0px 0px" });
        gsap.set(".sub-link", { opacity: 0 });
        gsap.set(".ingredient-node-g", { scale: 0, opacity: 0, transformOrigin: "0px 0px" });

        gsap.timeline({
          scrollTrigger: {
            trigger: svgRef.current,
            start: "top 80%",
            once: true,
            onEnter: () => { hasAnimatedRef.current = true; },
          },
        })
          // 1. Root node springs in
          .to(".root-node", {
            scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.4)",
          })
          // 2. Main branch lines draw outward
          .to(".main-link", {
            strokeDashoffset: 0, duration: 0.5, ease: "power2.out", stagger: 0.08,
          }, "-=0.15")
          // 3. Benefit nodes pop in as their branch arrives
          .to(".benefit-node-group", {
            scale: 1, opacity: 1, duration: 0.35, ease: "back.out(1.7)", stagger: 0.08,
          }, "-=0.3")
          // 4. Sub-links fade in
          .to(".sub-link", {
            opacity: 1, duration: 0.3, ease: "power2.out", stagger: 0.04,
          }, "-=0.1")
          // 5. Ingredient nodes pop in last
          .to(".ingredient-node-g", {
            scale: 1, opacity: 1, duration: 0.25, ease: "back.out(1.7)", stagger: 0.04,
          }, "-=0.15");
      }
    }, svgRef);

    gsapCtxRef.current = ctx;
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ro = new ResizeObserver(entries => {
      const w = Math.round(entries[0].contentRect.width);
      if (w > 0) draw(w);
    });

    ro.observe(container);
    const w = container.clientWidth;
    if (w > 0) draw(w);

    return () => {
      ro.disconnect();
      gsapCtxRef.current?.revert();
    };
  }, [draw]);

  return (
    <div ref={containerRef} className="w-full">
      <svg
        ref={svgRef}
        role="img"
        aria-label="Diagram showing how Flourish's six key benefits connect back to gut health"
        className="block"
      />
    </div>
  );
}
