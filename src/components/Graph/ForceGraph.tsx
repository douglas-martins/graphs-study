import React, { useEffect, useState } from 'react';
import { ForceGraph3D } from "react-force-graph";


import { useWindowDimensions } from "@customHooks/useWindowDimensions";
import { useStoreActions, useStoreState } from '../../store/storeHooks';

export type GraphDataNode = { id: string, name: string, value: number };
export type GraphDataLink = { source: string, target: string };
export type GraphData = {
    nodes: Array<GraphDataNode>,
    links: Array<{ source: string, target: string }>
};

const ForceGraph = (): JSX.Element => {
    const { height } = useWindowDimensions();
    const graph = useStoreState((state) => state.graph);
    const [graphData, setGraphData] = useState({
        nodes: new Array<GraphDataNode>(),
        links: new Array<GraphDataLink>(),
    })

    useEffect(() => {
        console.log(graph);
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
        setGraphData(newGraphData);
    }

    console.log(graphData)
    return (
        <>
            <ForceGraph3D graphData={graphData} height={height - 61} />
        </>
    );
};

export default ForceGraph;