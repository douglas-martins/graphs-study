import { Action, ActionOn } from 'easy-peasy';
import { Graph } from '@components/Graph/graph';
import { GraphType } from '@components/Graph/graphType';
import { Vertex } from '@components/Graph/vertex';
import { Link } from '@components/Graph/link';
import { GraphData } from '@components/Graph/parseGraph';

interface StoreModel {
  graph: Graph;
  type: GraphType;
  createNewGraph: Action<StoreModel, GraphType>;
  forceGraphData: GraphData
  addVertex: Action<StoreModel, Vertex>;
  addEdge: Action<StoreModel, Link>;
  setGraph: Action<StoreModel, Graph>;
  runPrim: Action<StoreModel, string>;
  onChangeGraph: ActionOn<StoreModel, StoreModel>;
}

export default StoreModel;