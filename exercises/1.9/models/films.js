const path = require('node:path');
const { parse, serialize } = require('../utils/json');

const jsonDbPath = path.join(__dirname, '/../data/filmsn.json');

const FILMS = [
  {
    id: 1,
    title: 'La belle et la bête',
    duration: 120,
    budget: 3,
    link: 'https://fr.wikipedia.org/wiki/La_Belle_et_la_B%C3%AAte',
  },
  {
    id: 2,
    title: 'Madagascar',
    duration: 100,
    budget: 2,
    link: 'https://fr.wikipedia.org/wiki/Madagascar_(film)',
  },
  {
    id: 3,
    title: 'Le Roi Lion',
    duration: 140,
    budget: 5,
    link: 'https://fr.wikipedia.org/wiki/Le_Roi_lion_(film,_1994)',
  },
];

function readAllMovies(minimumDuration) {
  const movies = parse(jsonDbPath, FILMS).sort((a, b) => a.id - b.id);
  let sortedMovies;
  if (minimumDuration)
    sortedMovies = [...movies].filter((movie) => movie.duration >= minimumDuration);

  return minimumDuration === undefined ? movies : sortedMovies;
}

function readOneMovie(id) {
  const idNumber = parseInt(id, 10);
  const movies = parse(jsonDbPath, FILMS);
  const indexOfMovie = movies.findIndex((movie) => movie.id === idNumber);
  if (indexOfMovie < 0) return undefined;

  return movies[indexOfMovie];
}

function findBiggestId(tab) {
  let id = 1;
  for(let i = 0 ; i < tab.length ; i=+1){
    if(tab[i] > i) id = tab[i];
  }
  return id;
}

function addOneMovie(movie) {
  const movies = parse(jsonDbPath, FILMS);
  if(!movie.title || !movie.duration || !movie.budget || !movie.link || movie.budget < 1 || movie.duration < 1) return undefined;
  const copyOfMovie = movie;
  copyOfMovie.id = findBiggestId(movies);
  movies.push(copyOfMovie);
  serialize(jsonDbPath, FILMS);
  return copyOfMovie;
}

function removeOneMovie(id) {
  const idNumber = Number(id);
  const movies = parse(jsonDbPath, FILMS);
  const indexOfMovie = movies.findIndex(movie => movie.id === idNumber);
  if(!indexOfMovie) return undefined;
  const deletedMovie = movies.splice(indexOfMovie, 1);
  serialize(jsonDbPath, FILMS);
  return deletedMovie;
}

module.exports = {
  readAllMovies,
  readOneMovie,
  addOneMovie,
  removeOneMovie
};
