import React from "react";
import { ButtonGroup, DropdownButton, Form, Dropdown } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import './Header.css';

import { Vertex } from "@components/Graph/vertex";
import AddVertexModal from "@components/Modal/components/AddVertexModal";
import AddEdgesModal from "@components/Modal/components/AddEdgesModal";
import RoyAlgorithmOutput from "@components/Modal/components/RoyAlgorithmOutput";
import SystemModal from "@components/Modal/SystemModal";
import ProjectInfoModal from "@components/Modal/components/ProjectInfoModal";
import { useModal } from "@components/Modal/customHooks/useModal";
import { Link } from '@components/Graph/link';
import { GraphType } from "@components/Graph/graphType";
import { getBfsTemplate, getPrimTemplate } from '@components/Graph/templates';
import { useStoreState, useStoreActions } from "../../store/storeHooks";

import { graphIcon } from './utils';



const Header = (): JSX.Element => {
    const { show, toggle, currentModal, changeCurrentModal } = useModal();

    const graphType = useStoreState((state) => state.type);
    const createNewGraph = useStoreActions((actions) => actions.createNewGraph);
    const addVertex = useStoreActions((actions) => actions.addVertex);
    const addEdge = useStoreActions((actions) => actions.addEdge);
    const runPrim = useStoreActions((actions) => actions.runPrim);
    const runBfs = useStoreActions((actions) => actions.runBfs);
    const runDfs = useStoreActions((actions) => actions.runDfs);
    const setGraph = useStoreActions((actions) => actions.setGraph);

    const algorithms: { [key: string]: () => void }  = {
        bfs () {
            runBfs('');
        },
        dfs: () => {
            runDfs('')
        },
        prim () {
            runPrim('');
        },
        roy: () => {
            console.log('Run Roy algorithm');
            changeCurrentModal({ type: 'roy', title: 'Execução do algoritmo de Roy' });
        },
    };

    const samples: { [key: string]: () => void }  = {
        bfs () {
            setGraph(getBfsTemplate())
        },
        dfs: () => console.log('add DFS sample'),
        prim () {
            setGraph(getPrimTemplate());
        },
        roy: () => console.log('add Roy sample'),
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

    const modals: { [key: string]: JSX.Element } = {
        vertex: (<AddVertexModal addVertex={handleAddVertex} />),
        edge: (<AddEdgesModal addEdge={handleAddEdge} />),
        roy: (<RoyAlgorithmOutput />),
        about: (<ProjectInfoModal />),
    }

    const renderModal: Function = (): JSX.Element | boolean => {
        if (!show) {
            return false;
        }

        const { type, title } = currentModal;
        const body: JSX.Element = modals[type];

        if (!body) {
            return false;
        }

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

    const renderAlgorithmsDropdownOptions =
        (mappedValues: { [key: string]: () => void }): JSX.Element[] => {
        const elements = ['BFS', 'DFS']
        if (graphType === GraphType.DIRECTED) {
            elements.push('Roy');
        } else {
            elements.push('PRIM');
        }

        return elements.map((algorithm, index) => (
            <Dropdown.Item key={algorithm} eventKey={index.toString()}
               onClick={() => {
                   if (mappedValues[algorithm.toLowerCase()]) {
                       mappedValues[algorithm.toLowerCase()]();
                   }
               }}
            >
                {algorithm}
            </Dropdown.Item>
        ));
    }

    const getToggleLabel = (): string =>
        graphType === 1 ? 'Não Direcionado' : 'Direcionado';

    return (
        <nav className="navbar navbar-light bg-dark">
            <div className="form-inline">
                {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                <a className="navbar-brand" onClick={
                    () => changeCurrentModal({ title: 'Sobre o projeto', type: 'about' })
                }>
                    <img src={graphIcon}
                         width="100" height="35"
                         className="d-inline-block align-top project-logo" alt=""
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
                    {renderAlgorithmsDropdownOptions(algorithms)}
                </DropdownButton>
                <DropdownButton
                  as={ButtonGroup}
                  id="dropdown-variants-Info"
                  variant="info"
                  className="mr-sm-3"
                  title="Templates"
                >
                    {renderAlgorithmsDropdownOptions(samples)}
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