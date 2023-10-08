class Population {
  constructor(targetPhrase, mutationRate, populationSize) {
    this.population; 
    this.matingPool;
    this.generations = 0; 
    this.finished = false;
    this.targetPhrase = targetPhrase;
    this.mutationRate = mutationRate; 
    this.perfectScore = 1;

    this.best = "";

    this.matingPool = [];
    this.population = [];
    for (let i = 0; i < populationSize; i++) {
      this.population.push(new DNA(this.targetPhrase.length));
    }

    this.calculateFitness();
  }

  calculateFitness() {
    for (let i = 0; i < this.population.length; i++) {
      this.population[i].calculateFitness(targetPhrase);
    }
  }

  naturalSelection() {
    this.matingPool = [];

    let maxFitness = 0;
    for (let i = 0; i < this.population.length; i++) {
      if (this.population[i].fitness > maxFitness)
        maxFitness = this.population[i].fitness;
    }

    for (let i = 0; i < this.population.length; i++) {
      let fitness = map(this.population[i].fitness, 0, maxFitness, 0, 1);
      let n = floor(fitness * 100);
      for (let j = 0; j < n; j++) {
        this.matingPool.push(this.population[i]);
      }
    }
  }

  generate() {
    for (let i = 0; i < this.population.length; i++) {
      let a = floor(random(this.matingPool.length));
      let b = floor(random(this.matingPool.length));
      let partnerA = this.matingPool[a];
      let partnerB = this.matingPool[b];
      let child = partnerA.crossover(partnerB);
      child.mutate(this.mutationRate);
      this.population[i] = child;
    }
    this.generations++;
  }

  evaluate() {
    let worldrecord = 0.0;
    let index = 0;
    for (let i = 0; i < this.population.length; i++) {
      if (this.population[i].fitness > worldrecord) {
        index = i;
        worldrecord = this.population[i].fitness;
      }
    }

    this.best = this.population[index].genes.join("");

    if (worldrecord === this.perfectScore) 
        this.finished = true;
  }

  getAverageFitness() {
    let total = 0;
    for (let i = 0; i < this.population.length; i++) {
      total += this.population[i].fitness;
    }
    return total / this.population.length;
  }

  allPhrases() {
    let everything = "";

    let displayLimit = min(this.population.length, 50);

    for (let i = 0; i < displayLimit; i++) {
      everything += this.population[i].genes.join("") + "<br>";
    }
    return everything;
  }
}
