import { sortGenerationByFitness, generateRandomString, stringArrayToNormalString, paintString, generateRandomCharacterEntry } from "./helpers.js";
import { renderPopulation } from "./render.js";

const buttonsContainer = document.getElementById("buttons-container");
const finishedText = document.getElementById("finished-text");
const generateInitialPopulationBtn = document.getElementById("generate-initial");
const pruneCurrentGenerationBtn = document.getElementById("prune-current-generation-btn");
const breedBtn = document.getElementById("breed-btn");

const targetStringInput = document.getElementById("target-string-input");
const populationSizeInput = document.getElementById("population-size-input");
const mutationInput = document.getElementById("mutation-input");
const keepInput = document.getElementById("keep-input");

const currentGenerationContainer = document.getElementById("current-generation");
const previousGenerationContainer = document.getElementById("previous-generation");
const currentGenerationNumberEl = document.getElementById("current-generation-number");
const previousGenerationNumberEl = document.getElementById("previous-generation-number");

generateInitialPopulationBtn.addEventListener("click", generateInitialPopulation);
pruneCurrentGenerationBtn.addEventListener("click", pruneCurrentPolulation);
breedBtn.addEventListener("click", breed);

let currentGeneration = [];
let previousGeneration = [];
let generationNumber = 1;
let isSolutionFound = false;

function generateInitialPopulation() {
  if (!targetStringInput.value) return;
  
  const populationSize = parseInt(populationSizeInput.value) || 0;
  const stringLength = targetStringInput.value.length;
  
  while (currentGeneration.length < populationSize) {
    const string = generateRandomString(stringLength, "black", "white");

    currentGeneration.push({
      string,
      fitness: calculateFitness(string)
    })
  }

  sortGenerationByFitness(currentGeneration);

  render();
  start();
}

function calculateFitness(candidateStringArray) {
  let fitness = 0;
  const targetString = targetStringInput.value;
  const candidateString = stringArrayToNormalString(candidateStringArray);

  for (let i = 0; i < candidateString.length; i++) {
    if (candidateString[i] === targetString[i]) fitness++;
  }

  return fitness;
}

function pruneCurrentPolulation() {
  if (!currentGeneration.length) return;

  const numberToKeep = parseInt(keepInput.value);

  previousGeneration = currentGeneration.slice(0, numberToKeep).map(paintString);

  currentGeneration = [];
  generationNumber++;

  render();
}

function breed() {
  if (currentGeneration.length) return;

  const mutationCoefficient = parseInt(mutationInput.value) / 100;
  const populationSize = parseInt(populationSizeInput.value);
  const stringLength = targetStringInput.value.length;

  while (currentGeneration.length < populationSize) {
    const stringArray = [];

    while (stringArray.length < stringLength) {
      const isMutation = Math.random() < mutationCoefficient;

      let character;

      if (isMutation) {
        character = generateRandomCharacterEntry("white", "black");
      } else {
        const randomStringIdx = Math.floor(Math.random() * previousGeneration.length);
        const currentCharacterIdx = stringArray.length;

        character = previousGeneration[randomStringIdx].string[currentCharacterIdx];
      }

      stringArray.push(character);
    }

    currentGeneration.push({
      string: stringArray,
      fitness: calculateFitness(stringArray)
    })
  }

  sortGenerationByFitness(currentGeneration);
  checkSolution();

  render();
}

function checkSolution() {
  const targetString = targetStringInput.value;

  isSolutionFound = currentGeneration.slice(0, parseInt(keepInput.value)).some(({ string: stringArray }) => (
    stringArrayToNormalString(stringArray) === targetString
  ));
}

function render() {
  currentGenerationContainer.innerHTML = previousGenerationContainer.innerHTML = "";
  
  renderPopulation(currentGeneration, currentGenerationContainer);
  renderPopulation(previousGeneration, previousGenerationContainer);

  currentGenerationNumberEl.innerText = generationNumber;
  previousGenerationNumberEl.innerText = generationNumber - 1;

  if (isSolutionFound) finish();
}

function start() {
  targetStringInput.disabled = true;
  
  generateInitialPopulationBtn.classList.add("hidden");
  pruneCurrentGenerationBtn.classList.remove("hidden");
  breedBtn.classList.remove("hidden");
}

function finish() {
  populationSizeInput.disabled = true;
  mutationInput.disabled = true;
  keepInput.disabled = true;

  buttonsContainer.classList.add("hidden");
  finishedText.classList.remove("hidden");
}
