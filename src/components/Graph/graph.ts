import { find, orderBy, pull, reverse } from 'lodash';
import { Vertex } from '@components/Graph/vertex';
import { Edge } from '@components/Graph/edge';
import { GraphType } from '@components/Graph/graphType';
import { EdgeToCheck } from '@components/Graph/prim/EdgeToCheck';
import { HItem } from '@components/Graph/HItem';
import { S } from '@components/Graph/s';
import { Extremity } from '@components/Graph/extremity';
import randomcolor from "randomcolor"
import { EconomiesResult, RoadMapValue } from '@components/Graph/economiesResult';

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
        let color = this.getRandomColor([]);
        const colors = [color];
        const coloredVertex = new Array<Vertex>();
        let currentVertex: Vertex = vertexCopy.shift() as Vertex;

        if (currentVertex) {
            currentVertex.color = color
            coloredVertex.push(currentVertex);
        }

        while(vertexCopy.length > 0) {
            const vertex: Vertex | undefined = vertexCopy.shift() as Vertex;

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
            color = this.getRandomColor(colors);
            if (vertex) {
                currentVertex = vertex;
            }
        }

        welshPowellGraph.adjacencyList = coloredVertex;
        welshPowellGraph.chromaticNumber = colors.length - 1;
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

        graph.adjacencyList.forEach(vertex => {
            vertex.edges.forEach(edge => {
                /* eslint-disable no-param-reassign */
                edge.highlighted = false;
            })
        })

        for (let i = 0; i < result.length - 1; i++) {
            const source = result[i];
            const target = result[i + 1];

            const link = source.edges.find(edge => edge.name === target.name);
            if (link) link.highlighted = true;
        }

        return graph;

    }

    private calculateH(endVertex: Vertex): Array<HItem> {
        const hList = new Array<HItem>();

        this.adjacencyList.forEach((vertex) => {
            if (vertex.name === endVertex.name) {
                hList.push(new HItem(endVertex.name, 0));
            } else {
                const distance = Graph.calcDistance(
                  endVertex.mapLocation.latitude,
                  endVertex.mapLocation.longitude,
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

    /**
     * Generate random color string value for the dynamic number of bots
     * @returns: string
     */
    // eslint-disable-next-line class-methods-use-this
    private generateRandomColorString() : string {
        return Math.floor(Math.random() * 16777215).toString(16);
    }

    /**
     * Generate a random color that is not in the colors array yet
     * @param {string[]} colors
     */
    private getRandomColor = (colors: Array<String>) => {
        let color = `#${this.generateRandomColorString()}`;
        while (find(colors, color)) {
            color = `#${this.generateRandomColorString()}`;
        }
        colors.push(color);
        return color;
    };



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

    public economies(startVertex: Vertex, maximumVehicleLoad: number): EconomiesResult {
        const neighbors = this.getVertexNeighbors(startVertex, []);

        let economyList = Graph.calcEconomyList(neighbors, startVertex);
        economyList = economyList.sort(Graph.moreEconomyFirst);

        const roadMaps = new Array<Array<Vertex>>();
        for (const s of economyList) {
            // Valores que não são economias
            if (s.value < 0) {
                continue;
            }

            // Verifica se o par não esta já no mesmo roteiro
            if (roadMaps.some(item => item.includes(s.iVertex) && item.includes(s.jVertex))) {
                continue;
            }

            // Caso os nós i e j não estejam em nenhum roteiro, criar um para eles
            if (!roadMaps.some(item => item.includes(s.iVertex) || item.includes(s.jVertex))) {
                roadMaps.push([s.iVertex, s.jVertex]);
                continue;
            }

            const iRoad = roadMaps.find(item => item.includes(s.iVertex));
            const jRoad = roadMaps.find(item => item.includes(s.jVertex));

            // Apenas um dos pontos é a extremidade de um roteiro já existente, adiciona o outro ponto a extremidade
            if (iRoad !== undefined && jRoad === undefined) {
                if (Graph.willReachTheLimit(s.iVertex, s.jVertex, iRoad, startVertex, maximumVehicleLoad)) continue;
                Graph.addOnExtremity(iRoad, s.iVertex, s.jVertex);
                continue;
            }

            if (jRoad !== undefined && iRoad === undefined) {
                if (Graph.willReachTheLimit(s.jVertex, s.iVertex, jRoad, startVertex, maximumVehicleLoad)) continue;
                Graph.addOnExtremity(jRoad, s.jVertex, s.iVertex);
                continue;
            }


            // Caso i e j percencem a roteiros já existentes e ambos são extremidades dele, fundir os dois roteiros
            if (iRoad !== undefined && jRoad !== undefined) {
                const extremityI = Graph.isExtremity(iRoad, s.iVertex);
                const extremityJ = Graph.isExtremity(jRoad, s.jVertex);

                if (extremityI !== Extremity.NOT && extremityJ !== Extremity.NOT) {
                    // verifica se o merge dos dois não ultrapassa o limite
                    const iRoadSize = Graph.calculateRoadMapSize(iRoad, startVertex);
                    const jRoadSize = Graph.calculateRoadMapSize(jRoad, startVertex);

                    if ((iRoadSize + jRoadSize) > maximumVehicleLoad) continue;

                    if (extremityI === Extremity.START && extremityJ === Extremity.END) {
                        jRoad.concat(iRoad);
                        pull(roadMaps, iRoad);
                        continue;
                    }

                    if (extremityI === Extremity.END && extremityJ === Extremity.START) {
                        iRoad.concat(jRoad);
                        pull(roadMaps, jRoad);
                        continue;
                    }

                    if (extremityI === Extremity.START && extremityJ === Extremity.START) {
                        reverse(iRoad);
                        iRoad.concat(jRoad);
                        pull(roadMaps, jRoad);
                        continue;
                    }

                    if (extremityI === Extremity.END && extremityJ === Extremity.END) {
                        reverse(jRoad);
                        iRoad.concat(jRoad);
                        pull(roadMaps, jRoad);
                    }
                }
            }
        }

        // Caso algum nó fique de fora criar uma rota para ele
        for (const neighbor of neighbors) {
            const hasRoadMap = roadMaps.some(roadMap => roadMap.includes(neighbor));
            if (!hasRoadMap) {
                roadMaps.push([neighbor])
            }
        }

        // Ligando as pontas de volta em k
        for (const roadMap of roadMaps) {
            roadMap.unshift(startVertex);
            roadMap.push(startVertex);
        }

        const graph = this;

        Graph.clearHighlight(graph);

        // Destaca o caminho
        const roadMapValues = new Array<RoadMapValue>();
        const colors = randomcolor({ count: roadMaps.length, luminosity: 'dark' })
        for (let roadIndex = 0; roadIndex < roadMaps.length; roadIndex++) {
            const roadMap = roadMaps[roadIndex];

            roadMapValues.push({
                roadMapOrder: roadMap.map(item => item.name).join(" - "),
                value: Graph.calculateRoadMapSize(roadMap)
            });

            for (let i = 0; i < roadMap.length - 1; i++) {
                const current = roadMap[i];
                const next = roadMap[i + 1]
                const link = current.edges.find(ed => ed.name === next.name);
                if (link) {
                    link.highlighted = true;
                    link.highlightedColor = colors[roadIndex];
                }
            }
        }

        return new EconomiesResult(graph, roadMapValues);
    }

    private static calcEconomyList(neighbors: Array<Vertex>, startVertex: Vertex): Array<S> {
        const economyList = new Array<S>();

        for (let i = 0; i < neighbors.length; i++) {
            const iVertex = neighbors[i];
            for (let j = i; j < neighbors.length; j++) {
                const jVertex = neighbors[j];

                if (iVertex === jVertex) continue;

                const iToKLink = iVertex.edges.find(edge => edge.name === startVertex.name);
                const jToKLink = jVertex.edges.find(edge => edge.name === startVertex.name);
                const iToJLink = iVertex.edges.find(edge => edge.name === jVertex.name);

                // avoid Typescript error
                if (iToKLink === undefined || jToKLink === undefined || iToJLink === undefined) {
                    throw new Error("Undefined values")
                }

                const sValue = iToKLink.value + jToKLink.value - iToJLink.value;
                const s = new S(iVertex, jVertex, sValue);
                economyList.push(s);
            }
        }

        return economyList;
    }

    private static moreEconomyFirst(a: S, b: S): number {
        return  b.value - a.value;
    }

    private static isExtremity(list: Array<Vertex>, item: Vertex): Extremity {
        if (list[0] === item) return Extremity.START;
        if (list[list.length - 1] === item) return Extremity.END;
        return Extremity.NOT
    }

    private static clearHighlight(graph: Graph) {
        graph.adjacencyList.forEach(vertex => {
            vertex.edges.forEach(edge => {
                edge.highlighted = false;
            })
        })
    }

    private static calculateRoadMapSize(roadMap: Array<Vertex>, startVertex?: Vertex): number {
        let value = 0;
        for (let i = 0; i < roadMap.length - 1; i++) {
            const current = roadMap[i];
            const next = roadMap[i + 1];
            const link = current.edges.find(ed => ed.name === next.name);
            if (link) value += link.value;
        }

        if (startVertex) {
            const first = roadMap[0];
            const last = roadMap[roadMap.length - 1];
            const firstToStart = first.edges.find(ed => ed.name === startVertex.name);
            const lastToStart = last.edges.find(ed => ed.name === startVertex.name);
            if (firstToStart && lastToStart) {
                value += firstToStart.value + lastToStart.value;
            }
        }

        return value;
    }

    private static willReachTheLimit(
      initialVertex: Vertex,
      endVertex: Vertex,
      roadMap: Array<Vertex>,
      startVertex: Vertex,
      maximumVehicleLoad: number
    ) {
        const roadSize = Graph.calculateRoadMapSize(roadMap, startVertex);
        const linkIJ = initialVertex.edges.find(ed => ed.name === endVertex.name);
        return (linkIJ && ((roadSize + linkIJ.value) > maximumVehicleLoad));
    }

    private static addOnExtremity(roadMap: Array<Vertex>, compareVertex: Vertex, toAddVertex: Vertex) {
        if (roadMap[0] === compareVertex) {
            roadMap.unshift(toAddVertex);
        } else if (roadMap[roadMap.length - 1] === compareVertex) {
            roadMap.push(toAddVertex);
        }
    }

}
