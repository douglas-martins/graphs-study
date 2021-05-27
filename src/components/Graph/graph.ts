import { orderBy } from 'lodash'
import { Vertex } from '@components/Graph/vertex';
import { Edge } from '@components/Graph/edge';
import { GraphType } from '@components/Graph/graphType';
import { EdgeToCheck } from '@components/Graph/prim/EdgeToCheck';
import { HItem } from '@components/Graph/HItem';

export type HResult = { vertex: Vertex, value: number };

export class Graph {
    private _adjacencyList: Array<Vertex>;

    private readonly type: GraphType;

    private _chromaticNumber: number;

    constructor(graphType: GraphType) {
        this._adjacencyList = new Array<Vertex>();
        this._chromaticNumber = 0;
        this.type = graphType;
    }

    public get adjacencyList(): Array<Vertex> {
        return this._adjacencyList;
    }

    public set adjacencyList(newAdjacencyList: Array<Vertex>) {
        this._adjacencyList = newAdjacencyList;
    }

    public get chromaticNumber(): number {
        return this.chromaticNumber;
    }

    public set chromaticNumber(chromaticNumber: number) {
        this._chromaticNumber = chromaticNumber;
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

    // eslint-disable-next-line class-methods-use-this
    public welshPowell(currentGraph: Graph) : Graph {
        const welshPowellGraph = new Graph(currentGraph.type);
        let vertexCopy = orderBy(
          currentGraph.adjacencyList,
          (vertex) => vertex.edges.length, 'desc'
        );
        const coloredVertex = new Array<Vertex>();
        let color = 1;
        let currentVertex = vertexCopy.shift();

        if (currentVertex) {
            currentVertex.color = color
            coloredVertex.push(currentVertex);
        }

        while(vertexCopy.length > 0) {
            const vertex: Vertex | undefined = vertexCopy.shift();

            if (vertex && currentVertex) {
                vertex.color = color;
                coloredVertex.push(vertex);
                const vertexNotConnected = currentVertex.edges
                  .filter(({ name }) => name !== vertex.name)
                  .map(({ name }) => currentGraph.adjacencyList.find(({ name: vertexName }) => vertexName === name))
                  .filter(Boolean);

                if (Array.isArray(vertexNotConnected) && vertexNotConnected.length > 0) {
                    // Colored if not connect with currentVertex
                    for (const addVertex of vertexNotConnected) {
                        if (addVertex) {
                            const hasVertex = coloredVertex.find(({ name }) => name === addVertex.name);
                            if (!hasVertex) {
                                addVertex.color = color;
                                coloredVertex.push(addVertex);
                                vertexCopy = vertexCopy.filter((v) => v.name !== addVertex.name);
                            }
                        }
                    }
                }
            }
            color += 1;
            if (vertex) {
                currentVertex = vertex;
            }
        }

        welshPowellGraph.adjacencyList = coloredVertex;
        welshPowellGraph.chromaticNumber = color - 1;
        return welshPowellGraph;
    }

    public aStar(startVertex: Vertex, endVertex: Vertex): Graph {
        const result = new Array<Vertex>();
        let currentVertex = startVertex;
        const hList = this.calculateH(endVertex);
        const visitedVertexNames = new Array<string>();
        result.push(startVertex);

        while (currentVertex.name !== endVertex.name) {
            visitedVertexNames.push(currentVertex.name);


            const neighbors = this.getVertexNeighbors(currentVertex, visitedVertexNames);

            if (neighbors.length === 0) throw new Error(`${currentVertex.name} hasn't neighbors`);
            const bestNeighbor = Graph.findBestNeighbor(currentVertex, neighbors, hList);

            result.push(bestNeighbor);
            currentVertex = bestNeighbor;
        }

        const graph = this;

        for (let i = 0; i < result.length - 1; i++) {
            const source = result[i];
            const target = result[i + 1];

            const link = source.edges.find(edge => edge.name === target.name);
            if (link) link.highlighted = true;
        }

        return graph;

    }

    private calculateH(startVertex: Vertex): Array<HItem> {
        const hList = new Array<HItem>();

        this.adjacencyList.forEach((vertex) => {
            if (vertex.name === startVertex.name) {
                hList.push(new HItem(startVertex.name, 0));
            } else {
                const distance = Graph.calcDistance(
                  startVertex.mapLocation.latitude,
                  startVertex.mapLocation.longitude,
                  vertex.mapLocation.latitude,
                  vertex.mapLocation.longitude
                );
                hList.push(new HItem(vertex.name, distance));
            }
        })

        return hList;
    }

    private static calcDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
        const distanceLat = Graph.toRad(lat2 - lat1);
        const distanceLong = Graph.toRad(lon2 - lon1);
        const lat1Rad = Graph.toRad(lat1);
        const lat2Rad = Graph.toRad(lat2);

        const a = Math.sin(distanceLat / 2) * Math.sin(distanceLat / 2)
                    + Math.sin(distanceLong/2) * Math.sin(distanceLong/2)
                    * Math.cos(lat1Rad) * Math.cos(lat2Rad);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return 6371 * c;
    }


    private static toRad(value: number): number {
        return value * Math.PI / 180;
    }

    private getVertexNeighbors(startVertex: Vertex, visitedVertexNames : Array<string>): Array<Vertex> {
        const { edges } = startVertex;
        const neighbors =  new Array<Vertex>();
        edges.forEach(edge => {
            const item = this.adjacencyList.find(vertex => vertex.name === edge.name);
            if (item !== undefined && !visitedVertexNames.includes(item.name)) {
                neighbors.push(item);
            }
        });
        return neighbors;
    }

    private static findBestNeighbor(startVertex: Vertex, neighbors: Array<Vertex>, hList: Array<HItem>): Vertex {
        const result = new Array<HResult>();
        neighbors.forEach(neighbor => {
            const edge = startVertex.edges.find(item => item.name === neighbor.name);
            if (edge != undefined) { //eslint-disable-line
                const hValue = hList.find(item => item.vertexName === neighbor.name);
                if (hValue != undefined) { //eslint-disable-line
                    const f = edge.value + hValue.value;
                    result.push({ vertex: neighbor, value: f })
                }
            } else {
                throw new Error("This node not have this neighbor");
            }
        });

        result.sort((a, b) => a.value - b.value);

        return result[0].vertex;
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
}
