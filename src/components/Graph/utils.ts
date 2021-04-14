import { Graph } from "@components/Graph/graph";

type GraphDataNode = { id: string, name: string, value: number };
type GraphDataLink = { source: string, target: string };
type GraphData = {
    nodes: Array<GraphDataNode>,
    links: Array<{ source: string, target: string }>
};


export const parseGraph = (graph: Graph): GraphData => {
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
            });
        }
    }

    return newGraphData;
}