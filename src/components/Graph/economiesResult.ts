import { Graph } from '@components/Graph/graph';

export type RoadMapValue = { roadMapOrder: string, value: number };

export class EconomiesResult {

  private readonly _graph: Graph;

  private readonly _roadMapValues: Array<RoadMapValue>;

  constructor(graph: Graph, roadMapValues: Array<RoadMapValue>) {
    this._graph = graph;
    this._roadMapValues = roadMapValues;
  }

  get graph(): Graph {
    return this._graph;
  }

  get roadMapValues(): Array<RoadMapValue> {
    return this._roadMapValues;
  }
}