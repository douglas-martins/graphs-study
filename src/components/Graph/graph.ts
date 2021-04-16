import { Vertex } from '@components/Graph/vertex';
import { Edge } from '@components/Graph/edge';
import { GraphType } from '@components/Graph/graphType';
import { EdgeToCheck } from '@components/Graph/prim/EdgeToCheck';

export class Graph {
    private _adjacencyList: Array<Vertex>;

    private readonly type: GraphType;

    constructor(graphType: GraphType) {
        this._adjacencyList = new Array<Vertex>();
        this.type = graphType;
    }

    public get adjacencyList(): Array<Vertex> {
        return this._adjacencyList;
    }

    public set adjacencyList(newAdjacencyList: Array<Vertex>) {
        this._adjacencyList = newAdjacencyList;
    }

    public addVertex(newVertex: Vertex): boolean {
        if (this._adjacencyList.find(({ name }) => name === newVertex.name)) {
            return true;
        }

        this._adjacencyList.push(newVertex);
        return true;
    }

    public removeVertex(vertexName: string): boolean {
        const hasVertex: Vertex | undefined = this.checkVertexExists(vertexName);

        if (hasVertex) {
            if (this.type === GraphType.UNDIRECTED) {
                hasVertex.edges.forEach(edge => {
                    const parentVertex = this.adjacencyList.find(({ name }) => name === edge.name);
                    if (parentVertex) {
                        parentVertex.edges = parentVertex.edges.filter(parentEdg => parentEdg.name !== vertexName)
                    }
                })
            }
            this.adjacencyList = this.adjacencyList.filter(vertex => vertex.name !== vertexName);
        }

        return false;
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
            if (this.type === GraphType.UNDIRECTED) {
                const hasVertexTwo: Vertex | undefined = this.checkVertexExists(vertexTwoName);
                if (hasVertexTwo) {
                    hasVertexTwo.edges = hasVertexTwo.edges.filter((vertex) => vertex.name !== vertexOneName);
                }
            }
        }

        return true;
    }

    public dfsTraversalIterative(startVertexName: string): Array<Vertex> {
        const result: Array<Vertex> = new Array<Vertex>();
        const visited: { [key: string]: boolean } = {};
        const stack: Array<string> = new Array<string>();

        stack.push(startVertexName);

        while(stack.length > 0) {
            const name = stack.pop();
            const currentVertex = this._adjacencyList.find((vertex) => vertex.name === name);
            if (currentVertex && !visited[currentVertex.name]) {
                visited[currentVertex.name] = true;
                result.push(currentVertex);

                currentVertex.edges.forEach((neighbor) => {
                    if (!visited[neighbor.name]) {
                        stack.push(neighbor.name);
                    }
                })
            }
        }

        return result;
    }

    public bfsTraversalIterative(startVertexName: string): Array<Vertex> {
        const result: Array<Vertex> = new Array<Vertex>();
        const visited: { [key: string]: boolean } = {};
        const queue: Array<string> = new Array<string>();
        queue.push(startVertexName);

        while(queue.length > 0) {
            const name: string | undefined = queue.shift();
            const currentVertex = this._adjacencyList.find((v) => v.name === name);
            if (name && currentVertex && !visited[currentVertex.name]) {
                visited[currentVertex.name] = true;
                result.push(currentVertex);

                currentVertex.edges.forEach((neighbor) => {
                    if (!visited[neighbor.name]) {
                        queue.push(neighbor.name);
                    }
                })
            }
        }

        return result;
    }

    public prim() : Graph {
        if (this.type === GraphType.DIRECTED) {
            throw new Error("Prim algorithms works only for undirected graphs")
        }

        const agm = new Graph(GraphType.UNDIRECTED);
        const visited = Array<Vertex>();
        const visitedNames = Array<string>();
        let edgesToCheck: Array<EdgeToCheck>;
        const startNode = this.adjacencyList[0];
        const allVertexName = this.adjacencyList.map(vertex => vertex.name);

        agm.addVertex(new Vertex(startNode.name, startNode.label));

        visited.push(startNode);
        visitedNames.push(startNode.name);
        edgesToCheck = startNode.edges.map(edge => new EdgeToCheck(startNode.name, edge));

        while (!Graph.visitedAllVertex(visitedNames, allVertexName)) {

            const minValueEdge : EdgeToCheck = edgesToCheck.sort((a, b) => a.edge.value - b.edge.value)[0];
            const minValueVertex : Vertex = this.adjacencyList.filter(({ name }) => name === minValueEdge.edge.name)[0];

            const minValueVertexEdges = minValueVertex.edges.map(edge => new EdgeToCheck(minValueVertex.name, edge));
            edgesToCheck = edgesToCheck.filter(edgeToCheck => edgeToCheck !== minValueEdge).concat(minValueVertexEdges);
            edgesToCheck = edgesToCheck.filter(edgeToCheck => !visitedNames.includes(edgeToCheck.edge.name));


            if (!visitedNames.includes(minValueEdge.edge.name)) {
                agm.addVertex(new Vertex(minValueVertex.name, minValueVertex.label));
                agm.addEdge(minValueEdge.vertexName, minValueVertex.name, minValueEdge.edge.value);

                visitedNames.push(minValueVertex.name);
            }

            visited.push(startNode);
        }

        return agm;
    }

    public linkVertexList(vertexList: Array<Vertex>): void {
        /* eslint-disable no-param-reassign */
        let lastVertex = vertexList.shift();
        if (lastVertex) {
            lastVertex.edges = new Array<Edge>();
            this.addVertex(lastVertex);
            vertexList.forEach(vertex => {
                vertex.edges = new Array<Edge>();
                this.addVertex(vertex);
                this.addEdge(lastVertex?.name || '', vertex.name, 0);
                lastVertex = vertex;
            });
        }
    }

    private static visitedAllVertex(visitedNames: Array<string>, allNames: Array<string>): boolean {
        for (const name of allNames) {
            if (!visitedNames.includes(name)) {
                return false;
            }
        }

        return true;
    }

    public roy() {
        const vertices = this.adjacencyList;

        // Init previous vertices matrix with nulls meaning that there are no
        // previous vertices exist that will give us shortest path.
        const nextVertices = Array(vertices.length).fill(null).map(() => Array(vertices.length).fill(null));

        // Init distances matrix with Infinities meaning there are no paths
        // between vertices exist so far.
        const distances = Array(vertices.length).fill(null).map(() => Array(vertices.length).fill(Infinity));

        // Init distance matrix with the distance we already now (from existing edges).
        // And also init previous vertices from the edges.
        vertices.forEach((startVertex, startIndex) => {
            vertices.forEach((endVertex, endIndex) => {
                if (startVertex === endVertex) {
                    // Distance to the vertex itself is 0.
                    distances[startIndex][endIndex] = 0;
                } else {
                    // Find edge between the start and end vertices.
                    const edge = this.findEdge(startVertex, endVertex);

                    if (edge) {
                        // There is an edge from vertex with startIndex to vertex with endIndex.
                        // Save distance and previous vertex.
                        distances[startIndex][endIndex] = edge.value;
                        nextVertices[startIndex][endIndex] = startVertex;
                    } else {
                        distances[startIndex][endIndex] = Infinity;
                    }
                }
            });
        });

        // Now let's go to the core of the algorithm.
        // Let's all pair of vertices (from start to end ones) and try to check if there
        // is a shorter path exists between them via middle vertex. Middle vertex may also
        // be one of the graph vertices. As you may see now we're going to have three
        // loops over all graph vertices: for start, end and middle vertices.
        vertices.forEach((middleVertex, middleIndex) => {
            // Path starts from startVertex with startIndex.
            vertices.forEach((startVertex, startIndex) => {
                // Path ends to endVertex with endIndex.
                vertices.forEach((endVertex, endIndex) => {
                    // Compare existing distance from startVertex to endVertex, with distance
                    // from startVertex to endVertex but via middleVertex.
                    // Save the shortest distance and previous vertex that allows
                    // us to have this shortest distance.
                    const distViaMiddle = distances[startIndex][middleIndex] + distances[middleIndex][endIndex];

                    if (distances[startIndex][endIndex] > distViaMiddle) {
                        // We've found a shortest pass via middle vertex.
                        distances[startIndex][endIndex] = distViaMiddle;
                        nextVertices[startIndex][endIndex] = middleVertex;
                    }
                });
            });
        });

        // Shortest distance from x to y: distance[x][y].
        // Next vertex after x one in path from x to y: nextVertices[x][y].
        return { distances, nextVertices };
    }

    private checkVertexExists(vertexName: string): Vertex | undefined {
        const hasVertex: Vertex | undefined = this._adjacencyList.find(({ name }) => name === vertexName);

        if (!hasVertex) {
            return undefined;
        }

        return hasVertex;
    }

    // eslint-disable-next-line class-methods-use-this
    private findEdge(startVertex: Vertex, endVertex: Vertex): Edge | undefined {
        const startHasEdge = startVertex.edges.find(({ name }) => name === endVertex.name);
        const endHasEdge = endVertex.edges.find(({ name }) => name === startVertex.name)

        return startHasEdge || endHasEdge;
    }
}
