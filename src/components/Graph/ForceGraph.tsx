import React, { useEffect, useState } from 'react';
import { ForceGraph3D } from "react-force-graph";

import { useModal } from '@components/Modal/customHooks/useModal'
import { Graph } from '@components/Graph/graph';
import { GraphType } from '@components/Graph/graphType';
import { Vertex } from '@components/Graph/vertex';
import SystemModal from "@components/Modal/SystemModal";
import AddVertexModal from "@components/Modal/components/AddVertexModal";

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
        const body: JSX.Element = type === 'vertex' ? <AddVertexModal addVertex={addVertex} /> : (<div />);
        const onSave: Function = type === 'vertex' ? addVertex : addEdge;
        return (
            <SystemModal
                size="lg"
                title={title}
                body={body}
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
            <ForceGraph3D graphData={graphData} width={1300} height={700} />
            {renderModal()}
        </>
    );
};

export default ForceGraph;