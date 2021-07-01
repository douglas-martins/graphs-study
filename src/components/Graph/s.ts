import { Vertex } from '@components/Graph/vertex';

export class S {

  private _first: Vertex;

  private _second: Vertex;

  private _value: number;

  constructor(first: Vertex, second: Vertex, value: number) {
    this._first = first;
    this._second = second;
    this._value = value;
  }

  get first(): Vertex {
    return this._first;
  }

  set first(value: Vertex) {
    this._first = value;
  }

  get second(): Vertex {
    return this._second;
  }

  set second(value: Vertex) {
    this._second = value;
  }

  get value(): number {
    return this._value;
  }

  set value(value: number) {
    this._value = value;
  }

}