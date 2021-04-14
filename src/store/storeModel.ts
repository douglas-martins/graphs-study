import { Action } from 'easy-peasy';
import { Graph } from '@components/Graph/graph';
import { GraphType } from '@components/Graph/graphType';

interface StoreModel {
  graph: Graph;
  type: GraphType;
  createNewGraph: Action<StoreModel, GraphType>;
}

export default StoreModel;