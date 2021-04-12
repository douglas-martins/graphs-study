export class Vertex {
    private _name: string;

    private _edges: Array<string>;

    constructor(vertexName: string) {
        this._name = vertexName;
        this._edges = new Array<string>();
    }

    public get name(): string {
        return this._name;
    }

    public get edges(): Array<string> {
        return this._edges;
    }

    public set name(newName: string) {
        this._name = newName;
    }

    public set edges(newEdges: Array<string>) {
        this._edges = newEdges;
    }
}