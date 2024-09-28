import { colors } from "./constants.js";

export function getRandomCharacter() {
  const MIN_CODE = 32;
  const MAX_CODE = 126;

  const charCode = Math.floor(Math.random() * (MAX_CODE - MIN_CODE + 1)) + MIN_CODE;

  return String.fromCharCode(charCode);
}

export function sortGenerationByFitness(population) {
  population.sort((a, b) => b.fitness - a.fitness)
}

export function generateRandomCharacterEntry(color, bgc) {
  return {
    color,
    bgc,
    character: getRandomCharacter()
  };
}

export function generateRandomString(length, color, bgc) {
  return new Array(length).fill(null).map(() => generateRandomCharacterEntry(color, bgc));
}

export function stringArrayToNormalString(stringArray) {
  return stringArray.map(({ character }) => character).join("");
}

export function paintString(stringEntry, idx) {
  const { fitness, string } = stringEntry;

  return  {
    fitness,
    string: string.map(({ character }) => ({ character, bgc: colors[idx], color: "black" }))
  }
}