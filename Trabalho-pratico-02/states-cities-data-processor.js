const StatesCitiesFileProcessor = require('./states-cities-file-processor');

const getTotalCitiesByState = (uf) => {
  return StatesCitiesFileProcessor.getStateCities(uf).length;
}

const getStatesWithTotalCities = () => {
  return StatesCitiesFileProcessor
    .getAllStates()
    .map(state => ({
      uf: state.Sigla,
      totalCities: getTotalCitiesByState(state.Sigla)
    }));
};

const printStatesWithMostCities = () => {
  const top5 = getStatesWithTotalCities()
    .sort((a, b) => b.totalCities - a.totalCities)
    .slice(0, 5)
    .map(data => `${data.uf} - ${data.totalCities}`);

  console.log(top5);
}

const printStatesWithLessCities = () => {
  const bottom5 = getStatesWithTotalCities()
    .sort((a, b) => a.totalCities - b.totalCities)
    .slice(0, 5)
    .map(data => `${data.uf} - ${data.totalCities}`);

  console.log(bottom5);
}

const getCityWithBiggestName = (uf) => {
  return StatesCitiesFileProcessor
    .getStateCities(uf)
    .sort((a, b) => a.Nome.localeCompare(b.Nome))
    .sort((a, b) => b.Nome.length - a.Nome.length)[0];
}

const getCityWithShortestName = (uf) => {
  return StatesCitiesFileProcessor
    .getStateCities(uf)
    .sort((a, b) => a.Nome.localeCompare(b.Nome))
    .sort((a, b) => a.Nome.length - b.Nome.length)[0];
}

const printBiggestNameCities = () => {
  const data = StatesCitiesFileProcessor
    .getAllStates()
    .map(state => ({
      uf    : state.Sigla,
      name  : getCityWithBiggestName(state.Sigla).Nome
    }))
    .map(city => `${city.name} - ${city.uf}`);

  console.log(data);
}

const printShortestNameCities = () => {
  const data = StatesCitiesFileProcessor
    .getAllStates()
    .map(state => ({
      uf    : state.Sigla,
      name  : getCityWithShortestName(state.Sigla).Nome
    }))
    .map(city => `${city.name} - ${city.uf}`);

  console.log(data);
}

const printBiggestNameCity = () => {
  const data = StatesCitiesFileProcessor
    .getAllStates()
    .map(state => ({
      uf    : state.Sigla,
      name  : getCityWithBiggestName(state.Sigla).Nome
    }))
    .sort((a, b) => a.name.localeCompare(b.name))
    .sort((a, b) => b.name.length - a.name.length);

  console.log(data[0]);
}

const printShortestNameCity = () => {
  const data = StatesCitiesFileProcessor
    .getAllStates()
    .map(state => ({
      uf    : state.Sigla,
      name  : getCityWithShortestName(state.Sigla).Nome
    }))
    .sort((a, b) => a.name.localeCompare(b.name))
    .sort((a, b) => a.name.length - b.name.length);

  console.log(data[0]);
}

module.exports = {
  generateFiles: StatesCitiesFileProcessor.generateAllCitiesByStateFiles,
  getTotalCitiesByState,
  printStatesWithMostCities,
  printStatesWithLessCities,
  printBiggestNameCities,
  printShortestNameCities,
  printBiggestNameCity,
  printShortestNameCity
};
