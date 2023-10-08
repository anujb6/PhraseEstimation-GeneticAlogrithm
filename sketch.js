let targetPhrase;
let populationSize;
let mutationRate;
let population;

let bestPhrase;
let allPhrases;
let stats;

function setup() {
  bestPhrase = createP("Best phrase:");
  bestPhrase.class("best");

  allPhrases = createP("All phrases:");
  allPhrases.position(600, 10);
  allPhrases.class("all");

  stats = createP("Stats");
  stats.class("stats");

  targetPhrase = "To be or not to be.";
  populationSize = 200;
  mutationRate = 0.01;

  population = new Population(targetPhrase, mutationRate, populationSize);
}

function changePhrase(){
  var input = document.getElementById("target").value;
  targetPhrase = input;
  population = new Population(targetPhrase, mutationRate, populationSize);
  loop();
}

function draw() {
  population.naturalSelection();
  population.generate();
  population.calculateFitness();
  population.evaluate();

  if (population.finished) 
    noLoop();

  displayInfo();
}

function displayInfo() {
  let answer = population.best;

  bestPhrase.html("Best phrase:<br>" + answer);

  let statstext =
    "total generations:     " + population.generations + "<br>";
  statstext +=
    "average fitness:       " + nf(population.getAverageFitness()) + "<br>";
  statstext += "total population:      " + populationSize + "<br>";
  statstext += "mutation rate:         " + floor(mutationRate * 100) + "%";

  stats.html(statstext);

  allPhrases.html("All phrases:<br>" + population.allPhrases());
}
