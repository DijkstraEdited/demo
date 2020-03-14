//Main of the javascript
function main() {
    //var _v = [{ label: "a" }, { label: "b" }, { label: "c" }, { label: "d" }, { label: "e" }, { label: "f" }, { label: "g" }];
    //var _e = [{ u: 0, t: 1, d: 3 }, { u: 0, t: 2, d: 5 }, { u: 0, t: 3, d: 4 }, { u: 1, t: 4, d: 3 }, { u: 1, t: 5, d: 6 }, { u: 2, t: 3, d: 2 }, { u: 2, t: 6, d: 4 }, { u: 3, t: 4, d: 5 }, { u: 4, t: 5, d: 2 }, { u: 4, t: 6, d: 4 }, { u: 6, t: 5, d: 6 }];
    var _v = [
        { label: "a" }, // index = 0
        { label: "b" }, // index = 1
        { label: "c" }, // index = 2
        { label: "d" }, // index = 3
        { label: "e" }, // index = 4
        { label: "f" }, // index = 5
        { label: "g" }, // index = 6
        { label: "h" }, // index = 7
        { label: "i" }, // index = 8
        { label: "j" }, // index = 9
        { label: "k" }, // index = 10
        { label: "l" }  // index = 11
    ];

    var _e = [
        { u: 0, t: 1, d: 3 },
        // { u: 0, t: 2, d: 5 },
        { u: 0, t: 3, d: 4 },

        { u: 1, t: 4, d: 3 },
        // { u: 1, t: 5, d: 6 },

        // { u: 2, t: 3, d: 2 },
        { u: 2, t: 0, d: 5 },
        { u: 2, t: 6, d: 4 },

        { u: 3, t: 2, d: 2 },
        // { u: 3, t: 4, d: 1 },
        // { u: 3, t: 7, d: 5 },

        { u: 4, t: 3, d: 1 },
        // { u: 4, t: 5, d: 2 },
        { u: 4, t: 8, d: 4 },

        { u: 5, t: 1, d: 6 },
        { u: 5, t: 4, d: 2 },
        // { u: 5, t: 9, d: 5 },

        { u: 6, t: 7, d: 3 },
        { u: 6, t: 10, d: 6 },

        { u: 7, t: 3, d: 5 },
        { u: 7, t: 10, d: 7 },
        { u: 7, t: 8, d: 6 },

        { u: 8, t: 9, d: 3 },
        { u: 8, t: 11, d: 5 },

        // { u: 9, t: 11, d: 9 },
        { u: 9, t: 5, d: 5 },

        // { u: 10, t: 11, d: 8 }

        { u: 11, t: 10, d: 8 },
        { u: 11, t: 9, d: 9 }
    ];
    var g = new Graph();
    g.create_map(_v, _e);
    document.write("<br>Graph: <br>");
    g.printGraph();
    // Initilize Dijkstra Matrix 
    for (var i = 0; i < g.vertnum; i++) {
        g.DijkstraMatrix[i] = [];

        for (var j = 0; j < g.nv; j++) {
            g.DijkstraMatrix[i][j] = 0;
        }
    }
    g.dijkstra(0);
    document.write("<br>Shortest paths by Dijkstra from vertex 0<br>");
    var i;
    for (i = 0; i < g.vertnum; i++) {
        document.write(g.vt[i].d, "(", g.vt[i].p, ",", g.vt[i].t, "),");
    }
}

//Graph class to represent visualization map
function Graph() {
    this.vert = [];
    this.vertnum = 0;
    this.edgenum = 0;
    this.connected_num = 0;
    this.label = "";
    this.vt = []; //for the result
    //methods of graph
    this.create_map = createMapFunction;
    this.printGraph = printGraphFunction;
    //this.dijkstra = dijkstraAlgorithm;
    //this.dijkstra = dijkstraAlg;
    this.dijkstra = DijkstraImpl;
    this.DijkstraMatrix = [];
    this.vt = [];
}

//Vertex class to represent package location
function Vertex(v) {
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
function Edge(t, d) {
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
    for (var i = 0; i < this.edgenum; i++) {
        var u = this.vert[e[i].u];
        var v = this.vert[e[i].t];
        u.insertAdj(e[i].t, e[i].d);
        //v.insertAdj(e[i].u, e[i].d);
    }

}

//Insert adjacente(s)
function insertAdjacent(t, d) {
    var edge = !(d === undefined) ? new Edge(t, d) : new Edge(t);
    this.adjacent.insert(edge);
}

//Print method
function printGraphFunction() {
    for (var i = 0; i < this.vertnum; i++) {
        var v = this.vert[i];
        document.write("VERTEX: ", i, v.vertexInfo(), "<br>");
    }
}

//Cont. print
function vertexInfoImpl() {
    return (" {" + this.label + "} - VISIT: " + this.visit + " - ADJACENCY: " + this.adjacentById() + " - DISTANC: " + this.distanceById());
}

//Get adjacents nodes
function adjacentByIdImpl() {
    var adjacent_Id = [];
    var edge_adj = this.adjacent.traverse();
    for (var i = 0; i < edge_adj.length; i++) {
        adjacent_Id[i] = edge_adj[i].target;
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
    //Initilize all nodes 

    //Get nodes
    var nodes = [], adjacent = [], distancs = [];
    for (var i = 0; i < this.vert.length; i++) {
        var v = this.vert[i];
        nodes[i] = v.label;
    }
    //Get adjacent(s) and its distances
    for (var i = 0; i < this.vert.length; i++) {
        var v = this.vert[i];
        adjacent = v.adjacentById();
        distancs = v.distanceById();
    }
    //Start with the initial location
    while (this.vert.length == 0) {

    }
}

//D
function dijkstraAlg(Source) {
    // initialize queue 
    var PQ = new PQueue();

    var p = []; // list of penultimate vertex 
    var d = []; // sortest path from vertex 0 to any vertex
    var u; // variable to store element which has minimum priority 
    var s = Source; // start from vertex 0 

    // insert all vertex on PQ with distanse equal infinity and initial value for penultimate vertex  
    for (var k = 0; k < this.vertnum; k++) {
        d[k] = Infinity;
        p[k] = "-";
        PQ.insert(k, d[k]);
    }

    d[s] = 0; // distanse for first vertex 
    PQ.decrease(s, d[s]); // update first vertex on graph by change distance with value 0 

    var Vt = []; // list vertex

    for (var i = 0; i < this.vertnum; i++) {
        u = PQ.deleteMin(); // delete node which has minimum proiorty 

        Vt[i] = u.item; // insert the item of u on vertex list 
        var adj = this.vert[Vt[i]].adjacent.traverse(); // find adjacent of vertex u 

        for (var j = 0; j < adj.length; j++) {
            if (u.prior + adj[j].distanc < d[adj[j].target] ) {
                d[adj[j].target] = u.prior + adj[j].distanc;
                p[adj[j].target] = u.item;
                PQ.decrease(adj[j].target, d[adj[j].target]); // update proirity queue 
                //u.visit = true; //Mark this node as visited 
            }
        }
    }
    //Print output 
    document.write("</p>Shortest paths tree from vertex " + Source + "<br>");
    for (i = 0; i < this.vertnum - 1; i++) {
        document.write(d[i], "(" + p[Vt[i]] + "," + Vt[i] + ") ,");
    }
    document.write(d[i], "(" + p[Vt[i]] + "," + Vt[i] + ").");
}

function DijkstraImpl(Source) {
    //creat priority queue 
    var pq = new PQueue();
    //store the deleted minimum priority element
    var u;
    var DijkstraArray = [];
    //initialize pqueue 
    for (var i = 0; i < this.vertnum; i++) {
        DijkstraArray[i] = {
            d: Infinity,
            p: "-",
        }

        pq.insert(i, DijkstraArray[i].d);
        this.vert[i].visit = false;
    }
    //initialize the array
    DijkstraArray[Source] = {
        p: "-",
        d: 0
    }
    //update priority of s with ds
    pq.decrease(Source, DijkstraArray[Source].d);
    //serch for the shortest path 
    for (var i = 0; i < this.vertnum; i++) {
        //delete the minimum priority element
        u = pq.deleteMin();
        //initialize the array
        this.vt[u.item] = {

            p: DijkstraArray[u.item].p,
            t: u.item,
            d: DijkstraArray[u.item].d
        };

        this.vert[u.item].visit = true;
        var adj = this.vert[u.item].adjacent.traverse();

        //update fringe set after adding u*
        for (var j = 0; j < adj.length; j++) {
            if (!this.vert[adj[j].target].visit) {
                if (u.prior + adj[j].distanc < DijkstraArray[adj[j].target].d) {
                    DijkstraArray[adj[j].target] = {
                        p: u.item,
                        t: adj[j].target,
                        d: u.prior + adj[j].distanc

                    }
                    pq.decrease(adj[j].target, DijkstraArray[adj[j].target].d);
                    this.DijkstraMatrix[Source][adj[j].target] = u.prior + adj[j].distance;
                }
            }
        }
    }
}
