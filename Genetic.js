//Main of the javascript
function main() {
    var _v = [
        { label: "a" }, // index = 0
        { label: "b" }, // index = 1
        { label: "c" }, // index = 2
        { label: "d" }, // index = 3
        { label: "e" }, // index = 4
    ];

    var _e = [
        { u: 0, t: 1, d: 5 },
        { u: 0, t: 2, d: 11 },
        { u: 0, t: 3, d: 8 },
        { u: 0, t: 4, d: 9 },

        { u: 1, t: 0, d: 12 },
        { u: 1, t: 2, d: 11 },
        { u: 1, t: 3, d: 5 },
        { u: 1, t: 4, d: 10 },

        { u: 2, t: 0, d: 6 },
        { u: 2, t: 1, d: 16 },
        { u: 2, t: 3, d: 13 },
        { u: 2, t: 4, d: 5 },

        { u: 3, t: 0, d: 20 },
        { u: 3, t: 1, d: 8 },
        { u: 3, t: 2, d: 30 },
        { u: 3, t: 4, d: 7 },

        { u: 4, t: 0, d: 12 },
        { u: 4, t: 1, d: 15 },
        { u: 4, t: 2, d: 10 },
        { u: 4, t: 3, d: 3 },
    ];

    var totalCities = 5;
    var Fitness = [];
    var recordDistance = Infinity;
    var population = [];
    var popSize = 10;
    var bestEver = [];

    //Create graph
    var g = new Graph();
    g.create_map(_v, _e);
    document.write("<br>Graph: <br>");
    g.printGraph();

    //Apply genetic algorithm
    g.generatePopulation(10);
    for (var i = 0; i < g.population.length; i++)
        document.write(g.population[i].a, "<br>");

    document.write("<br>", "Cycle cross over:", "<br>");
    document.write(cycleCrossOver(g.population[0].a, g.population[1].a), "<br>");
}

//Graph class to represent visualization map
function Graph() {
    this.vert = [];
    this.vertnum = 0;
    this.edgenum = 0;
    this.label = "";
    this.population = [];
    //methods of graph
    this.create_map = createMapFunction;
    this.printGraph = printGraphFunction;

    //Genetic method
    this.generatePopulation = population;
    //this.calulDistance = calculateDistance;
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

    //Functions for genetic
    this.searchForVer = searchVert;
    this.calulDistance = calculateDistance;
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


function fitness() {
    for (var i = 0; i < population.length; i++) {
        var d = calcDistance(Cities, population[i]);
        if (d < recordDistance) {
            bestEver = population[i];
        }
        fitness[i] = 1 / (d + 1);
    }
}

function normlaizeFitness() {
    var sum = 0;
    for (var i = 0; i < fitness.length; i++) {
        sum += fitness[i];
    }

    for (var i = 0; i < fitness.length; i++) {
        fitness[i] = fitness[i] / sum;
    }
}

//Method for new population
function generatGeneration(size) {
    var newPopulation = [];
    //First node in the path
    newPopulation[0] = 0;
    for (var i = 1; i < size; i++) {
        var order = pickOne(population, fitness);
        mutation(order);
        newPopulation[i] = order;
    }
    //Last node in the path
    newPopulation[size] = 0;
    population = newPopulation;
}

function pickOne(list, prob) {
    var index = 0;
    var r = random(1);

    while (r > 0) {
        r = r - prob[index];
        index++;
    }
    index--;
    return list[index].slice();
}

function mutation(order, mutationRate) {
    var indexA = floor(random(order.length));
    var indexB = floor(random(order.length));
    swap(order, indexA, indexB);
}

function swap(a, i, j) {
    var temp = a[i];
    a[i] = a[j];
    a[j] = temp;
}

//To create only one population
function population(numPop) {
    for (var f = 0; f < numPop; f++) {
        var order = [];
        for (var i = 0; i < this.vertnum - 1; i++) {
            order[i] = i + 1;
        }
        this.population[f] =
        {
            a: order,
            f: Infinity         //for fitness value
        };
        var temp = shuffle(order);
        temp.splice(0, 0, 0);   //First node in the path
        temp.push(0);           //Last node in the path
        this.population[f].a = temp;
        //document.write(this.population[f]);
        //this.population[f].f = calulDistance(this.population[f]);//Calculate fitness

    }
}

//For fitness function
function fitness() {

}

//calculate distances
function calculateDistance(onePopulation) {
    var dis = 0;
    var temp = onePopulation.a;
    for (var i = 0; i < temp.length - 1; i++) {
        var currentNode = temp[i];
        var nextNode = temp[i + 1];
        document.write(this.vert[0], "<br>");
        var v1 = this.vert[currentNode];

        var adjList = v1.adjacent.traverse();
        //search for vertex
        for (var j = 0; j < this.adjList.length; j++) {
            if (adjList[j].target == nextNode) {
                dis += adjList[j].distanc;
            }
        }
    }
}

//
function searchVert(fisrt, second) {


}

function generatChromosome() {

}

function cycleCrossOver(a, b) {
    var parent1 = [];
    var parent2 = [];
    // copy the two parent to the parent1 and parent2 
    for (var i = 0; i < a.length; i++) {
        parent1[i] = { node: a[i], visited: false, cycle: 0 };
        parent2[i] = { node: b[i], visited: false, cycle: 0 };
    }

    var c = 1;
    var count = 0;
    var array = 1;
    var chiled1 = [];
    var chiled2 = [];
    chiled1[0]=0;
    chiled2[0]=0;
    chiled1[parent1.length-1]=0;
    chiled2[parent2.length-1]=0;
    for (var i = 1; i < parent1.length  && array <= 4; i = c,array++) {
        if ((parent1[i].visited == false)  ) {
            parent1[i].visited = true;
            parent2[i].visited = true;
            parent1[i].cycle = count;
            parent2[i].cycle = count;
            if (parent1[i].node == parent2[i].node) {
                
                for (var k = 1; k < parent1.length - 1; k++) {
                    if (parent1[k].visited == false ) {
                        c = k;
                        break;
                    }
                }
                chiled1[i] = parent1[i].node;
                chiled2[i] = parent2[i].node;
                count++;
            }
            else {
                for (var j = 1; j < parent1.length - 1; j++) {
                    if (parent2[i].node == parent1[j].node && parent1[j].visited == false) {
                        c = j;
                        break;
                    }
                    // end of the cycle copy visted nodes
                    else if (parent2[i].node == parent1[j].node && parent1[j].visited == true) {
                        
                        for (var k = 1; k < parent1.length - 1; k++) {
                            if (parent1[k].visited == true && parent1[k].cycle % 2 == 0) {
                                chiled1[k] = parent1[k].node;
                                
                            } else if (parent1[k].visited == true && parent1[k].cycle % 2 == 1) {
                                chiled2[k] = parent1[k].node;
                            }
                            if (parent2[k].visited == true && parent1[k].cycle % 2 == 0) {
                                chiled2[k] = parent2[k].node;
                            }
                            else if (parent2[k].visited == true && parent2[k].cycle % 2 == 1) {
                                chiled1[k] = parent2[k].node;
                            }
                        }
                        count++;
                        for (var k = 1; k < parent1.length - 1; k++) {
                            if (parent1[k].visited == false ) {
                                c = k;
                                break;
                            }
                        }
                        
                        break;
                    }
                }
            }
        } 
    }
    var chiled = chiled1.concat(chiled2);
    return chiled;

}

function shuffle(array) {
    var m = array.length, t, i;

    // While there remain elements to shuffle…
    while (m) {
        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);

        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
    return array;
}

function calcDistance(points, order) {
    var sum = 0;

    for (var i = 0; i < order.length; i++) {
        var cityAIndex = order[i];
        var cityA = points[cityAIndex];
        var cityBIndex = order[i + 1];
        var cityB = points[cityBIndex];
        var d = dist(cityA.x, cityA.y, cityB.x, cityB.y);
        sum += d;
    }

    return sum;
}


