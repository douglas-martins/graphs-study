export class Edge {

  private _name: string;

  private _value: number;

  constructor(name: string, value: number) {
    this._name = name;
    this._value = value;
  }

  public get name(): string {
    return this._name;
  }

  public get value(): number {
    return this._value;
  }

  public set name(newName: string) {
    this._name = newName;
  }

  public set value(newValue: number) {
    this._value = newValue;
  }
}