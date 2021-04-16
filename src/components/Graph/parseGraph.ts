import { Graph } from '@components/Graph/graph';
import { RecursiveState } from 'easy-peasy';

export type GraphDataNode = { id: string, name: string, value: number };
export type GraphDataLink = { source: string, target: string, weight: string };
export type GraphData = {
  nodes: Array<GraphDataNode>,
  links: Array<GraphDataLink>
};

export const parseGraph = (graph: RecursiveState<Graph>): GraphData => {
  const newGraphData: GraphData = {
    links: new Array<GraphDataLink>(),
    nodes: new Array<GraphDataNode>(),
  };

  for (const vertex of graph.adjacencyList) {
    newGraphData.nodes.push({
      id: vertex.name,
      name: `${vertex.name}-name`,
      value: 1,
    });

    for (const edge of vertex.edges) {
      newGraphData.links.push({
        source: vertex.name,
        target: edge.name,
        weight: edge.value.toString()
      });
    }
  }

  return newGraphData;
}