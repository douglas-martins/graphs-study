import { Edge } from '@components/Graph/edge';

export type Location = { latitude: number, longitude: number }

export class Vertex {

    private _name: string;

    private _label: string;

    private _edges: Array<Edge>;

    private _mapLocation: Location;

    private _color: number;

    constructor(vertexName: string, vertexLabel: string, mapLocation: Location | null = null) {
        this._name = vertexName;
        this._label = vertexLabel;
        this._edges = new Array<Edge>();
        this._mapLocation = mapLocation || { latitude: 0, longitude: 0 };
        this._color = -1;
    }

    public get name(): string {
        return this._name;
    }

    public get edges(): Array<Edge> {
        return this._edges;
    }

    public get label(): string {
        return this._label;
    }

    public set name(newName: string) {
        this._name = newName;
    }

    public set edges(newEdges: Array<Edge>) {
        this._edges = newEdges;
    }

    public set label(value: string) {
        this._label = value;
    }

    public set color(color: number) {
        this._color = color;
    }

    public get color(): number {
        return this._color;
    }


    get mapLocation(): Location {
        return this._mapLocation;
    }
}