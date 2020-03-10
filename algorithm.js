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
    var edge = new Edge(edge[i]);
    this.adjacent.insert(edge);
  }
}
