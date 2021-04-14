import React, { useEffect, useState } from 'react';

import { Graph } from '@components/Graph/graph';
import { GraphType } from '@components/Graph/graphType';
import { Vertex } from '@components/Graph/vertex';
import { ForceGraph3D } from "react-force-graph";

type GraphDataNode = { id: string, name: string, value: number };
type GraphDataLink = { source: string, target: string };
type GraphData = {
    nodes: Array<GraphDataNode>,
    links: Array<{ source: string, target: string }>
};

const ForceGraph = (): JSX.Element => {
    const [graph] = useState(new Graph(GraphType.UNDIRECTED));
    const [graphData, setGraphData] = useState({
        nodes: new Array<GraphDataNode>(),
        links: new Array<GraphDataLink>(),
    });

    useEffect(() => {
        // const vertex1 = new Vertex("test", "OPque diabos é um rotulo?")
        // const vertex2 = new Vertex("test 2", "OPque diabos é um rotulo?")
        // graph.addVertex(vertex1);
        // graph.addVertex(vertex2);
        // graph.addEdge("test", "test 2", 2)
        // // console.log(graphData);
        // // console.log(graphData.bfsTraversalIterative("test"))

        if (graph.adjacencyList.length > 0) {
            parseGraph();
        }
    }, [graph.adjacencyList]);

    const parseGraph = (): void => {
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
        console.log(newGraphData)
        setGraphData(newGraphData);
    };

    const addVertex = (name: string, label: string): void => {
        const vertex = new Vertex(name, label);
        graph.addVertex(vertex);
        parseGraph();
    }

    const addEdge = (vertexOne: string, vertexTwo: string, value: number): void => {
        graph.addEdge(vertexOne, vertexTwo, value);
        parseGraph();
    }

    return <>
        <button onClick={() => addVertex("name", "vertex")} type="button">add vertix</button>
        <button onClick={() => addVertex("name2", "vertex")} type="button">add vertix2</button>
        <button onClick={() => addEdge("name", "name2", 1)} type="button">add edge</button>
        <ForceGraph3D graphData={graphData} />
    </>
};

export default ForceGraph;