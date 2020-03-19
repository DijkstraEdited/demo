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

    //Create graph
    var g = new Graph();
    g.create_map(_v, _e);
    document.write("<br>Graph: <br>");
    g.printGraph();

    //Apply genetic algorithm
    g.generatePopulation(10);
    g.findFitness();
    document.write("<br>Population(s) and Fitness(s):<br>");
    for (var i = 0; i < g.population.length; i++) {
        document.write(g.population[i].a, ", fitness: ", g.population[i].f, "<br>");
    }
    document.write(">> Best population is : (", g.bestPopu, ") and it's fitness: (", g.recordPath,")<br>");
    g.inversionMut(g.bestPopu);
    
    
    //do single point cross-over
    g.doSinglePointCrossOver(g.firstSmall, g.secondSmall);

    document.write("<br> <br>");
    
    //apply swap mutation
     g.doSwapMutation(g.bestPopu);
}

//Graph class to represent visualization map
function Graph() {
    //Variables for graph
    this.vert = [];
    this.vertnum = 0;
    this.edgenum = 0;
    this.label = "";
    
    //Variables for genetic alg.
    this.population = [];
    this.bestPopu;
    this.recordPath = Infinity;
    this.firstSmall;
    this.secondSmall;
    this.newChild1;
    this.newChild2;
    
    //methods of graph
    this.create_map = createMapFunction;
    this.printGraph = printGraphFunction;

    //Genetic method
    this.generatePopulation = population;
    this.findFitness = fitness;
    this.inversionMut = inversionMutation;
    this.doSinglePointCrossOver = singlePointCrossOver;
    this.doSwapMutation = swapMutation;
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
    this.findDis = findDistance;
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

//random number index function 
function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

//Swap Mutation function 
function swapMutation(chromosom) {
    var indexA , indexB;
        //swap random order elements 
        do {
            indexA = getRandomArbitrary(1, chromosom.length-1);
            indexB = getRandomArbitrary(1, chromosom.length-1);
        } while (indexA == indexB);
        swap(chromosom, indexA, indexB);
        document.write(">> After Swap Mutation: ", chromosom);
}

// swap function
function swap(a, i, j) {
    var tempo = a[i];
    a[i] = a[j];
    a[j] = tempo;
}

//single Point CrossOver operator
//it cross 2 parent over to form a newer 2 childeren
function singlePointCrossOver(chromosom1, chromosom2) {
    
    var firstChromoStartHalf, firstChromoLastHalf, secondChromoStartHalf, secondChromoLastHalf;

    secondChromoStartHalf = chromosom2.slice(1, 3); 
    firstChromoLastHalf   = chromosom1.slice(3, 5); 

    firstChromoStartHalf = chromosom1.slice(1, 3);
    secondChromoLastHalf = chromosom2.slice(3, 5);

    this.newChild1  = chromosom2.slice(0, 1).concat(secondChromoLastHalf.concat(firstChromoStartHalf));
    this.newChild1 = this.newChild1 + ",0";

  
    this.newChild2  = chromosom1.slice(0, 1).concat(firstChromoLastHalf.concat(secondChromoStartHalf));
    this.newChild2 = this.newChild2 + ",0";

    document.write(">> After single point cross-over new first child: ",this.newChild1," , new second child: ", this.newChild2);
}

//To create number of population(s)
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
    }
}

//For fitness function
function fitness() {
    var dis = 0;
    for (var i = 0; i < this.population.length; i++) {
        var temp = this.population[i].a;
        for (var j = 0; j < temp.length; j++) {
            var v = this.vert[temp[j]];         //Get the current node
            dis += v.findDis(temp[j + 1]);      //Summation the distance between current and next node
        }
        this.population[i].f = dis;
        if (dis < this.recordPath) {
            this.recordPath = dis;
            this.bestPopu = this.population[i].a;
        }
        dis = 0;
    }
    
     //Find two minimum parent
    this.firstSmall = this.secondSmall = Infinity;
    for (var i = 0; i < this.population.length; i++){
        var temp = this.population[i].f;
        // If current element is smaller than first then update both first and second 
        if (temp <  this.firstSmall){
            this.secondSmall =  this.firstSmall;
            this.firstSmall = this.population[i].a;
        }
        //If temp is in between first and second then update second  
               else if (temp <  this.secondSmall && temp != this.firstSmall) 
               this.secondSmall = this.population[i].a; 
    }
}

//Find distance of two nodes
function findDistance(nextNode) {
    var adjList = this.adjacent.traverse();     //Find the adjacent of the node
    var sum = 0;
    for (var j = 0; j < adjList.length; j++) {  //Look for the matching one
        if (adjList[j].target == nextNode) {    
            return adjList[j].distanc;          //Return the distance
        }
    }
    return 0;
}

//To shuffle an array
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

//Do Inversion Mutation
function inversionMutation(chromosom) {
    var indexA, indexB;
    var subArray;
    var chromSize = chromosom.length-2;
    do {
        indexA = Math.floor((Math.random() * chromSize) + 1);
        indexB = Math.floor((Math.random() * chromSize) + 1);
    } while (indexA == indexB);
    //get sub-array from the original
    if (indexA > indexB) {
        var temp = indexA;
        indexA = indexB;
        indexB = temp;
    }
    subArray = chromosom.slice(indexA, indexB+1);
    subArray = subArray.reverse();
    for (var i = 0; i < subArray.length; i++) {
        chromosom[indexA + i] = subArray[i];
    }
    document.write(">> After Inversion Mutation: ", chromosom);
}

function generatChromosome() {

}
