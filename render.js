export function renderPopulation(population, container) {
  const populationFragment = document.createDocumentFragment();
  
  for (let i = 0; i < population.length; i++) {
    const stringEntry = population[i];
    const paragraphEl = document.createElement("p");

    for (let j = 0; j < stringEntry.string.length; j++) {
      const characterEntry = stringEntry.string[j];
      const characterEl = document.createElement("span");
      characterEl.innerText = characterEntry.character;
      characterEl.style.backgroundColor = characterEntry.bgc;
      characterEl.style.color = characterEntry.color;

      paragraphEl.appendChild(characterEl);
    }

    if (typeof stringEntry.fitness === "number") {
      const fitnessEl = document.createElement("span");
      fitnessEl.innerText = ` (${stringEntry.fitness})`
      paragraphEl.appendChild(fitnessEl);
    }

    populationFragment.appendChild(paragraphEl)
  }

  container.appendChild(populationFragment);
}