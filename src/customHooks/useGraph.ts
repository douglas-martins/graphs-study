import { useState } from "react";
import { Graph } from "@components/Graph/graph";
import { GraphType } from "@components/Graph/graphType";

type GraphDataNode = { id: string, name: string, value: number };
type GraphDataLink = { source: string, target: string };
type GraphData = {
    nodes: Array<GraphDataNode>,
    links: Array<{ source: string, target: string }>
};

export const useGraph = () => {
    const [graph, setGraph] = useState<Graph>(new Graph(GraphType.UNDIRECTED));
    const [graphData, setGraphData] = useState({
        nodes: new Array<GraphDataNode>(),
        links: new Array<GraphDataLink>(),
    });

    const updateGraph = (newGraph: Graph): void => {
        const test = new Graph(GraphType.UNDIRECTED);
        test.adjacencyList = newGraph.adjacencyList;
        setGraph(test);
    }

    const updateGraphData = (newGraphData: GraphData): void => {
      setGraphData(newGraphData)
    };

    return {
        graph,
        graphData,
        updateGraph,
        updateGraphData
    }
};