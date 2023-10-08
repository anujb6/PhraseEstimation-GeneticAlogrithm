function newChar() {
    let c = floor(random(63, 122));
    if (c === 63) c = 32;
    if (c === 64) c = 46;
  
    return String.fromCharCode(c);
  }
  
  class DNA {
    constructor(populationSize) {
      this.genes = [];
      this.fitness = 0;
      for (let i = 0; i < populationSize; i++) {
        this.genes[i] = newChar(); 
      }
    }
  
    calculateFitness(targetPhrase) {
      let score = 0;
      for (let i = 0; i < this.genes.length; i++) {
        if (this.genes[i] == targetPhrase.charAt(i)) 
          score++;
      }
      this.fitness = score / targetPhrase.length;
    }
  
    crossover(partner) {
      let child = new DNA(this.genes.length);  
      for (let i = 0; i < this.genes.length; i++) {
        if (i >  floor(random(this.genes.length)))
             child.genes[i] = this.genes[i];
        else 
            child.genes[i] = partner.genes[i];
      }
      return child;
    }
  
    mutate(mutationRate) {
      for (let i = 0; i < this.genes.length; i++) {
        if (random(1) < mutationRate) 
          this.genes[i] = newChar();
      }
    }
}
  