import { Graph } from "graphlib";
import removeCycles from "./remove-cycles";
import layerNodes from "./layer-nodes";
import minimiseCrossings from "./minimise-crossings";
import straightenEdges from "./straighten-edges";

/**
 * Produces a hierarchical layout of a directed graph. The algorithm is based on
 * the Sugiyama method, producing a layered graph through four steps: removing
 * cycles, layering nodes, minimising edge crossings and straightening edges.
 *
 * @param graph A graphlib graph object. Must be directed.
 */
function drawLayeredGraph(graph: Graph) {
  if (!graph.isDirected()) {
    throw new Error("Graph must be directed for layered drawing");
  }

  const originalEdges = removeCycles(graph);
  const two = layerNodes(graph);
  const three = minimiseCrossings(two);
  const four = straightenEdges(three);
}

export default drawLayeredGraph;
