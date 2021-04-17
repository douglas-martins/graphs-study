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

    public dfsTraversalIterative(startVertexName: string): Graph {
        const resultTree = new Graph(GraphType.UNDIRECTED);
        const result: Array<Vertex> = new Array<Vertex>();
        const visited: { [key: string]: boolean } = {};
        const stack: Array<string> = new Array<string>();

        stack.push(startVertexName);
        let lastLength = stack.length;

        /* eslint-disable */
        while(stack.length > 0) {
            const name = stack.pop();
            const currentVertex = this._adjacencyList.find((vertex) => vertex.name === name);
            if (currentVertex && !visited[currentVertex.name]) {
                visited[currentVertex.name] = true;
                console.log(currentVertex.name, ' ');
                result.push(currentVertex);

                currentVertex.edges.forEach((neighbor) => {
                    if (!visited[neighbor.name]) {

                        if  (
                          stack.length === lastLength
                          || (stack.length > lastLength
                          && (result.length != stack.length || stack.length === 1))
                        ) {
                            resultTree.addVertex(new Vertex(currentVertex.name, currentVertex.label));
                            resultTree.addVertex(new Vertex(neighbor.name, neighbor.name));
                            resultTree.addEdge(currentVertex.name, neighbor.name, 0);
                        }

                        lastLength = stack.length;
                        stack.push(neighbor.name);
                    } else {

                    }
                })
            }
        }
        /* eslint-enable */

        return resultTree;
    }

    public bfsTraversalIterative(startVertexName: string): Graph {
        const resultTree = new Graph(GraphType.UNDIRECTED);
        const visited: { [key: string]: boolean } = {};
        const queue: Array<string> = new Array<string>();

        queue.push(startVertexName);
        let lastLength = queue.length;

        /* eslint-disable */
        while(queue.length > 0) {
            const name: string | undefined = queue.shift();
            const currentVertex = this._adjacencyList.find((v) => v.name === name);
            if (name && currentVertex && !visited[currentVertex.name]) {
                visited[currentVertex.name] = true;

                currentVertex.edges.forEach((neighbor) => {
                    if (!visited[neighbor.name]) {

                        if  (queue.length === 0 || (queue.length !== lastLength && lastLength < queue.length)) {
                            resultTree.addVertex(new Vertex(currentVertex.name, currentVertex.label));
                            resultTree.addVertex(new Vertex(neighbor.name, neighbor.name));
                            resultTree.addEdge(currentVertex.name, neighbor.name, 0);
                        }

                        lastLength = queue.length;
                        queue.push(neighbor.name);
                    }
                })
            }
        }
        /* eslint-enable */

        return resultTree;
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

    private checkVertexExists(vertexName: string): Vertex | undefined {
        const hasVertex: Vertex | undefined = this._adjacencyList.find(({ name }) => name === vertexName);

        if (!hasVertex) {
            return undefined;
        }

        return hasVertex;
    }

    private getTranspose(): Graph {
        const transposeGraph = new Graph(this.type);

        this.adjacencyList.forEach(({ name, label }) => {
            transposeGraph.addVertex(new Vertex(name, label));
        });


        for (let i = 0; i < this.adjacencyList.length; i++) {
            const currentVertex: Vertex = this.adjacencyList[i];
            this.adjacencyList[i].edges.forEach((edge) => {
               const nextVertexEdge = transposeGraph.adjacencyList.find(({ name }) => name === edge.name);
               if (nextVertexEdge) {
                   transposeGraph.addEdge(nextVertexEdge.name, currentVertex.name, edge.value);
               }
            });
        }
        return transposeGraph;
    }

    // eslint-disable-next-line class-methods-use-this
    private findEdge(startVertex: Vertex, endVertex: Vertex): Edge | undefined {
        const startHasEdge = startVertex.edges.find(({ name }) => name === endVertex.name);
        const endHasEdge = endVertex.edges.find(({ name }) => name === startVertex.name)

        return startHasEdge || endHasEdge;
    }
}
