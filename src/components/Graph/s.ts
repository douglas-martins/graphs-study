import { Vertex } from '@components/Graph/vertex';

export class S {

  private _iVertex: Vertex;

  private _jVertex: Vertex;

  private _value: number;


  constructor(iVertex: Vertex, jVertex: Vertex, value: number) {
    this._iVertex = iVertex;
    this._jVertex = jVertex;
    this._value = value;
  }

  get iVertex(): Vertex {
    return this._iVertex;
  }

  set iVertex(value: Vertex) {
    this._iVertex = value;
  }

  get jVertex(): Vertex {
    return this._jVertex;
  }

  set jVertex(value: Vertex) {
    this._jVertex = value;
  }

  get value(): number {
    return this._value;
  }

  set value(value: number) {
    this._value = value;
  }
}
