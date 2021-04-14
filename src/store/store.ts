import { action, createStore } from 'easy-peasy';
import StoreModel from './storeModel';
import { Graph } from '@components/Graph/graph';
import { GraphType } from '@components/Graph/graphType';

const store = createStore<StoreModel>({
  type: GraphType.UNDIRECTED,

  graph: new Graph(GraphType.UNDIRECTED),

  createNewGraph: action((state, payload) => {
    state.type = payload;
    state.graph = new Graph(payload);
  }),

});

export default store;