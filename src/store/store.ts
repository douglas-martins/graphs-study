import { action, actionOn, createStore } from 'easy-peasy';
import { Graph } from '@components/Graph/graph';
import { GraphType } from '@components/Graph/graphType';
import { GraphDataLink, GraphDataNode, parseGraph } from '@components/Graph/parseGraph';
import StoreModel from './storeModel';

const store = createStore<StoreModel>({
  type: GraphType.UNDIRECTED,

  graph: new Graph(GraphType.UNDIRECTED),

  forceGraphData: {
    links: new Array<GraphDataLink>(),
    nodes: new Array<GraphDataNode>(),
  },

  createNewGraph: action((state, payload) => {
    /* eslint-disable no-param-reassign */
    state.type = payload;
    state.graph = new Graph(payload);
  }),

  addVertex: action((state, payload) => {
    state.graph.addVertex(payload);
  }),

  addEdge: action((state, payload) => {
    state.graph.addEdge(payload.vertexOneName, payload.vertexTwoName, payload.value);
  }),

  deleteEdge: action((state, payload) => {
    state.graph.removeEdge(payload.vertexOneName, payload.vertexTwoName);
  }),

  deleteVertex: action((state, payload) => {
    state.graph.removeVertex(payload);
  }),

  setGraph: action((state, payload) => {
    state.graph = payload;
  }),

  runPrim: action((state, payload) => {
    const resultTree = state.graph.prim();
    state.graph = resultTree;
    state.forceGraphData = parseGraph(resultTree);
  }),

  runBfs: action((state, payload) => {
    const resultTree = state.graph.bfsTraversalIterative(state.graph.adjacencyList[0].name);
    state.graph = resultTree;
    state.forceGraphData = parseGraph(resultTree);
  }),

  runWelshPowell: action((state, payload) => {
    const resultGraph = state.graph.welshPowell(state.graph as Graph);
    state.graph = resultGraph;
    state.forceGraphData = parseGraph(resultGraph);
  }),

  runDfs: action((state, payload) => {
    const resultTree = state.graph.dfsTraversalIterative(state.graph.adjacencyList[0].name);
    state.graph = resultTree;
    state.forceGraphData = parseGraph(resultTree);
  }),

  runAStar: action((state, payload) => {
    const startVertex = state.graph.adjacencyList.find(item => item.name === payload.startVertexName);
    const endVertex = state.graph.adjacencyList.find(item => item.name === payload.endVertexName);
    if (startVertex !== undefined && endVertex !== undefined) {
      const resultGraph = state.graph.aStar(startVertex, endVertex);
      state.graph = resultGraph;
      state.forceGraphData = parseGraph(resultGraph);
    }
  }),

  runEconomies: action((state, payload) => {
    const startVertex = state.graph.adjacencyList.find(item => item.name === payload);

    if (startVertex !== undefined ) {
      const resultGraph = state.graph.economies(startVertex);
      state.graph = resultGraph;
      state.forceGraphData = parseGraph(resultGraph);
    }
  }),

  onChangeGraph: actionOn(
    actions => [actions.addEdge, actions.addVertex, actions.createNewGraph, actions.setGraph, actions.deleteEdge, actions.deleteVertex],
    (state, payload) => {
      state.forceGraphData = parseGraph(state.graph);
    }
  )


});

export default store;