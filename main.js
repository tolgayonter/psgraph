import * as d3 from "d3";
import data from "./data";

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

const graph = svg.append("g").attr("id", "graph");
// .attr("transform", d3.zoomIdentity); // what

// convert the hierarchy data into a flat data array
const root = d3.hierarchy(data);
root.fx = -width / 2; // add offset?
root.fy = 0;
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
  .force("charge", d3.forceManyBody().strength(-500))
  .force(
    "x",
    d3.forceX().x((d) => d.depth * 250)
  )
  .force("y", d3.forceY());

const zoom = d3.zoom().scaleExtent([0.5, 32]).on("zoom", zoomed);

// append links
const gLink = graph
  .append("g")
  .attr("id", "links")
  .attr("stroke", "#999")
  .attr("stroke-opacity", 0.6)
  .selectAll("line")
  .data(links)
  .join("line");

const gNode = graph
  .append("g")
  .attr("id", "nodes")
  .selectAll("g")
  .data(nodes)
  .join("g")
  .attr("id", (d) => d.data.id)
  .call(drag(simulation));

gNode.append("circle").attr("fill", "#fff").attr("stroke", "#000").attr("r", 5);

gNode
  .append("text")
  .attr("dx", 10)
  .attr("dy", ".35em")
  .text((d) => d.data.label)
  .attr("font-size", "10px")
  .attr("font-family", "Arial")
  .attr("fill", "#333");

// root node selection
// graph.select(`#nodes :first-child`).attr("id", "root").on(".drag", null);
graph.select(`#nodes #${root.data.id}`).on(".drag", null);

simulation.on("tick", () => {
  gLink
    .attr("x1", (d) => d.source.x)
    .attr("y1", (d) => d.source.y)
    .attr("x2", (d) => d.target.x)
    .attr("y2", (d) => d.target.y);

  gNode.attr("transform", (d) => `translate(${d.x},${d.y})`);
  //node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
});

svg.call(zoom).call(zoom.transform, d3.zoomIdentity);

simulation.tick(
  Math.ceil(
    Math.log(simulation.alphaMin()) / Math.log(1 - simulation.alphaDecay())
  )
);

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

function zoomed({ transform }) {
  graph.attr("transform", transform);
}

// not sure I want this.
document.body.appendChild(svg.node());
