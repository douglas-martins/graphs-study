import { Edge } from '@components/Graph/edge';

export class EdgeToCheck {

  private _vertexName : string;

  private _edge : Edge;

  constructor(vertexName: string, edge: Edge) {
    this._vertexName = vertexName;
    this._edge = edge;
  }

  get vertexName(): string {
    return this._vertexName;
  }

  set vertexName(value: string) {
    this._vertexName = value;
  }

  get edge(): Edge {
    return this._edge;
  }

  set edge(value: Edge) {
    this._edge = value;
  }
}