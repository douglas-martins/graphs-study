import React, { useEffect, useState } from 'react';

import { Graph } from '@components/Graph/graph';
import { GraphType } from '@components/Graph/graphType';
import { Vertex } from '@components/Graph/vertex';

const ForceGraph = (): JSX.Element => {
    const [graphData] = useState(new Graph(GraphType.UNDIRECTED));

    useEffect(() => {
        if (graphData) {
            const vertex1 = new Vertex("test", "OPque diabos é um rotulo?")
            const vertex2 = new Vertex("test 2", "OPque diabos é um rotulo?")
            graphData.addVertex(vertex1);
            graphData.addVertex(vertex2);
            graphData.addEdge("test", "test 2", 2)
            console.log(graphData);
            console.log(graphData.bfsTraversalIterative("test"))
        }
    }, [graphData]);
    

    return <>
        <ul />
    </>
}

export default ForceGraph;