import { Edge } from '@components/Graph/edge';

export class Vertex {

    private _name: string;

    private _label: string;

    private _edges: Array<Edge>;

    constructor(vertexName: string, vertexLabel: string) {
        this._name = vertexName;
        this._label = vertexLabel;
        this._edges = new Array<Edge>();
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
}