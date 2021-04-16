import React from "react";
import { ButtonGroup, DropdownButton, Form, Dropdown } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import './Header.css';

import { Vertex } from "@components/Graph/vertex";
import AddVertexModal from "@components/Modal/components/AddVertexModal";
import AddEdgesModal from "@components/Modal/components/AddEdgesModal";
import SystemModal from "@components/Modal/SystemModal";
import { useModal } from "@components/Modal/customHooks/useModal";
import { Link } from '@components/Graph/link';
import { GraphType } from "@components/Graph/graphType";
import { useStoreState, useStoreActions } from "../../store/storeHooks";

import { graphIcon } from './utils';

const Header = (): JSX.Element => {
    const { show, toggle, currentModal, changeCurrentModal } = useModal();
    const graph = useStoreState((state) => state.graph);
    const graphType = useStoreState((state) => state.type);
    const createNewGraph = useStoreActions((actions) => actions.createNewGraph);
    const addVertex = useStoreActions((actions) => actions.addVertex);
    const addEdge = useStoreActions((actions) => actions.addEdge);
    const runPrim = useStoreActions((actions) => actions.runPrim);


    const algorithms: { [key: string]: () => void }  = {
        bfs: () => console.log('Run BFS algorithm'),
        dfs: () => console.log('Run DFS algorithm'),
        prim: () => runPrim(''),
        roy: () => console.log('Run Roy algorithm'),
    };

    const handleAddVertex: Function = (name: string, label: string): void => {
        const vertex = new Vertex(name, label);
        addVertex(vertex);
        toggle();
    }

    const handleAddEdge: Function =
        (vertexOne: string, vertexTwo: string, value: number): void => {
            const link = new Link(vertexOne, vertexTwo, value);
            addEdge(link);
            toggle();
        }

    const renderModal: Function = (): JSX.Element | boolean => {
        if (!show) {
            return false;
        }

        const { type, title } = currentModal;
        const body: JSX.Element = type === 'vertex' ?
            <AddVertexModal addVertex={handleAddVertex} /> :
            (<AddEdgesModal addEdge={handleAddEdge} vertexes={graph.adjacencyList} />);
        const onSave: Function = type === 'vertex' ? handleAddVertex : handleAddEdge;
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

    const onChangeGraphType = (): void => {
        const newType: GraphType = graphType === 0 ? 1 : 0;
        createNewGraph(newType);
    };
    
    const renderRunAlgorithmsDropdownOptions = (): JSX.Element[] =>
        (['BFS', 'DFS', 'PRIM', 'Roy'].map((algorithm, index) => (
                <Dropdown.Item key={algorithm} eventKey={index.toString()}
                    onClick={() => {
                        if (algorithms[algorithm.toLowerCase()]) {
                            algorithms[algorithm.toLowerCase()]();
                        }
                    }}
                >
                    {algorithm}
                </Dropdown.Item>
            )));

    const getToggleLabel = (): string =>
        graphType === 1 ? 'Não Direcionado' : 'Direcionado';

    return (
        <nav className="navbar navbar-light bg-dark">
            <div className="form-inline">
                <a className="navbar-brand">
                    <img src={graphIcon}
                         width="100" height="35"
                         className="d-inline-block align-top" alt=""
                    />
                    <span className="header-span">&nbsp;&nbsp;Grafos</span>
                </a>
                <button
                    className="btn btn-outline-success mr-sm-2"
                    onClick={
                        () => changeCurrentModal({ title: 'Adicionar Vértice', type: 'vertex' })
                    } type="button">
                    Adicionar Vértice
                </button>
                <button
                    className="btn btn-outline-warning mr-sm-2"
                    onClick={
                        () => changeCurrentModal({ title: 'Adicionar Aresta', type: 'edge' })
                    } type="button">
                    Adicionar Aresta
                </button>
                <DropdownButton
                    as={ButtonGroup}
                    id="dropdown-variants-Info"
                    variant="info"
                    className="mr-sm-3"
                    title="Selecione um algoritmo"
                >
                    {renderRunAlgorithmsDropdownOptions()}
                </DropdownButton>
                <Form>
                    <Form.Check
                        type="switch"
                        id="graph-type-switch"
                        className="header-span"
                        label={getToggleLabel()}
                        value={graphType}
                        onChange={onChangeGraphType}
                    />
                </Form>
            </div>
            {renderModal()}
        </nav>
    )
}

export default Header;