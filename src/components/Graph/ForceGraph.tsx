import React, { useEffect, useState } from 'react';

import { Graph } from '@components/Graph/graph';
import { GraphType } from '@components/Graph/graphType';
import { Vertex } from '@components/Graph/vertex';
import { ForceGraph3D } from "react-force-graph";


const ForceGraph = (): JSX.Element => {
    const graph = new Graph(GraphType.UNDIRECTED)
    const [graphData, setGraphData] = useState({
        nodes: new Array<{ id: string, name: string, value: number }>(),
        links: new Array<{ source: string, target: string }>(),
    });

    useEffect(() => {
        const vertex1 = new Vertex("test", "OPque diabos é um rotulo?")
        const vertex2 = new Vertex("test 2", "OPque diabos é um rotulo?")
        graph.addVertex(vertex1);
        graph.addVertex(vertex2);
        graph.addEdge("test", "test 2", 2)
        // console.log(graphData);
        // console.log(graphData.bfsTraversalIterative("test"))
        parseGraph();
    }, []);

    const parseGraph = (): void => {
        const newGraphData: {
            nodes: Array<{ id: string, name: string, value: number }>,
            links: Array<{ source: string, target: string }>
        } = {
            links: new Array<{ source: string, target: string }>(),
            nodes: new Array<{ id: string, name: string, value: number }>(),
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


    return <>
        <ForceGraph3D graphData={graphData} />
    </>
};

export default ForceGraph;