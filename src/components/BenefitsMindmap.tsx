import { useRef, useEffect, useCallback } from "react";
import * as d3 from "d3";

interface TreeDatum {
  name: string;
  type: "root" | "benefit" | "ingredient";
  children?: TreeDatum[];
}

const TREE_DATA: TreeDatum = {
  name: "Gut\nHealth",
  type: "root",
  children: [
    {
      name: "Reduced\nBloating",
      type: "benefit",
      children: [
        { name: "Ginger", type: "ingredient" },
        { name: "ACV", type: "ingredient" },
      ],
    },
    {
      name: "Fat Loss\nSupport",
      type: "benefit",
      children: [
        { name: "ACV", type: "ingredient" },
        { name: "Cinnamon", type: "ingredient" },
      ],
    },
    {
      name: "Blood Sugar\nBalance",
      type: "benefit",
      children: [
        { name: "Cinnamon", type: "ingredient" },
        { name: "Inulin", type: "ingredient" },
      ],
    },
    {
      name: "Stronger\nImmunity",
      type: "benefit",
      children: [
        { name: "Turmeric", type: "ingredient" },
        { name: "Pepper", type: "ingredient" },
      ],
    },
    {
      name: "Clearer\nSkin",
      type: "benefit",
      children: [
        { name: "Inulin", type: "ingredient" },
        { name: "Lemon", type: "ingredient" },
      ],
    },
    {
      name: "Mental\nClarity",
      type: "benefit",
      children: [
        { name: "Inulin", type: "ingredient" },
        { name: "Ginger", type: "ingredient" },
      ],
    },
  ],
};

type RadialPoint = { x: number; y: number };
// d3.linkRadial() uses .angle()/.radius() at runtime but TS types expose .x()/.y()
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const radialLink = (d3 as any).linkRadial()
  .angle((d: RadialPoint) => d.x)
  .radius((d: RadialPoint) => d.y) as (link: { source: RadialPoint; target: RadialPoint }) => string | null;

function wrapText(
  el: d3.Selection<SVGTextElement, unknown, null, undefined>,
  lines: string[],
  fontSize: number,
) {
  const lh = fontSize * 1.25;
  if (lines.length === 1) {
    el.append("tspan").attr("x", 0).attr("dy", "0.35em").text(lines[0]);
  } else {
    const firstDy = -((lines.length - 1) * lh) / 2 + fontSize * 0.35;
    lines.forEach((line, i) => {
      el.append("tspan").attr("x", 0).attr("dy", i === 0 ? firstDy : lh).text(line);
    });
  }
}

export function BenefitsMindmap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const draw = useCallback((width: number) => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const small = width < 480;
    const rScale = small ? 0.65 : 1;

    const height = Math.round(width * 0.9);
    const radius = (Math.min(width, height) / 2) * 0.82;

    const rRoot = 42 * rScale;
    const rBenefit = 28 * rScale;
    const rIngredient = 18 * rScale;
    const fsBenefit = 9 * rScale;
    const fsIngredient = 8 * rScale;
    const fsRoot = 13 * rScale;

    svg
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", `0 0 ${width} ${height}`);

    // Phase 2: radial gradient for root node
    const defs = svg.append("defs");
    const grad = defs.append("radialGradient")
      .attr("id", "bmRootGrad")
      .attr("cx", "35%").attr("cy", "30%").attr("r", "70%");
    grad.append("stop").attr("offset", "0%").attr("stop-color", "#E8622A");
    grad.append("stop").attr("offset", "100%").attr("stop-color", "#C4441A");

    const g = svg.append("g").attr("transform", `translate(${width / 2},${height / 2})`);

    // Phase 1: D3 radial tree layout
    const root = d3.hierarchy(TREE_DATA);
    const treeLayout = d3.tree<TreeDatum>()
      .size([2 * Math.PI, radius])
      .separation((a, b) => (a.parent === b.parent ? 1 : 2) / (a.depth || 1));
    const treeRoot = treeLayout(root);

    // Fix benefit and ingredient ring radii
    const benefitR = radius * 0.56;
    treeRoot.each(node => {
      if (node.depth === 1) node.y = benefitR;
      if (node.depth === 2) node.y = radius;
    });

    const benefits = treeRoot.children ?? [];

    // Main links: centre → benefit
    const mainLinksG = g.append("g").attr("class", "main-links");
    benefits.forEach((bNode, i) => {
      mainLinksG.append("path")
        .attr("class", "main-link")
        .attr("data-branch", i)
        .attr("fill", "none")
        .attr("stroke", "#D4744A")
        .attr("stroke-width", 1.5)
        .attr("opacity", 0.6)
        .attr("d", radialLink({ source: treeRoot, target: bNode }) ?? "");
    });

    // Branch groups: sub-links, ingredient nodes, benefit node
    benefits.forEach((bNode, i) => {
      const branchG = g.append("g")
        .attr("class", "benefit-branch")
        .attr("data-branch", i);

      // Sub-links: benefit → ingredient (dashed)
      (bNode.children ?? []).forEach(iNode => {
        branchG.append("path")
          .attr("class", "sub-link")
          .attr("fill", "none")
          .attr("stroke", "#E8B84B")
          .attr("stroke-width", 1)
          .attr("stroke-dasharray", "4 4")
          .attr("opacity", 0.4)
          .attr("d", radialLink({ source: bNode, target: iNode }) ?? "");
      });

      // Ingredient nodes
      (bNode.children ?? []).forEach(iNode => {
        const ix = iNode.y * Math.sin(iNode.x);
        const iy = -iNode.y * Math.cos(iNode.x);
        const ig = branchG.append("g")
          .attr("transform", `translate(${ix.toFixed(2)},${iy.toFixed(2)})`);

        ig.append("circle")
          .attr("r", rIngredient)
          .attr("fill", "#FFF7ED")
          .attr("stroke", "#FDBA74")
          .attr("stroke-width", 1);

        const it = ig.append("text")
          .attr("text-anchor", "middle")
          .attr("font-size", fsIngredient)
          .attr("font-weight", "500")
          .attr("font-family", "Inter, system-ui, sans-serif")
          .attr("fill", "#c2410c")
          .style("user-select", "none")
          .style("pointer-events", "none");

        wrapText(it, iNode.data.name.split("\n"), fsIngredient);
      });

      // Benefit node
      const bx = bNode.y * Math.sin(bNode.x);
      const by = -bNode.y * Math.cos(bNode.x);

      const bG = branchG.append("g")
        .attr("transform", `translate(${bx.toFixed(2)},${by.toFixed(2)})`)
        .style("cursor", "pointer");

      const bCircle = bG.append("circle")
        .attr("r", rBenefit)
        .attr("fill", "#FAF9F6")
        .attr("stroke", "#E8622A")
        .attr("stroke-width", 1.5);

      const bt = bG.append("text")
        .attr("text-anchor", "middle")
        .attr("font-size", fsBenefit)
        .attr("font-weight", "500")
        .attr("font-family", "Inter, system-ui, sans-serif")
        .attr("fill", "#27272a")
        .style("user-select", "none")
        .style("pointer-events", "none");

      wrapText(bt, bNode.data.name.split("\n"), fsBenefit);

      // Phase 3: hover — dim siblings, brighten hovered node stroke
      bG.on("mouseenter", () => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        g.selectAll<SVGGElement, unknown>(".benefit-branch")
          .transition().duration(200).style("opacity", "0.2");
        g.selectAll<SVGPathElement, unknown>(".main-link")
          .transition().duration(200).style("opacity", "0.2");

        branchG.transition().duration(200).style("opacity", "1");
        g.select<SVGPathElement>(`.main-link[data-branch="${i}"]`)
          .transition().duration(200).style("opacity", "1");

        bCircle.transition().duration(200)
          .attr("stroke", "#C4441A")
          .attr("stroke-width", 2.5);
      });

      bG.on("mouseleave", () => {
        g.selectAll<SVGGElement, unknown>(".benefit-branch")
          .transition().duration(200).style("opacity", "1");
        g.selectAll<SVGPathElement, unknown>(".main-link")
          .transition().duration(200).style("opacity", "1");

        bCircle.transition().duration(200)
          .attr("stroke", "#E8622A")
          .attr("stroke-width", 1.5);
      });
    });

    // Root node — always rendered on top
    const rootG = g.append("g");
    rootG.append("circle")
      .attr("r", rRoot)
      .attr("fill", "url(#bmRootGrad)");

    const rt = rootG.append("text")
      .attr("text-anchor", "middle")
      .attr("font-size", fsRoot)
      .attr("font-weight", "700")
      .attr("font-family", "Playfair Display, Georgia, serif")
      .attr("fill", "white")
      .style("user-select", "none")
      .style("pointer-events", "none");

    wrapText(rt, TREE_DATA.name.split("\n"), fsRoot);
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

    return () => ro.disconnect();
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
