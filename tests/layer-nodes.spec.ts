import "mocha";
import { assert } from "chai";

import { Graph } from "graphlib";

import layerNodes, { initializeRanks, getTightTree } from "../src/layer-nodes";

describe("Node Layer Assignment", () => {
  describe("Initial Ranking", () => {
    it("should be a function", () => {
      assert.isFunction(initializeRanks);
    });

    it("should return a mapping of nodes to ranks", () => {
      const graph = new Graph();
      let returnValue = initializeRanks(graph);

      assert.instanceOf(returnValue, Map);
      assert.isEmpty(returnValue);

      graph.setNode("a");
      graph.setNode("b");
      graph.setNode("c");
      graph.setNode("d");
      graph.setEdge("a", "b");
      graph.setEdge("b", "c");
      graph.setEdge("b", "d");

      returnValue = initializeRanks(graph);
      const returnedNodes = [...returnValue.keys()];
      const expectedNodes = ["a", "b", "c", "d"];
      const returnedRanks = [...returnValue.values()];
      const expectedRanks = [0, 1, 2, 2];

      assert.lengthOf(returnedNodes, 4);
      assert.sameMembers(returnedNodes, expectedNodes);
      assert.lengthOf(returnedRanks, 4);
      assert.sameMembers(returnedRanks, expectedRanks);
    });
  });

  describe("Tight Tree Generation", () => {
    it("should be a function", () => {
      assert.isFunction(getTightTree);
    });

    it("should return a tight tree", () => {
      const graph = new Graph();
      let ranks = new Map();
      let returnValue = getTightTree(graph, ranks);

      assert.isObject(returnValue);
      assert.strictEqual(returnValue.nodeCount(), 0);

      graph.setNode("a");
      graph.setNode("b");
      graph.setNode("c");
      graph.setNode("d");
      graph.setEdge("a", "b");
      graph.setEdge("b", "c");
      graph.setEdge("c", "d");

      ranks = initializeRanks(graph);
      returnValue = getTightTree(graph, ranks);

      assert.strictEqual(returnValue.nodeCount(), 4);
    });
  });

  describe("Node Layering", () => {
    it("should be a function", () => {
      assert.isFunction(layerNodes);
    });

    it("should return an array of layers", () => {
      const graph = new Graph();
      let returnValue = layerNodes(graph);

      assert.isArray(returnValue);
      assert.lengthOf(returnValue, 1);
      assert.isArray(returnValue[0]);
      assert.isEmpty(returnValue[0]);

      graph.setNode("a");
      graph.setNode("b");
      graph.setNode("c");
      graph.setEdge("a", "b");
      graph.setEdge("b", "c");
      graph.setEdge("c", "a");

      returnValue = layerNodes(graph);
      const returnedNodes = returnValue.flat();
      const expectedNodes = ["a", "b", "c"];

      assert.lengthOf(returnValue, 2);
      assert.isNotEmpty(returnValue[0]);
      assert.isNotEmpty(returnValue[1]);
      assert.sameMembers(returnedNodes, expectedNodes);
    });
  });
});