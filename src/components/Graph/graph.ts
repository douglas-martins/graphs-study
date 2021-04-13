import { Vertex } from '@components/Graph/vertex';
import { Edge } from '@components/Graph/edge';
import { GraphType } from '@components/Graph/graphType';

export class Graph {
    private readonly _adjacencyList: Array<Vertex>;

    private readonly type: GraphType;

    constructor(graphType: GraphType) {
        this._adjacencyList = new Array<Vertex>();
        this.type = graphType;
    }

    public get adjacencyList(): Array<Vertex> {
        return this._adjacencyList;
    }

    public addVertex(newVertex: Vertex): boolean {
        if (this._adjacencyList.find(({ name }) => name === newVertex.name)) {
            return true;
        }

        this._adjacencyList.push(newVertex);
        return true;
    }

    public addEdge(vertexOneName: string, vertexTwoName: string, value: number): boolean {
        const hasVertexOne: Vertex | undefined = this.checkVertexExists(vertexOneName);

        if (hasVertexOne) {
            const edgeOneTWo = new Edge(vertexTwoName, value);
            hasVertexOne.edges.push(edgeOneTWo);
            if (this.type === GraphType.UNDIRECTED) {
                const hasVertexTwo: Vertex | undefined = this.checkVertexExists(vertexTwoName);
                if (hasVertexTwo) {
                    const edgeTwoOne = new Edge(vertexOneName, value);
                    hasVertexTwo.edges.push(edgeTwoOne)
                }
            }
        }

        return true;
    }

    public removeEdge(vertexOneName: string, vertexTwoName: string): boolean {
        const hasVertexOne: Vertex | undefined = this.checkVertexExists(vertexOneName);

        if (hasVertexOne) {
            hasVertexOne.edges = hasVertexOne.edges.filter((vertex) => vertex.name !== vertexTwoName);
            if (this.type == GraphType.UNDIRECTED) {
                const hasVertexTwo: Vertex | undefined = this.checkVertexExists(vertexTwoName);
                if (hasVertexTwo) {
                    hasVertexTwo.edges = hasVertexTwo.edges.filter((vertex) => vertex.name !== vertexOneName);
                }
            }
        }

        return true;
    }

    public dfsTraversalIterative(startVertexName: string): Array<string> {
        const result: Array<string> = new Array<string>();
        const visited: { [key: string]: boolean } = {};
        const stack: Array<string> = new Array<string>();

        stack.push(startVertexName);

        while(stack.length > 0) {
            const name = stack.pop();
            const currentVertex = this._adjacencyList.find((vertex) => vertex.name === name);
            if (currentVertex && !visited[currentVertex.name]) {
                visited[currentVertex.name] = true;
                result.push(currentVertex.name);

                currentVertex.edges.forEach((neighbor) => {
                    if (!visited[neighbor.name]) {
                        stack.push(neighbor.name);
                    }
                })
            }
        }

        return result;
    }

    public bfsTraversalIterative(startVertexName: string): Array<string> {
        const result: Array<string> = new Array<string>();
        const visited: { [key: string]: boolean } = {};
        const queue: Array<string> = new Array<string>();
        queue.push(startVertexName);

        while(queue.length > 0) {
            const name: string | undefined = queue.shift();
            const currentVertex = this._adjacencyList.find((v) => v.name === name);
            if (name && currentVertex && !visited[currentVertex.name]) {
                visited[currentVertex.name] = true;
                result.push(currentVertex.name);

                currentVertex.edges.forEach((neighbor) => {
                    if (!visited[neighbor.name]) {
                        queue.push(neighbor.name);
                    }
                })
            }
        }

        return result;
    }

    private checkVertexExists(vertexName: string): Vertex | undefined {
        const hasVertex: Vertex | undefined = this._adjacencyList.find(({ name }) => name === vertexName);

        if (!hasVertex) {
            console.warn(`[Graph - this.addEdge()] - Graph has no vertex with name ${vertexName}`);
            return undefined;
        }

        return hasVertex;
    }
}
