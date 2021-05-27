export class HItem {

  private _vertexName: string;

  private _value: number;


  constructor(vertexName: string, value: number) {
    this._vertexName = vertexName;
    this._value = value;
  }

  get vertexName(): string {
    return this._vertexName;
  }

  set vertexName(value: string) {
    this._vertexName = value;
  }

  get value(): number {
    return this._value;
  }

  set value(value: number) {
    this._value = value;
  }

}