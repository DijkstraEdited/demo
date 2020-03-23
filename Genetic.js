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
    
    var counter = 0; //threshold value
    var repFitness = 0; //check for improvment
    var bestInIndex = 0; //save best index of generation
    
    //To compare two best fitnesses
    var bestFit1 = 0;
    var bestFit2 = 0;
    
    //Create graph
    var g = new Graph();
    g.create_map(_v, _e);
    document.write("<br>Graph: <br>");
    g.printGraph();

    //Apply genetic algorithm: Generate new population with number of chromosomes
    g.generatePopulation(10);
    
    //Check for threshold value and if there is no improvement in the fitness
    while (counter < 10 && repFitness < 5) {
        //Calculate fitness for each chromosome in the population
        g.flag = 0;
        g.findFitness();
        if (g.flag == 1)
            bestInIndex=counter;
        document.write("<br>The -", counter, "- Population(s) and Fitness(s):<br>");
        for (var i = 0; i < g.population.length; i++) {
            document.write(g.population[i].a, ", fitness: ", g.population[i].f, "<br>");
        }
        document.write(">> Best chromosome in population #", bestInIndex, " is : (", g.bestPopu, ") and it's fitness: (", g.recordPath, ")<br>");
        
        //Apply cycle cross-over
        for (var i = 0; i < g.population.length; i += 2)
            g.cycleCrossover(g.population[i].a, g.population[i+1].a, i, i+1);
        
        //Apply single point cross-over
        document.write("single point cross over: ")
        document.write(g.doSinglePointCrossOver(g.population[0].a, g.population[1].a));
        
        //Apply inversion mutation
        for (var i = 0; i < g.population.length; i++) {
            g.inversionMut(g.population[i].a);
        }
        
        //To Make comparision between 2 best path
        if (counter % 2 == 0)
            bestFit1 = g.recordPath;
        else
            bestFit2 = g.recordPath;
        if (bestFit1 == bestFit2) 
            repFitness++;
        
        counter++;
    }
}
/*-----------------------Graph Methods-----------------------------
Graph class to represent visualization map*/
function Graph() {
    this.vert = [];
    this.vertnum = 0;
    this.edgenum = 0;
    this.label = "";
    
    //Variables for genetic
    this.population = [];
    this.bestPopu;                  //for best chromosom in population
    this.recordPath = Infinity;     //record of best chromosom
    this.firstSmall;
    this.secondSmall;
    
    //methods of graph
    this.create_map = createMapFunction;
    this.printGraph = printGraphFunction;

    //Genetic method
    this.generatePopulation = population;
    this.findFitness = fitness;
    this.cycleCrossover = cycleCrossOver;
    this.inversionMut = inversionMutation;
    this.doSinglePointCrossOver = singlePointCrossOver;
    this.doSwapMutation = swapMutation;
}

//Vertex class to represent package location
function Vertex(v) {
    this.label = v.label;
    this.visit = false;
    this.adjacent = new List();
    //Functions of vertex
    this.insertAdj = insertAdjacent;
    this.adjacentById = adjacentByIdImpl;
    this.distanceById = distancByIdFunction;
    this.vertexInfo = vertexInfoImpl;

    //Functions for genetic
    this.calulDistance = calculateDistance;
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
//-----------------------End of Graph Methods-----------------------------

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

//Do cycle cross-over for two parents
function cycleCrossOver(a, b, indexA, indexB) {
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
    //Added by Sam
    this.population[indexA].a = chiled1;
    this.population[indexB].a = chiled2;
    //Ended
    //var chiled = chiled1.concat(chiled2);
    //return chiled;
}

//Sam: To create only one population
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

//Sam: For fitness function
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
            this.flag = 1;
        }
        dis = 0;
    }

    //Find two minimum parent
    this.firstSmall = this.secondSmall = Infinity;
    for (var i = 0; i < this.population.length; i++) {
        var temp = this.population[i].f;
        // If current element is smaller than first then update both first and second 
        if (temp < this.firstSmall) {
            this.secondSmall = this.firstSmall;
            this.firstSmall = this.population[i].a;
        }
        //If temp is in between first and second then update second  
        else if (temp < this.secondSmall && temp != this.firstSmall)
            this.secondSmall = this.population[i].a;
    }
}

//Sam: Find distance of two nodes
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

//Do Inversion Mutation
function inversionMutation(chromosom) {
    var indexA, indexB;
    var subArray;
    var chromSize = chromosom.length - 2;
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
    subArray = chromosom.slice(indexA, indexB + 1);
    subArray = subArray.reverse();
    for (var i = 0; i < subArray.length; i++) {
        chromosom[indexA + i] = subArray[i];
    }
}

//Shuffle an array
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

//Swap Mutation function 
function swapMutation(chromosom) {
    var indexA, indexB;
    //swap random order elements 
    do {
        indexA = getRandomArbitrary(1, chromosom.length - 1);
        indexB = getRandomArbitrary(1, chromosom.length - 1);
    } while (indexA == indexB);
    swap(chromosom, indexA, indexB);
    document.write(">> After Swap Mutation: ", chromosom);
}

//single Point Crossover operator
//it cross 2 parent over to form a newer childeren
function singlePointCrossOver(chromosom1, chromosom2) {
    var parent1 = [];
    var parent2 = [];
    var child1 = [];
    var child2 = [];
    
    child1[0]=0;
    child2[0]=0;

    // copy the two chromosoms to the parent1 and parent2 
    for (var i = 0; i < chromosom1.length; i++) {
        parent1[i] = chromosom1[i];
        parent2[i] = chromosom2[i];
    }

    // crossPoint is at index 2 
    var crossPoint = (parent1.length - 2) / 2; 

    //generating the first half of children 
    for(var i = 1; i < crossPoint ; i++){
        child1[i] = parent1[i];
        child2[i] = parent2[i];
    }

    //obtaining child 1 from parent 2 with no repating points
    for(var i = 1; i < parent2.length-1 ; i++){
        var point = parent2[i];
        if (!child1.includes(point)){
            child1.push(point);
        }
    }
    
    //obtaining child 2 from parent 1 with no repating points   
    for(var i = 1; i < parent1.length -1 ; i++){
        var point = parent1[i];
        if (!child2.includes(point)){
            child2.push(point);
        }
    }
    //end of the child is source node 
    child1.push(0);
    child2.push(0);

    var res = child1.concat(child2);
    return res;
}
