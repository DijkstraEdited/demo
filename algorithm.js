//Main of the javascript
function main(){
 var _v = [ { label: "a" }, { label: "b" }, { label: "c" }, { label: "d" }, { label: "e" }, { label: "f" }, { label: "g" }]; 
 var _e = [ { u:0 , t: 1, d: 3 }, { u: 0, t: 2, d: 5 }, { u: 0, t: 3, d: 4 }, { u: 1, t: 4, d: 3 }, { u: 1, t: 5, d: 6 }, { u: 2, t: 3, d: 2 }, { u: 2, t: 6, d: 4 }, { u: 3, t: 4, d: 1 }, { u: 3, t: 7, d: 5 }, { u: 4, t: 5, d: 2 }, { u: 4, t: 8, d: 4 },
	{ u: 5, t: 9, d: 5 }, { u: 6, t: 7, d: 3 }, { u: 6, t: 10, d: 6 }, { u: 7, t: 10, d: 7 }, { u: 7, t: 8,  d: 6 }];
  
  var g = new Graph();
  g.create_map(_v, _e);
}
//Graph class to represent visualization map
function Graph(){
  this.vert = [];
  this.vert_num = 0;
  this.edge_num = 0;
  this.connected_num = 0;
  this.label = "";
}
//Vertex class to represent package location
function Vertex(v){
  this.label = v.label;//<--Could be coordinates of package location
  this.visit = false;
  this.adjacent = new List();
  //Functions of vertex
  this.insertAdj = insertAdjacent;
}
//Edge class to represent path of location
function Edge(t, d){
  this.target = t;
  this.distanc = d;
}
//Create map
function create_map(vert, edge){
  this.vertnum = vert.length;
  this.edgenum = vert.length;
  //Add vertex into the array
  for(var i = 0; i < this.vertnum; i++)
    this.vertex[i] = new Vertex(vert[i]);
  //Add edge to vertex
  for(var i = 0; i < this.edgenum; i++){
    var u = this.vertex[e[i].u];
    u.insertAdj(edge[i].t, edge[i].d);
  }
}
function insertAdjacent(t, d){
  var edge = new Edge(t, d);
  this.adjacent.insert(edge);
}
//
