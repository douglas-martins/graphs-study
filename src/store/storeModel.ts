import { Action, ActionOn } from 'easy-peasy';
import { Graph } from '@components/Graph/graph';
import { GraphType } from '@components/Graph/graphType';
import { Vertex } from '@components/Graph/vertex';
import { Link } from '@components/Graph/link';
import { GraphData } from '@components/Graph/parseGraph';

export type AStarPayload = {startVertexName: string, endVertexName: string};
export type EconomiesPayload = {startVertex: Vertex, maxValue: number};

interface StoreModel {
  graph: Graph;
  type: GraphType;
  createNewGraph: Action<StoreModel, GraphType>;
  forceGraphData: GraphData
  addVertex: Action<StoreModel, Vertex>;
  deleteVertex: Action<StoreModel, string>;
  addEdge: Action<StoreModel, Link>;
  deleteEdge: Action<StoreModel, Link>;
  setGraph: Action<StoreModel, Graph>;
  runPrim: Action<StoreModel, string>;
  runWelshPowell: Action<StoreModel, string>;
  runBfs: Action<StoreModel, string>;
  runDfs: Action<StoreModel, string>;
  runAStar: Action<StoreModel, AStarPayload>;
  runEconomies: Action<StoreModel, EconomiesPayload>;
  onChangeGraph: ActionOn<StoreModel, StoreModel>;
}

export default StoreModel;