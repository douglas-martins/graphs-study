import React from 'react';
import { ButtonGroup, Dropdown, DropdownButton, Form } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css';

import { Vertex } from '@components/Graph/vertex';
import AddVertexModal from '@components/Modal/components/AddVertexModal';
import AddEdgesModal from '@components/Modal/components/AddEdgesModal';
import SystemModal from '@components/Modal/SystemModal';
import ProjectInfoModal from '@components/Modal/components/ProjectInfoModal';
import { useModal } from '@components/Modal/customHooks/useModal';
import { Link } from '@components/Graph/link';
import { GraphType } from '@components/Graph/graphType';
import {
    getBfsDfsTemplate, getBookExample,
    getCityTemplates,
    getCompanyAndCustomersTemplate,
    getPrimTemplate,
} from '@components/Graph/templates';
import EconomiesModal from '@components/Modal/components/EconomiesModal';
import { toast, ToastContainer } from 'react-toastify';
import AStarModal from '@components/Modal/components/AStarModal';
import { useStoreActions, useStoreState } from '../../store/storeHooks';

import { graphIcon } from './utils';



const Header = (): JSX.Element => {
    const { show, toggle, currentModal, changeCurrentModal } = useModal();

    const graph = useStoreState((state) => state.graph);
    const graphType = useStoreState((state) => state.type);
    const createNewGraph = useStoreActions((actions) => actions.createNewGraph);
    const addVertex = useStoreActions((actions) => actions.addVertex);
    const addEdge = useStoreActions((actions) => actions.addEdge);
    const runPrim = useStoreActions((actions) => actions.runPrim);
    const runWelshPowell = useStoreActions((actions) => actions.runWelshPowell);
    const runBfs = useStoreActions((actions) => actions.runBfs);
    const runDfs = useStoreActions((actions) => actions.runDfs);
    const runEconomies = useStoreActions((actions) => actions.runEconomies);
    const runAStar = useStoreActions((actions) => actions.runAStar);
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
        'welsh powell': () => {
            runWelshPowell('');
        },
        astar () {
            changeCurrentModal({ title: 'Selecione o Vertice de partida e de chegada', type: 'aStar' })
        },
        economies () {
            changeCurrentModal({ title: 'Selecione o Vertice de partida e a carga maxima do veiculo', type: 'economies' })
        },
    };

    const samples: { [key: string]: () => void }  = {
        bfs () {
            setGraph(getBfsDfsTemplate());
        },
        dfs () {
            setGraph(getBfsDfsTemplate());
        },
        prim () {
            setGraph(getPrimTemplate());
        },
        'welsh powell': () => {
            setGraph(getCityTemplates(graphType));
        },
        astar() {
            setGraph(getCityTemplates(graphType));
        },
        economies() {
            setGraph(getCompanyAndCustomersTemplate());
        },
        'economies book'() {
            setGraph(getBookExample());
        }
    };

    const handleAddVertex: Function = (name: string, label: string, latitude: string, longitude: string): void => {
        const vertex = new Vertex(name, label);
        if (latitude !== undefined && longitude !== undefined) {
            vertex.mapLocation = { latitude: Number(latitude), longitude: Number(longitude) };
        }
        addVertex(vertex);
        toggle();
    }

    const handleAddEdge: Function =
        (vertexOne: string, vertexTwo: string, value: number): void => {
            const link = new Link(vertexOne, vertexTwo, value);
            addEdge(link);
            toggle();
        }

    const handleRunAStar: Function =
      (vertexOne: string, vertexTwo: string): void => {
          try {
              runAStar({ startVertexName: vertexOne, endVertexName: vertexTwo });
              toggle();
          } catch (e) {
              toast.error(`N??o foi possivel aplicar o algoritmo no grafo, ${e}`);
          }
      }

    const handleRunEconomies: Function = (startVertex: Vertex, maxValue: number): void => {
        runEconomies({ startVertex, maxValue });
        toggle();
    }

    const modals: { [key: string]: JSX.Element } = {
        vertex: (<AddVertexModal addVertex={handleAddVertex} />),
        edge: (<AddEdgesModal addEdge={handleAddEdge} />),
        about: (<ProjectInfoModal />),
        aStar: (<AStarModal runAStar={handleRunAStar}/>),
        economies: (<EconomiesModal runEconomies={handleRunEconomies}/>),
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

    const renderAlgorithmsDropdownOptions = (mappedValues: { [key: string]: () => void }, removeEconomiesBook?:boolean): JSX.Element[] => {
        const elements = ['BFS', 'DFS']
        if (graphType === GraphType.DIRECTED) {
            elements.push('Roy');
        } else {
            elements.push('PRIM');
        }
        elements.push('Welsh Powell');
        elements.push('aStar');
        elements.push('Economies');
        !removeEconomiesBook && elements.push('Economies Book');

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
        graphType === 1 ? 'N??o Direcionado' : 'Direcionado';

    return (
        <nav className="navbar navbar-light bg-dark">
            <div className="form-inline">
                {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions,jsx-a11y/anchor-is-valid */}
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
                        () => changeCurrentModal({ title: 'Adicionar V??rtice', type: 'vertex' })
                    } type="button">
                    Adicionar V??rtice
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
                    disabled={graph.adjacencyList.length < 2}
                >
                    {renderAlgorithmsDropdownOptions(algorithms, true)}
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
            <ToastContainer />
            {renderModal()}
        </nav>
    )
}

export default Header;