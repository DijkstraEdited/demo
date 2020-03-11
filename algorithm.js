//Main of the javascript
function main() {
    var _v = [{ label: "a" }, { label: "b" }, { label: "c" }, { label: "d" }, { label: "e" }, { label: "f" }, { label: "g" }];
    var _e = [{ u: 0, t: 1, d: 3 }, { u: 0, t: 2, d: 5 }, { u: 0, t: 3, d: 4 }, { u: 1, t: 4, d: 3 }, { u: 1, t: 5, d: 6 }, { u: 2, t: 3, d: 2 }, { u: 2, t: 6, d: 4 }, { u: 3, t: 4, d: 5 }, { u: 4, t: 5, d: 2 }, { u: 4, t: 6, d: 4 }, { u: 6, t: 5, d: 6 }];
    var g = new Graph();
    g.create_map(_v, _e);
    document.write("<br>Graph: <br>");
    g.printGraph();
    g.dijkstra();
}

//Graph class to represent visualization map
function Graph(){
  this.vert = [];
  this.vertnum = 0;
  this.edgenum = 0;
  this.connected_num = 0;
  this.label = "";
    //methods of graph
    this.create_map = createMapFunction;
    this.printGraph = printGraphFunction;
    this.dijkstra = dijkstraAlgorithm;
}

//Vertex class to represent package location
function Vertex(v){
  this.label = v.label;//<--Could be coordinates of package location
  this.visit = false;
  this.adjacent = new List();
  //Functions of vertex
    this.insertAdj = insertAdjacent;
    this.adjacentById = adjacentByIdImpl;
    this.distanceById = distancByIdFunction;
    this.vertexInfo = vertexInfoImpl;
}

//Edge class to represent path of location
function Edge(t, d){
  this.target = t;
  this.distanc = d;
}

//Create map
function createMapFunction(v, e) {
    this.vertnum = v.length;
    this.edgenum = e.length;
    //Add vertex into the array
    for (var i = 0; i < this.vertnum; i++) {
        this.vert[i] = new Vertex(v[i]);
    }
    //Add edge to vertex
    for(var i = 0; i < this.edgenum; i++){
        var u = this.vert[e[i].u];
        var v = this.vert[e[i].t];
        u.insertAdj(e[i].t, e[i].d);
        v.insertAdj(e[i].u, e[i].d);
    }
   
}

//Insert adjacente(s)
function insertAdjacent(t, d) {
    var edge = !(d === undefined) ? new Edge(t, d) : new Edge(t);
    this.adjacent.insert(edge);
}

//Print method
function printGraphFunction() {
    for (var i = 0; i < this.vertnum; i++)
    {
        var v = this.vert[i];
        document.write("VERTEX: ", i, v.vertexInfo(), "<br>");
    }
}

//Cont. print
function vertexInfoImpl() {
    return (" {" + this.label + "} - VISIT: " + this.visit + " - ADJACENCY: " + this.adjacentById()+" - DISTANC: "+this.distanceById());
}

//Get adjacents nodes
function adjacentByIdImpl() {
    var adjacent_Id = [];
    var distances = [];
    var edge_adj = this.adjacent.traverse();
    for (var i = 0; i < edge_adj.length; i++) {
        adjacent_Id[i] = edge_adj[i].target;
        distances[i] = edge_adj[i].distanc;
    }
    return adjacent_Id;
}

//Get distanc between two nodes
function distancByIdFunction() {
    var distances = [];
    var edge_adj = this.adjacent.traverse();
    for (var i = 0; i < edge_adj.length; i++) {
        distances[i] = edge_adj[i].distanc;
    }
    return distances;
}

//Dijkstra algorithm
function dijkstraAlgorithm() {

}
