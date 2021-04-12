import { Vertex } from '@components/Graph/vertex';

export class Graph {
    private adjacencyList: Array<Vertex>;

    constructor() {
        this.adjacencyList = new Array<Vertex>();
    }

    public addVertex(newVertex: Vertex): boolean {
        if (this.adjacencyList.find(({ name }) => name === newVertex.name)) {
            return true;
        }

        this.adjacencyList.push(newVertex);
        return true;
    }

    public addEdge(vertexOne: string, vertexTwo: string): boolean {
        const hasVertexOne: Vertex | undefined = this.checkVertexExists(vertexOne);

        if (hasVertexOne) {
            hasVertexOne.edges.push(vertexTwo);
            const hasVertexTwo: Vertex | undefined = this.checkVertexExists(vertexTwo);
            if (hasVertexTwo) {
                hasVertexTwo.edges.push(vertexOne)
            }
        }

        return true;
    }

    public removeEdge(vertexOne: string, vertexTwo: string): boolean {
        const hasVertexOne: Vertex | undefined = this.checkVertexExists(vertexOne);

        if (hasVertexOne) {
            hasVertexOne.edges = hasVertexOne.edges.filter((vertex) => vertex !== vertexTwo);
            const hasVertexTwo: Vertex | undefined = this.checkVertexExists(vertexTwo);
            if (hasVertexTwo) {
                hasVertexTwo.edges = hasVertexTwo.edges.filter((vertex) => vertex !== vertexOne);
            }
        }

        return true;
    }

    public dfsTraversalRecursive(startVertexName: string): Array<string> {
        const startVertex = this.adjacencyList.find((vertex) => vertex.name === startVertexName);

        if (startVertex) {
            return this.dfs(startVertex);
        }

        console.warn(`[Graph - this.dfsTraversalRecursive()] - Can not find vertex with name ${startVertexName}`);
        return new Array<string>();
    }

    public dfsTraversalIterative(startVertexName: string): Array<string> {
        const result: Array<string> = new Array<string>();
        const visited: { [key: string]: boolean } = {};
        const stack: Array<string> = new Array<string>();

        stack.push(startVertexName);

        while(stack.length > 0) {
            const name = stack.pop();
            const currentVertex = this.adjacencyList.find((vertex) => vertex.name === name);
            if (currentVertex && !visited[currentVertex.name]) {
                visited[currentVertex.name] = true;
                result.push(currentVertex.name);

                currentVertex.edges.forEach((neighbor) => {
                    if (!visited[neighbor]) {
                        stack.push(neighbor);
                    }
                })
            }
        }

        return result;
    }

    public vfsTraversalIterative(startVertexName: string): Array<string> {
        const result: Array<string> = new Array<string>();
        const visited: { [key: string]: boolean } = {};
        const queue: Array<string> = new Array<string>();
        queue.push(startVertexName);

        while(queue.length > 0) {
            const name: string | undefined = queue.shift();
            const currentVertex = this.adjacencyList.find((v) => v.name === name);
            if (name && currentVertex && !visited[currentVertex.name]) {
                visited[currentVertex.name] = true;
                result.push(currentVertex.name);

                currentVertex.edges.forEach((neighbor) => {
                    if (!visited[neighbor]) {
                        queue.push(neighbor);
                    }
                })
            }
        }

        return result;
    }

    private checkVertexExists(vertexName: string): Vertex | undefined {
        const hasVertex: Vertex | undefined = this.adjacencyList.find(({ name }) => name === vertexName);

        if (!hasVertex) {
            console.warn(`[Graph - this.addEdge()] - Graph has no vertex with name ${vertexName}`);
            return undefined;
        }

        return hasVertex;
    }

    private dfs(vertex: Vertex): Array<string> {
        const result: string[] = [];
        const visited: { [key: string]: boolean } = {
            [`${vertex.name}`]: true,
        };

        result.push(vertex.name);
        const hasVertex: Vertex | undefined = this.adjacencyList.find((v) => v.name === vertex.name);
        if (hasVertex) {
            hasVertex.edges.forEach((neighbor) => {
                if (!visited[neighbor]) {
                    const hasNeighbor: Vertex | undefined = this.adjacencyList.find((v) => v.name === neighbor);
                    if (hasNeighbor) {
                        this.dfs(hasNeighbor);
                    }
                }
            })
        }
        return result;
    }
}
