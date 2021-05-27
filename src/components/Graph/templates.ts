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

export function getWelshPowellTemplate(type: GraphType): Graph {
  const welshPowellGraph = new Graph(type);

  welshPowellGraph.addVertex(
    new Vertex("Cascavel",
    "Cascavel",
    { latitude: -24.9555, longitude: -53.4552 }
    )
  );
  welshPowellGraph.addVertex(
    new Vertex("Toledo",
      "Toledo",
      { latitude: -24.7199, longitude: -53.7433 }
    )
  );
  welshPowellGraph.addVertex(
    new Vertex("Foz do Iguaçu",
      "Foz do Iguaçu",
      { latitude: -25.5469, longitude: -54.5882 }
    )
  );
  welshPowellGraph.addVertex(
    new Vertex("Francisco Beltrão",
      "Francisco Beltrão",
      { latitude: -26.0783, longitude: -53.0531 }
    )
  );
  welshPowellGraph.addVertex(
    new Vertex("São Mateus do Sul",
      "São Mateus do Sul",
      { latitude: -25.8767, longitude: -50.3842 }
    )
  );
  welshPowellGraph.addVertex(
    new Vertex("Paranaguá",
      "Paranaguá",
      { latitude: -25.5205, longitude: -48.5095 }
    )
  );
  welshPowellGraph.addVertex(
    new Vertex("Guarapuava",
      "Guarapuava",
      { latitude: -25.3935, longitude: -51.4562 }
    )
  );
  welshPowellGraph.addVertex(
    new Vertex("Londrina",
      "Londrina",
      { latitude: -23.2927, longitude: -51.1732 }
    )
  );
  welshPowellGraph.addVertex(
    new Vertex("Ponta Grossa",
      "Ponta Grossa",
      { latitude: -25.0945, longitude: -50.1633 }
    )
  );

  welshPowellGraph.addVertex(
    new Vertex("Maringá",
    "Maringá",
    { latitude: -23.4273, longitude: -51.9375 }
    )
  );
  welshPowellGraph.addVertex(
    new Vertex("Umuarama",
      "Umuarama",
      { latitude: -23.7641, longitude: -53.3184 }
    )
  );
  welshPowellGraph.addVertex(
    new Vertex("Curitiba",
      "Curitiba",
      { latitude: -25.4284, longitude: -49.2733 }
    )
  );

  welshPowellGraph.addEdge("Cascavel", "Foz do Iguaçu", 143);
  welshPowellGraph.addEdge("Cascavel", "Toledo", 50);
  welshPowellGraph.addEdge("Cascavel", "Guarapuava", 250);
  welshPowellGraph.addEdge("Cascavel", "Francisco Beltrão", 186);
  welshPowellGraph.addEdge("Francisco Beltrão", "São Mateus do Sul", 354);
  welshPowellGraph.addEdge("Curitiba", "São Mateus do Sul", 157);
  welshPowellGraph.addEdge("Curitiba", "Paranaguá", 90);
  welshPowellGraph.addEdge("Curitiba", "Ponta Grossa", 114);
  welshPowellGraph.addEdge("Ponta Grossa", "Guarapuava", 165);
  welshPowellGraph.addEdge("Ponta Grossa", "Londrina", 273);
  welshPowellGraph.addEdge("Ponta Grossa", "Maringá", 314);
  welshPowellGraph.addEdge("Londrina", "Maringá", 114);
  welshPowellGraph.addEdge("Maringá", "Umuarama", 190);
  welshPowellGraph.addEdge("Umuarama", "Toledo", 126);

  return welshPowellGraph;
}
// TODO talvez usar o mesmo código de cima, validar se não vai mudar nada
export function getAStartTemplate(type: GraphType): Graph {
  const aStarGraph = new Graph(type);

  aStarGraph.addVertex(
    new Vertex("Cascavel",
      "Cascavel",
      { latitude: -24.9555, longitude: -53.4552 }
    )
  );
  aStarGraph.addVertex(
    new Vertex("Toledo",
      "Toledo",
      { latitude: -24.7199, longitude: -53.7433 }
    )
  );
  aStarGraph.addVertex(
    new Vertex("Foz do Iguaçu",
      "Foz do Iguaçu",
      { latitude: -25.5469, longitude: -54.5882 }
    )
  );
  aStarGraph.addVertex(
    new Vertex("Francisco Beltrão",
      "Francisco Beltrão",
      { latitude: -26.0783, longitude: -53.0531 }
    )
  );
  aStarGraph.addVertex(
    new Vertex("São Mateus do Sul",
      "São Mateus do Sul",
      { latitude: -25.8767, longitude: -50.3842 }
    )
  );
  aStarGraph.addVertex(
    new Vertex("Paranaguá",
      "Paranaguá",
      { latitude: -25.5205, longitude: -48.5095 }
    )
  );
  aStarGraph.addVertex(
    new Vertex("Guarapuava",
      "Guarapuava",
      { latitude: -25.3935, longitude: -51.4562 }
    )
  );
  aStarGraph.addVertex(
    new Vertex("Londrina",
      "Londrina",
      { latitude: -23.2927, longitude: -51.1732 }
    )
  );
  aStarGraph.addVertex(
    new Vertex("Ponta Grossa",
      "Ponta Grossa",
      { latitude: -25.0945, longitude: -50.1633 }
    )
  );

  aStarGraph.addVertex(
    new Vertex("Maringá",
      "Maringá",
      { latitude: -23.4273, longitude: -51.9375 }
    )
  );
  aStarGraph.addVertex(
    new Vertex("Umuarama",
      "Umuarama",
      { latitude: -23.7641, longitude: -53.3184 }
    )
  );
  aStarGraph.addVertex(
    new Vertex("Curitiba",
      "Curitiba",
      { latitude: -25.4284, longitude: -49.2733 }
    )
  );

  aStarGraph.addEdge("Cascavel", "Foz do Iguaçu", 143);
  aStarGraph.addEdge("Cascavel", "Toledo", 50);
  aStarGraph.addEdge("Cascavel", "Guarapuava", 250);
  aStarGraph.addEdge("Cascavel", "Francisco Beltrão", 186);
  aStarGraph.addEdge("Francisco Beltrão", "São Mateus do Sul", 354);
  aStarGraph.addEdge("Curitiba", "São Mateus do Sul", 157);
  aStarGraph.addEdge("Curitiba", "Paranaguá", 90);
  aStarGraph.addEdge("Curitiba", "Ponta Grossa", 114);
  aStarGraph.addEdge("Ponta Grossa", "Guarapuava", 165);
  aStarGraph.addEdge("Ponta Grossa", "Londrina", 273);
  aStarGraph.addEdge("Ponta Grossa", "Maringá", 314);
  aStarGraph.addEdge("Londrina", "Maringá", 114);
  aStarGraph.addEdge("Maringá", "Umuarama", 190);
  aStarGraph.addEdge("Umuarama", "Toledo", 126);

  return aStarGraph;
}