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
        if (graph.adjacencyList.length > 0) {
            parseGraph();
        }
    }, [graph.adjacencyList]); // eslint-disable-line

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

    const removeVertex = (vertexName: string): void => {
        graph.removeVertex(vertexName);
        parseGraph();
    }

    const removeEdge = (vertexOneName: string, vertexTwoName: string): void => {
        graph.removeEdge(vertexOneName, vertexTwoName)
        parseGraph();
    }

    return <>
        <button onClick={() => addVertex("name", "vertex")} type="button">add vertix</button>
        <button onClick={() => addVertex("name2", "vertex")} type="button">add vertix2</button>
        <button onClick={() => addEdge("name", "name2", 1)} type="button">add edge</button>
        <ForceGraph3D
          graphData={graphData}
          nodeAutoColorBy={d => `${d.id}`}
          onNodeClick={(node) => removeVertex(`${node.id}`)}
          onLinkClick={(link) => {
              const { source, target } = link;
              if (
                source && typeof source !== 'string' && typeof source !== 'number' &&
                target && typeof target !== 'string' && typeof target !== 'number'
              ) {
                  removeEdge(`${source.id}`, `${target.id}`);
              }

          }}
        />
    </>
};

export default ForceGraph;