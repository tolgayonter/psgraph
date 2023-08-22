// specify the dimensions.
const width = 928;
const height = 600;

// create the SVG container
const svg = d3
  .create("svg")
  // .attr("width", width)
  // .attr("height", height)
  .attr("viewBox", [-width / 2, -height / 2, width, height]);
// .attr("style", "max-width: 100%; height: auto;");

// convert the hierarchy data into a flat data array
const root = d3.hierarchy(data);
const links = root.links();
const nodes = root.descendants();

// create the simulation
const simulation = d3
  .forceSimulation(nodes)
  .force(
    "link",
    d3
      .forceLink(links)
      .id((d) => d.id)
      .distance((link) => 10 * link.source.children.length)
      .strength(1)
  )
  .force("charge", d3.forceManyBody().strength(-50));
// .force("x", d3.forceX())
// .force("y", d3.forceY());

// append links
const link = svg
  .append("g")
  .attr("stroke", "#999")
  .attr("stroke-opacity", 0.6)
  .selectAll("line")
  .data(links)
  .join("line");

// append nodes
const node = svg
  .append("g")
  .attr("fill", "#fff")
  .attr("stroke", "#000")
  .attr("stroke-width", 1.5)
  .selectAll("circle")
  .data(nodes)
  .join("circle")
  .attr("fill", (d) => (d.children ? null : "#000"))
  .attr("stroke", (d) => (d.children ? null : "#fff"))
  .attr("r", 5)
  .call(drag(simulation));

node.append("title").text((d) => d.data.label);

simulation.on("tick", () => {
  link
    .attr("x1", (d) => d.source.x)
    .attr("y1", (d) => d.source.y)
    .attr("x2", (d) => d.target.x)
    .attr("y2", (d) => d.target.y);

  node.attr("transform", (d) => `translate(${d.x},${d.y})`);
  // node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
});

// invalidation.then(() => simulation.stop());

// TODO: arrowise
function drag(simulation) {
  function dragstarted(event, d) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
  }

  function dragended(event, d) {
    if (!event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }

  return d3
    .drag()
    .on("start", dragstarted)
    .on("drag", dragged)
    .on("end", dragended);
}

// not sure I want this.
document.body.appendChild(svg.node());
