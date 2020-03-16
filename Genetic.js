
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
}

function fitness() {
    for (var i = 0 ; i < population.length ; i++){
        var d = calcDistance(Cities, population[i]);
        if (d < recordDistance ){
            bestEver = population[i];
        }
        fitness[i] = 1 / (d + 1);
    }
}

function normlaizeFitness(){
    var sum = 0;
    for (var i = 0 ; i < fitness.length ; i++){
        sum += fitness[i];
    }

    for (var i = 0 ; i < fitness.length ; i++){
        fitness[i] = fitness[i] / sum;
    }
}

function generatGeneration() {
    var newPopulation = [];

    for (var i = 0 ; i < population.length ; i++){
        var order = pickOne(population, fitness);
        mutation(order);
        newPopulation[i] = order;
    }
    population = newPopulation;
}

function pickOne(list, prob){
    var index = 0;
    var r = random(1);

    while(r > 0){
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

function swap(a, i, j){
    var temp = a[i];
    a[i] = a[j];
    a[j] = temp;
}

function population() {

}

function generatChromosome() {

}

function crossOver() {

}


