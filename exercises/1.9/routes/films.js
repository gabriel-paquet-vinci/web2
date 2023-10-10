const express = require('express');
const {
  readAllMovies,
  readOneMovie,
  addOneMovie,
  removeOneMovie
} = require('../models/films');

const router = express.Router();

router.get('/', (req, res) => {
  const duree = req?.query?.['minimum-duration'] ? req.query['minimum-duration'] : undefined;

  const movies = readAllMovies(duree);

  return res.json(movies);
});

router.get('/:id', (req, res) => {
  const foundMovie = readOneMovie(req.params.id);

  if (!foundMovie) return res.sendStatus(404);

  return res.json(foundMovie);
});

router.post('/', (req, res) => {

  const newFilm = {
    id: 0,
    title: req.body.title,
    duration: req.body.duration,
    budget: req.body.budget,
    link: req.body.link,
  };

  const addedMovie = addOneMovie(newFilm);

  if(!addedMovie) return res.sendStatus(404);

  return res.json(addedMovie);
});

router.delete('/:id', (req, res) => {
  const deletedMovie = removeOneMovie(req.params.id);

  if(!deletedMovie) res.sendStatus(404);

  return res.redirect('/');
});

router.patch('/:id', (req, res) => {
  const movies = parse(jsonDbPath, FILMS);

  const title = req?.body?.title;
  const duration = req?.body?.duration;
  const budget = req?.body?.budget;
  const link = req?.body?.link;
  const id = Number(req.params.id);

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
    id: Number(req.params.id),
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
