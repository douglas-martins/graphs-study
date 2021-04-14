import React, { useEffect } from "react";

import { Vertex } from "@components/Graph/vertex";
import AddVertexModal from "@components/Modal/components/AddVertexModal";
import AddEdgesModal from "@components/Modal/components/AddEdgesModal";
import SystemModal from "@components/Modal/SystemModal";
import { useModal } from "@components/Modal/customHooks/useModal";
import { parseGraph } from "@components/Graph/utils";
import { useGraph } from "@customHooks/useGraph";

import "bootstrap/dist/css/bootstrap.min.css";

const Header = (): JSX.Element => {
    const { show, toggle, currentModal, changeCurrentModal } = useModal();
    const { graph, graphData, updateGraphData } = useGraph()

    const addVertex: Function = (name: string, label: string): void => {
        const vertex = new Vertex(name, label);
        graph.addVertex(vertex);
        const newGraphData = parseGraph(graph);
        updateGraphData(newGraphData);
        toggle();
    }

    const addEdge: Function =
        (vertexOne: string, vertexTwo: string, value: number): void => {
            graph.addEdge(vertexOne, vertexTwo, value);
            const newGraphData = parseGraph(graph);
            updateGraphData(newGraphData);
            toggle();
        }

    const renderModal: Function = (): JSX.Element | boolean => {
        if (!show) {
            return false;
        }

        const { type, title } = currentModal;
        const body: JSX.Element = type === 'vertex' ?
            <AddVertexModal addVertex={addVertex} /> :
            (<AddEdgesModal addEdge={addEdge} vertexes={graph.adjacencyList} />);
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
            <div className="pos-f-t">
                <div className="collapse" id="navbarToggleExternalContent">
                    <div className="bg-dark p-4">
                        <h5 className="text-white h4">Collapsed content</h5>
                        <span className="text-muted">Toggleable via the navbar brand.</span>
                    </div>
                </div>
                <nav className="navbar navbar-light bg-dark">
                    <div className="form-inline">
                        <button className="navbar-toggler mr-sm-3" type="button"
                                data-toggle="collapse"
                                data-target="#navbarToggleExternalContent"
                                aria-controls="navbarToggleExternalContent"
                                aria-expanded="false"
                                aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon" />
                        </button>
                        <button
                            className="btn btn-outline-success mr-sm-2"
                            onClick={
                                () => changeCurrentModal({ title: 'Vertex Modal', type: 'vertex' })
                            } type="button">
                            Adicionar Vértice
                        </button>
                        <button
                            className="btn btn-outline-warning mr-sm-2"
                            onClick={
                                () => changeCurrentModal({ title: 'Edge Modal', type: 'edge' })
                            } type="button">
                            Adicionar Aresta
                        </button>
                    </div>
                </nav>
            </div>
            {renderModal()}
        </>
    )
}

export default Header;