const express = require('express');
const path = require('path');
const { serialize, parse } = require('../utils/json');

const router = express.Router();

const jsonDbPath = path.join(__dirname, '/../data/films.json') ;

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

router.get('/', (req, res) => {
  const duree = req?.query?.['minimum-duration'] ? req.query['minimum-duration'] : undefined;

  const movies = parse(jsonDbPath, FILMS).sort((a, b) => a.id - b.id);
  let sortedMovies;
  if (duree) sortedMovies = [...movies].filter((movie) => movie.duration >= duree);

  return res.json(duree === undefined ? movies : sortedMovies);
});

router.get('/:id', (req, res) => {
  const movies = parse(jsonDbPath, FILMS);

  const filmIndex = movies.findIndex((film) => film.id === req.params.id);

  if (!filmIndex) return res.sendStatus(400);

  return res.json(movies[filmIndex]);
});

router.post('/', (req, res) => {
  const movies = parse(jsonDbPath, FILMS);

  const newFilm = {
    id: 0,
    title: req.body.title,
    duration: req.body.duration,
    budget: req.body.budget,
    link: req.body.link,
  };
  let id = 0;
  for (let i = 0; i < movies.length; i += 1) {
    if (movies[i].id > id) id = movies[i].id;
  }

  newFilm.id = id + 1;
  if (newFilm.duration > 0 && newFilm.budget > 0) {
    movies.push(newFilm);
    serialize(jsonDbPath, movies);
  } else return res.sendStatus(400);

  return res.json(movies);
});

router.delete('/:id', (req, res) => {
  const movies = parse(jsonDbPath, FILMS);

  const filmId = req?.params?.id ? req.params.id : undefined;

  if (filmId === undefined) return res.sendStatus(404);

  for (let i = 0; i < movies.length; i += 1) {
    if (movies[i].id === filmId) movies.splice(i, 1);
  }

  serialize(jsonDbPath, movies);

  return res.redirect('/');
});

router.patch('/:id', (req, res) => {
  const movies = parse(jsonDbPath, FILMS);

  const title = req?.body?.title;
  const duration = req?.body?.duration;
  const budget = req?.body?.budget;
  const link = req?.body?.link;
  const { id } = req.params;

  if (
    (!title && !duration && !budget && !link) ||
    title?.length === 0 ||
    duration <= 0 ||
    budget <= 0 ||
    link?.length === 0
  )
    return res.sendStatus(400);

  const updatedMovie = { ...movies[id - 1], ...req.body };

  movies[id - 1] = updatedMovie;

  serialize(jsonDbPath, movies);

  return res.json(updatedMovie);
});

router.put('/:id', (req, res) => {
  const movies = parse(jsonDbPath, FILMS);

  const film = {
    id: parseInt(req.params.id, 10),
    title: req?.body?.title,
    duration: req?.body?.duration,
    budget: req?.body?.budget,
    link: req?.body?.link,
  };

  if (
    !film.id ||
    !film.title ||
    !film.duration ||
    !film.budget ||
    !film.link ||
    film.id < 1 ||
    film.title.length === 0 ||
    film.link.length === 0 ||
    film.duration < 1 ||
    film.budget < 1
  )
    res.sendStatus(400);

  for (let i = 0; i < FILMS.length; i += 1) {
    if (movies[i].id === film.id) {
      movies[i] = film;
      return res.json(film);
    }
  }

  movies.push(film);
  serialize(jsonDbPath, movies);
  return res.json(film);
});

module.exports = router;
