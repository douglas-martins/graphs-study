import { Graph } from '@components/Graph/graph';
import { GraphType } from '@components/Graph/graphType';
import { Vertex } from '@components/Graph/vertex';

export function getPrimTemplate(): Graph {
  const primGraph = new Graph(GraphType.UNDIRECTED);
  primGraph.addVertex(new Vertex("A", "A"));
  primGraph.addVertex(new Vertex("B", "B"));
  primGraph.addVertex(new Vertex("C", "C"));
  primGraph.addVertex(new Vertex("D", "D"));
  primGraph.addVertex(new Vertex("E", "E"));
  primGraph.addVertex(new Vertex("F", "F"));
  primGraph.addVertex(new Vertex("G", "G"));

  primGraph.addEdge("A", "C", 3);
  primGraph.addEdge("A", "D", 3);
  primGraph.addEdge("A", "B", 2);

  primGraph.addEdge("B", "E", 3);
  primGraph.addEdge("B", "C", 4);

  primGraph.addEdge("D", "C", 5);
  primGraph.addEdge("D", "F", 7);

  primGraph.addEdge("F", "G", 9);
  primGraph.addEdge("F", "C", 6);
  primGraph.addEdge("F", "E", 8);

  primGraph.addEdge("E", "C", 1);

  return primGraph;
}

export function getBfsTemplate(): Graph  {
  const bfsGraph = new Graph(GraphType.UNDIRECTED);

  bfsGraph.addVertex(new Vertex("1", "1"));
  bfsGraph.addVertex(new Vertex("2", "2"));
  bfsGraph.addVertex(new Vertex("3", "3"));
  bfsGraph.addVertex(new Vertex("4", "4"));
  bfsGraph.addVertex(new Vertex("5", "5"));
  bfsGraph.addVertex(new Vertex("6", "6"));
  bfsGraph.addVertex(new Vertex("7", "7"));

  bfsGraph.addEdge("1", "3", 1);
  bfsGraph.addEdge("1", "2", 1);
  bfsGraph.addEdge("2", "3", 1);
  bfsGraph.addEdge("6", "3", 1);
  bfsGraph.addEdge("7", "3", 1);
  bfsGraph.addEdge("5", "3", 1);
  bfsGraph.addEdge("4", "3", 1);
  bfsGraph.addEdge("4", "5", 1);

  return bfsGraph;
}