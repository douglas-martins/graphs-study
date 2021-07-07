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

export function getBfsDfsTemplate(): Graph  {
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

export function getCityTemplates(type: GraphType): Graph {
  const cityTemplates = new Graph(type);

  cityTemplates.addVertex(
    new Vertex("Cascavel",
    "Cascavel",
    { latitude: -24.9555, longitude: -53.4552 }
    )
  );
  cityTemplates.addVertex(
    new Vertex("Toledo",
      "Toledo",
      { latitude: -24.7199, longitude: -53.7433 }
    )
  );
  cityTemplates.addVertex(
    new Vertex("Foz do Iguaçu",
      "Foz do Iguaçu",
      { latitude: -25.5469, longitude: -54.5882 }
    )
  );
  cityTemplates.addVertex(
    new Vertex("Francisco Beltrão",
      "Francisco Beltrão",
      { latitude: -26.0783, longitude: -53.0531 }
    )
  );
  cityTemplates.addVertex(
    new Vertex("São Mateus do Sul",
      "São Mateus do Sul",
      { latitude: -25.8767, longitude: -50.3842 }
    )
  );
  cityTemplates.addVertex(
    new Vertex("Paranaguá",
      "Paranaguá",
      { latitude: -25.5205, longitude: -48.5095 }
    )
  );
  cityTemplates.addVertex(
    new Vertex("Guarapuava",
      "Guarapuava",
      { latitude: -25.3935, longitude: -51.4562 }
    )
  );
  cityTemplates.addVertex(
    new Vertex("Londrina",
      "Londrina",
      { latitude: -23.2927, longitude: -51.1732 }
    )
  );
  cityTemplates.addVertex(
    new Vertex("Ponta Grossa",
      "Ponta Grossa",
      { latitude: -25.0945, longitude: -50.1633 }
    )
  );

  cityTemplates.addVertex(
    new Vertex("Maringá",
    "Maringá",
    { latitude: -23.4273, longitude: -51.9375 }
    )
  );
  cityTemplates.addVertex(
    new Vertex("Umuarama",
      "Umuarama",
      { latitude: -23.7641, longitude: -53.3184 }
    )
  );
  cityTemplates.addVertex(
    new Vertex("Curitiba",
      "Curitiba",
      { latitude: -25.4284, longitude: -49.2733 }
    )
  );

  cityTemplates.addEdge("Cascavel", "Foz do Iguaçu", 143);
  cityTemplates.addEdge("Cascavel", "Toledo", 50);
  cityTemplates.addEdge("Cascavel", "Guarapuava", 250);
  cityTemplates.addEdge("Cascavel", "Francisco Beltrão", 186);
  cityTemplates.addEdge("Francisco Beltrão", "São Mateus do Sul", 354);
  cityTemplates.addEdge("Curitiba", "São Mateus do Sul", 157);
  cityTemplates.addEdge("Curitiba", "Paranaguá", 90);
  cityTemplates.addEdge("Ponta Grossa", "Curitiba", 114);
  cityTemplates.addEdge("Guarapuava", "Ponta Grossa", 165);
  cityTemplates.addEdge("Ponta Grossa", "Londrina", 273);
  cityTemplates.addEdge("Ponta Grossa", "Maringá", 314);
  cityTemplates.addEdge("Londrina", "Maringá", 114);
  cityTemplates.addEdge("Maringá", "Umuarama", 190);
  cityTemplates.addEdge("Umuarama", "Toledo", 126);

  return cityTemplates;
}

export function getCompanyAndCustomersTemplate(): Graph {
  const graph = new Graph(GraphType.UNDIRECTED);

  graph.addVertex(new Vertex("O", "O"));
  graph.addVertex(new Vertex("A", "A"));
  graph.addVertex(new Vertex("B", "B"));
  graph.addVertex(new Vertex("C", "C"));
  graph.addVertex(new Vertex("D", "D"));
  graph.addVertex(new Vertex("E", "E"));

  graph.addEdge("A", "B", 10);
  graph.addEdge("A", "C", 12);
  graph.addEdge("A", "D", 18);
  graph.addEdge("A", "O", 10);

  graph.addEdge("B", "C", 7);
  graph.addEdge("B", "E", 12);
  graph.addEdge("B", "D", 12);
  graph.addEdge("B", "O", 5);

  graph.addEdge("C", "D", 8);
  graph.addEdge("C", "O", 5);
  graph.addEdge("C", "E", 12);

  graph.addEdge("D", "E", 10);
  graph.addEdge("D", "O", 10);

  graph.addEdge("E", "A", 10);
  graph.addEdge("E", "O", 10);


  return graph;
}

export function getBookExample(): Graph {
  const graph = new Graph(GraphType.UNDIRECTED);

  graph.addVertex(new Vertex("1", "1"));
  graph.addVertex(new Vertex("2", "2"));
  graph.addVertex(new Vertex("3", "3"));
  graph.addVertex(new Vertex("4", "4"));
  graph.addVertex(new Vertex("5", "5"));
  graph.addVertex(new Vertex("6", "6"));

  graph.addEdge("1", "2", 3);
  graph.addEdge("1", "3", 2);
  graph.addEdge("1", "4", 5);
  graph.addEdge("1", "5", 10);
  graph.addEdge("1", "6", 2);

  graph.addEdge("2", "3", 7);
  graph.addEdge("2", "4", 11);
  graph.addEdge("2", "5", 8);
  graph.addEdge("2", "6", 1);

  graph.addEdge("3", "4", 2);
  graph.addEdge("3", "5", 9);
  graph.addEdge("3", "6", 9);

  graph.addEdge("4", "5", 3);
  graph.addEdge("4", "6", 2);

  graph.addEdge("5", "6", 4);

  return graph;
}