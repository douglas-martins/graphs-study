export class Link {

  private _vertexOneName: string;

  private _vertexTwoName: string;

  private _value: number;

  constructor(vertexOneName: string, vertexTowName: string, value: number) {
    this._vertexOneName = vertexOneName;
    this._vertexTwoName = vertexTowName;
    this._value = value;
  }

  get vertexOneName(): string {
    return this._vertexOneName;
  }

  set vertexOneName(value: string) {
    this._vertexOneName = value;
  }

  get vertexTwoName(): string {
    return this._vertexTwoName;
  }

  set vertexTwoName(value: string) {
    this._vertexTwoName = value;
  }

  get value(): number {
    return this._value;
  }

  set value(value: number) {
    this._value = value;
  }
}