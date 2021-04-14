import React, { useEffect, useState } from 'react';

import { Graph } from '@components/Graph/graph';
import { GraphType } from '@components/Graph/graphType';
import { Vertex } from '@components/Graph/vertex';
import { ForceGraph3D } from "react-force-graph";
import SystemModal from "@components/Modal/SystemModal";
import { useModal } from '@components/Modal/customHooks/useModal'

type GraphDataNode = { id: string, name: string, value: number };
type GraphDataLink = { source: string, target: string };
type GraphData = {
    nodes: Array<GraphDataNode>,
    links: Array<{ source: string, target: string }>
};

const ForceGraph = (): JSX.Element => {
    const { show, toggle, currentModal, changeCurrentModal } = useModal();
    const [graph] = useState(new Graph(GraphType.UNDIRECTED));
    const [graphData, setGraphData] = useState({
        nodes: new Array<GraphDataNode>(),
        links: new Array<GraphDataLink>(),
    });

    useEffect(() => {
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
        toggle();
    };

    const addVertex: Function = (name: string, label: string): void => {
        const vertex = new Vertex(name, label);
        graph.addVertex(vertex);
        parseGraph();
    }

    const addEdge: Function =
        (vertexOne: string, vertexTwo: string, value: number): void => {
        graph.addEdge(vertexOne, vertexTwo, value);
        parseGraph();
    }

    const renderModal: Function = (): JSX.Element | boolean => {
        if (!show) {
            return false;
        }

        const { type, title } = currentModal;
        // const body: JSX.Element =
        const onSave: Function = type === 'vertex' ? addVertex : addEdge;
        return (
            <SystemModal
                size="lg"
                title={title}
                body={(<div>{title}</div>)}
                onClickSave={onSave}
                show={show}
                toggle={toggle}
            />
        );
    }

    return (
        <>
            <button
                onClick={
                    () => changeCurrentModal({ title: 'Vertex Modal', type: 'vertex' })
                } type="button">add vertix</button>
            {/* <button onClick={() => addVertex("name2", "vertex")} type="button">add vertix2</button> */}
            {/* <button onClick={() => addEdge("name", "name2", 1)} type="button">add edge</button> */}
            <ForceGraph3D graphData={graphData} width={1300} height={700} />
            {renderModal()}
        </>
    );
};

export default ForceGraph;