export class Edge {

  private _name: string;

  private _value: number;

  private _highlighted: boolean;

  constructor(name: string, value: number) {
    this._name = name;
    this._value = value;
    this._highlighted = false;
  }

  public get name(): string {
    return this._name;
  }

  public get value(): number {
    return this._value;
  }

  get highlighted(): boolean {
    return this._highlighted;
  }

  public set name(newName: string) {
    this._name = newName;
  }

  public set value(newValue: number) {
    this._value = newValue;
  }

  set highlighted(value: boolean) {
    this._highlighted = value;
  }
}