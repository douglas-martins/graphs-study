import { action, actionOn, createStore } from 'easy-peasy';
import { Graph } from '@components/Graph/graph';
import { GraphType } from '@components/Graph/graphType';
import { GraphDataLink, GraphDataNode, parseGraph } from '@components/Graph/parseGraph';
import { Vertex } from '@components/Graph/vertex';
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

  setGraph: action((state, payload) => {
    state.graph = payload;
  }),

  runPrim: action((state, payload) => {
    state.forceGraphData = parseGraph(state.graph.prim());
  }),

  onChangeGraph: actionOn(
    actions => [actions.addEdge, actions.addVertex, actions.createNewGraph, actions.setGraph],
    (state, payload) => {
      state.forceGraphData = parseGraph(state.graph);
    }
  )


});

export default store;