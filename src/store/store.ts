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

  onChangeGraph: actionOn(
    actions => [actions.addEdge, actions.addVertex, actions.createNewGraph, actions.setGraph, actions.deleteEdge, actions.deleteVertex],
    (state, payload) => {
      state.forceGraphData = parseGraph(state.graph);
    }
  )


});

export default store;