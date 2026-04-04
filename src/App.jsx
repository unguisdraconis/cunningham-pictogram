import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const CunninghamPictogram = () => {
  const svgRef = useRef(null);

  const data = [
    { decade: "1940s", female: 25, male: 5, works: 18 },
    { decade: "1950s", female: 28, male: 9, works: 40 },
    { decade: "1960s", female: 12, male: 13, works: 22 },
    { decade: "1970s", female: 18, male: 15, works: 15 },
    { decade: "1980s", female: 21, male: 12, works: 25 },
    { decade: "1990s", female: 16, male: 14, works: 18 },
    { decade: "2000s", female: 16, male: 17, works: 10 },
    { decade: "2010s", female: 7, male: 7, works: 2 },
  ];

  useEffect(() => {
    if (!svgRef.current) return;

    d3.select(svgRef.current).selectAll("*").remove();

    // Layout configuration
    const margin = { top: 110, right: 60, bottom: 150, left: 90 };
    const iconSize = 20;
    const iconPadX = 3;
    const iconPadY = 4;
    const iconsPerRow = 10;
    const rowHeight = iconSize + iconPadY;
    const decadeGap = 24;

    const maxTotal = d3.max(data, (d) => d.female + d.male);
    const maxRows = Math.ceil(maxTotal / iconsPerRow);
    const maxWorksRows = Math.ceil(d3.max(data, (d) => d.works) / iconsPerRow);
    const decadeBlockHeight =
      Math.max(maxRows, maxWorksRows) * rowHeight + decadeGap;

    const sectionWidth = iconsPerRow * (iconSize + iconPadX);
    const annotationWidth = 45;
    const gapBetweenSections = 100;
    const totalWidth =
      margin.left +
      sectionWidth +
      annotationWidth +
      gapBetweenSections +
      sectionWidth +
      annotationWidth +
      margin.right;
    const chartHeight = data.length * decadeBlockHeight;
    const totalHeight = margin.top + chartHeight + margin.bottom;

    const svg = d3
      .select(svgRef.current)
      .attr("viewBox", `0 0 ${totalWidth} ${totalHeight}`)
      .attr("width", "100%")
      .attr("height", "100%");

    // Background
    svg
      .append("rect")
      .attr("width", totalWidth)
      .attr("height", totalHeight)
      .attr("fill", "#fdfcfa")
      .attr("rx", 10);

    // Title
    svg
      .append("text")
      .attr("x", totalWidth / 2)
      .attr("y", 40)
      .attr("text-anchor", "middle")
      .attr("font-family", "'Georgia', 'Times New Roman', serif")
      .attr("font-size", 28)
      .attr("font-weight", "bold")
      .attr("fill", "#1a1a2e")
      .text("Merce Cunningham Dance Company");

    svg
      .append("text")
      .attr("x", totalWidth / 2)
      .attr("y", 70)
      .attr("text-anchor", "middle")
      .attr("font-family", "'Georgia', 'Times New Roman', serif")
      .attr("font-size", 16)
      .attr("fill", "#555")
      .text("Active Dancers by Sex & Premiered Works per Decade (1940s–2010s)");

    // Draw functions
    const drawFemaleDancer = (parent, x, y, size, color) => {
      const s = size;
      const g = parent.append("g").attr("transform", `translate(${x}, ${y})`);

      g.append("circle")
        .attr("cx", s * 0.5)
        .attr("cy", s * 0.14)
        .attr("r", s * 0.08)
        .attr("fill", color);

      g.append("line")
        .attr("x1", s * 0.5)
        .attr("y1", s * 0.22)
        .attr("x2", s * 0.48)
        .attr("y2", s * 0.5)
        .attr("stroke", color)
        .attr("stroke-width", 1.8)
        .attr("stroke-linecap", "round");

      g.append("path")
        .attr(
          "d",
          `M ${s * 0.48} ${s * 0.5} Q ${s * 0.65} ${s * 0.42} ${s * 0.88} ${s * 0.35}`,
        )
        .attr("stroke", color)
        .attr("stroke-width", 1.8)
        .attr("fill", "none")
        .attr("stroke-linecap", "round");

      g.append("path")
        .attr(
          "d",
          `M ${s * 0.48} ${s * 0.5} Q ${s * 0.44} ${s * 0.68} ${s * 0.46} ${s * 0.92}`,
        )
        .attr("stroke", color)
        .attr("stroke-width", 1.8)
        .attr("fill", "none")
        .attr("stroke-linecap", "round");

      g.append("line")
        .attr("x1", s * 0.46)
        .attr("y1", s * 0.92)
        .attr("x2", s * 0.46)
        .attr("y2", s * 0.97)
        .attr("stroke", color)
        .attr("stroke-width", 1.4)
        .attr("stroke-linecap", "round");

      g.append("path")
        .attr(
          "d",
          `M ${s * 0.5} ${s * 0.3} Q ${s * 0.3} ${s * 0.18} ${s * 0.12} ${s * 0.12}`,
        )
        .attr("stroke", color)
        .attr("stroke-width", 1.5)
        .attr("fill", "none")
        .attr("stroke-linecap", "round");

      g.append("path")
        .attr(
          "d",
          `M ${s * 0.5} ${s * 0.3} Q ${s * 0.65} ${s * 0.15} ${s * 0.78} ${s * 0.08}`,
        )
        .attr("stroke", color)
        .attr("stroke-width", 1.5)
        .attr("fill", "none")
        .attr("stroke-linecap", "round");

      g.append("path")
        .attr(
          "d",
          `M ${s * 0.35} ${s * 0.48} Q ${s * 0.48} ${s * 0.55} ${s * 0.62} ${s * 0.46}`,
        )
        .attr("stroke", color)
        .attr("stroke-width", 1.2)
        .attr("fill", color)
        .attr("opacity", 0.4);
    };

    const drawMaleDancer = (parent, x, y, size, color) => {
      const s = size;
      const g = parent.append("g").attr("transform", `translate(${x}, ${y})`);

      g.append("circle")
        .attr("cx", s * 0.48)
        .attr("cy", s * 0.14)
        .attr("r", s * 0.08)
        .attr("fill", color);

      g.append("line")
        .attr("x1", s * 0.48)
        .attr("y1", s * 0.22)
        .attr("x2", s * 0.46)
        .attr("y2", s * 0.5)
        .attr("stroke", color)
        .attr("stroke-width", 2.0)
        .attr("stroke-linecap", "round");

      g.append("path")
        .attr(
          "d",
          `M ${s * 0.46} ${s * 0.5} Q ${s * 0.3} ${s * 0.52} ${s * 0.12} ${s * 0.42}`,
        )
        .attr("stroke", color)
        .attr("stroke-width", 2.0)
        .attr("fill", "none")
        .attr("stroke-linecap", "round");

      g.append("path")
        .attr(
          "d",
          `M ${s * 0.46} ${s * 0.5} Q ${s * 0.65} ${s * 0.55} ${s * 0.85} ${s * 0.62}`,
        )
        .attr("stroke", color)
        .attr("stroke-width", 2.0)
        .attr("fill", "none")
        .attr("stroke-linecap", "round");

      g.append("line")
        .attr("x1", s * 0.12)
        .attr("y1", s * 0.42)
        .attr("x2", s * 0.06)
        .attr("y2", s * 0.4)
        .attr("stroke", color)
        .attr("stroke-width", 1.4)
        .attr("stroke-linecap", "round");

      g.append("line")
        .attr("x1", s * 0.85)
        .attr("y1", s * 0.62)
        .attr("x2", s * 0.9)
        .attr("y2", s * 0.65)
        .attr("stroke", color)
        .attr("stroke-width", 1.4)
        .attr("stroke-linecap", "round");

      g.append("path")
        .attr(
          "d",
          `M ${s * 0.48} ${s * 0.3} Q ${s * 0.35} ${s * 0.12} ${s * 0.25} ${s * 0.05}`,
        )
        .attr("stroke", color)
        .attr("stroke-width", 1.5)
        .attr("fill", "none")
        .attr("stroke-linecap", "round");

      g.append("path")
        .attr(
          "d",
          `M ${s * 0.48} ${s * 0.3} Q ${s * 0.68} ${s * 0.25} ${s * 0.82} ${s * 0.18}`,
        )
        .attr("stroke", color)
        .attr("stroke-width", 1.5)
        .attr("fill", "none")
        .attr("stroke-linecap", "round");
    };

    const drawStar = (parent, cx, cy, r, fillColor, strokeColor) => {
      const points = 5;
      const outerR = r;
      const innerR = r * 0.45;
      let pathStr = "";
      for (let i = 0; i < points * 2; i++) {
        const angle = (Math.PI / points) * i - Math.PI / 2;
        const radius = i % 2 === 0 ? outerR : innerR;
        const px = cx + radius * Math.cos(angle);
        const py = cy + radius * Math.sin(angle);
        pathStr += (i === 0 ? "M" : "L") + `${px},${py}`;
      }
      pathStr += "Z";
      parent
        .append("path")
        .attr("d", pathStr)
        .attr("fill", fillColor)
        .attr("stroke", strokeColor)
        .attr("stroke-width", 0.6);
    };

    // Colors
    const femaleColor = "#d63384";
    const maleColor = "#0d6efd";
    const worksColor = "#ffc107";
    const worksStroke = "#e67e22";

    const dancerColX = margin.left;
    const worksColX =
      margin.left + sectionWidth + annotationWidth + gapBetweenSections;

    // Column headers
    svg
      .append("text")
      .attr("x", dancerColX + sectionWidth / 2)
      .attr("y", margin.top - 18)
      .attr("text-anchor", "middle")
      .attr("font-family", "'Helvetica Neue', Arial, sans-serif")
      .attr("font-size", 12)
      .attr("font-weight", "bold")
      .attr("fill", "#333")
      .attr("letter-spacing", "1.5px")
      .text("DANCERS");

    svg
      .append("text")
      .attr("x", worksColX + sectionWidth / 2)
      .attr("y", margin.top - 18)
      .attr("text-anchor", "middle")
      .attr("font-family", "'Helvetica Neue', Arial, sans-serif")
      .attr("font-size", 12)
      .attr("font-weight", "bold")
      .attr("fill", "#333")
      .attr("letter-spacing", "1.5px")
      .text("PREMIERED WORKS");

    // Separator line
    const separatorX =
      margin.left + sectionWidth + annotationWidth + gapBetweenSections / 2;
    svg
      .append("line")
      .attr("x1", separatorX)
      .attr("y1", margin.top - 25)
      .attr("x2", separatorX)
      .attr("y2", margin.top + chartHeight - decadeGap)
      .attr("stroke", "#ddd")
      .attr("stroke-width", 1)
      .attr("stroke-dasharray", "4,3");

    // Draw each decade
    data.forEach((d, i) => {
      const yOffset = margin.top + i * decadeBlockHeight;

      // Decade label
      svg
        .append("text")
        .attr("x", margin.left - 14)
        .attr("y", yOffset + decadeBlockHeight / 2 - decadeGap / 2)
        .attr("text-anchor", "end")
        .attr("dominant-baseline", "middle")
        .attr("font-family", "'Helvetica Neue', Arial, sans-serif")
        .attr("font-size", 16)
        .attr("font-weight", "bold")
        .attr("fill", "#0f172a")
        .attr("letter-spacing", "0.5px")
        .text(d.decade);

      // Alternating row background
      if (i % 2 === 0) {
        svg
          .append("rect")
          .attr("x", margin.left - 8)
          .attr("y", yOffset - 4)
          .attr("width", totalWidth - margin.left - margin.right + 16)
          .attr("height", decadeBlockHeight - decadeGap + 8)
          .attr("fill", "#f4f1eb")
          .attr("rx", 5)
          .attr("opacity", 0.5);
      }

      // Draw dancer icons
      let iconIndex = 0;

      for (let f = 0; f < d.female; f++) {
        const col = iconIndex % iconsPerRow;
        const row = Math.floor(iconIndex / iconsPerRow);
        const ix = dancerColX + col * (iconSize + iconPadX);
        const iy = yOffset + row * rowHeight;
        drawFemaleDancer(svg, ix, iy, iconSize, femaleColor);
        iconIndex++;
      }

      for (let m = 0; m < d.male; m++) {
        const col = iconIndex % iconsPerRow;
        const row = Math.floor(iconIndex / iconsPerRow);
        const ix = dancerColX + col * (iconSize + iconPadX);
        const iy = yOffset + row * rowHeight;
        drawMaleDancer(svg, ix, iy, iconSize, maleColor);
        iconIndex++;
      }

      // Dancer count annotations
      const dancerAnnotationX = dancerColX + sectionWidth + 8;
      svg
        .append("text")
        .attr("x", dancerAnnotationX)
        .attr("y", yOffset + 10)
        .attr("font-family", "'Helvetica Neue', Arial, sans-serif")
        .attr("font-size", 9)
        .attr("fill", femaleColor)
        .attr("font-weight", "bold")
        .text(`♀ ${d.female}`);

      svg
        .append("text")
        .attr("x", dancerAnnotationX)
        .attr("y", yOffset + 22)
        .attr("font-family", "'Helvetica Neue', Arial, sans-serif")
        .attr("font-size", 9)
        .attr("fill", maleColor)
        .attr("font-weight", "bold")
        .text(`♂ ${d.male}`);

      svg
        .append("text")
        .attr("x", dancerAnnotationX)
        .attr("y", yOffset + 34)
        .attr("font-family", "'Helvetica Neue', Arial, sans-serif")
        .attr("font-size", 9)
        .attr("fill", "#666")
        .text(`Σ ${d.female + d.male}`);

      // Draw works stars
      for (let w = 0; w < d.works; w++) {
        const col = w % iconsPerRow;
        const row = Math.floor(w / iconsPerRow);
        const sx = worksColX + col * (iconSize + iconPadX) + iconSize / 2;
        const sy = yOffset + row * rowHeight + iconSize / 2;
        drawStar(svg, sx, sy, iconSize * 0.4, worksColor, worksStroke);
      }

      // Works count
      const worksAnnotationX = worksColX + sectionWidth + 8;
      svg
        .append("text")
        .attr("x", worksAnnotationX)
        .attr("y", yOffset + 12)
        .attr("font-family", "'Helvetica Neue', Arial, sans-serif")
        .attr("font-size", 10)
        .attr("fill", worksStroke)
        .attr("font-weight", "bold")
        .text(d.works);
    });

    // Legend
    const legendY = totalHeight - 120;
    const legendX = margin.left;
    const legendWidth = totalWidth - margin.left - margin.right;
    const legend = svg
      .append("g")
      .attr("transform", `translate(${legendX}, ${legendY})`);

    // Legend background
    legend
      .append("rect")
      .attr("x", -15)
      .attr("y", -15)
      .attr("width", legendWidth + 30)
      .attr("height", 95)
      .attr("fill", "#fff")
      .attr("stroke", "#e0e0e0")
      .attr("stroke-width", 1)
      .attr("rx", 8);

    legend
      .append("text")
      .attr("x", 0)
      .attr("y", 5)
      .attr("font-family", "'Helvetica Neue', Arial, sans-serif")
      .attr("font-size", 10)
      .attr("font-weight", "bold")
      .attr("fill", "#555")
      .attr("letter-spacing", "1.5px")
      .text("LEGEND");

    // Row 1: Female and Male
    const legendIconSize = 28;
    const row1Y = 18;

    drawFemaleDancer(legend, 0, row1Y, legendIconSize, femaleColor);
    legend
      .append("text")
      .attr("x", legendIconSize + 8)
      .attr("y", row1Y + legendIconSize / 2 + 2)
      .attr("dominant-baseline", "middle")
      .attr("font-family", "'Helvetica Neue', Arial, sans-serif")
      .attr("font-size", 11)
      .attr("fill", "#333")
      .text("= 1 Female Dancer (arabesque)");

    const maleLegendX = legendWidth / 2;
    drawMaleDancer(legend, maleLegendX, row1Y, legendIconSize, maleColor);
    legend
      .append("text")
      .attr("x", maleLegendX + legendIconSize + 8)
      .attr("y", row1Y + legendIconSize / 2 + 2)
      .attr("dominant-baseline", "middle")
      .attr("font-family", "'Helvetica Neue', Arial, sans-serif")
      .attr("font-size", 11)
      .attr("fill", "#333")
      .text("= 1 Male Dancer (grand jeté)");

    // Row 2: Star
    const row2Y = row1Y + legendIconSize + 12;
    drawStar(legend, 12, row2Y + 6, 9, worksColor, worksStroke);
    legend
      .append("text")
      .attr("x", legendIconSize + 8)
      .attr("y", row2Y + 8)
      .attr("dominant-baseline", "middle")
      .attr("font-family", "'Helvetica Neue', Arial, sans-serif")
      .attr("font-size", 11)
      .attr("fill", "#333")
      .text("= 1 Premiered Work");

    // Source note
    svg
      .append("text")
      .attr("x", totalWidth / 2)
      .attr("y", totalHeight - 12)
      .attr("text-anchor", "middle")
      .attr("font-family", "'Helvetica Neue', Arial, sans-serif")
      .attr("font-size", 9)
      .attr("fill", "#aaa")
      .text(
        "Source: https://zenodo.org/records/3774548  •  Each icon = 1 individual  •  Dancers counted as active if tenure overlapped the decade",
      );
  }, []);

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "860px",
        height: "calc(100vh - 48px)",
        margin: "24px auto",
        padding: "16px",
        background: "#ffffff",
        borderRadius: "14px",
        boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
        border: "1px solid #eee",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      <svg
        ref={svgRef}
        style={{
          width: "100%",
          height: "100%",
          maxWidth: "100%",
          maxHeight: "100%",
          display: "block",
        }}
      />
    </div>
  );
};

export default CunninghamPictogram;
