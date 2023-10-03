var express = require('express');
const { serialize, parse } = require('../utils/json');
var router = express.Router();

const jsonDbPath = __dirname + '/../data/films.json';

let FILMS = [
  {
    id:1,
    title:"La belle et la bête",
    duration:120,
    budget:3,
    link:"https://fr.wikipedia.org/wiki/La_Belle_et_la_B%C3%AAte",
  },
  {
    id:2,
    title:"Madagascar",
    duration:100,
    budget:2,
    link:"https://fr.wikipedia.org/wiki/Madagascar_(film)",
  },
  {
    id:3,
    title:"Le Roi Lion",
    duration:140,
    budget:5,
    link:"https://fr.wikipedia.org/wiki/Le_Roi_lion_(film,_1994)",
  },
];


router.get('/', (req, res, next) => {
  const duree = req?.query?.['minimum-duration']? req.query['minimum-duration'] : undefined;

  const movies = parse(jsonDbPath, FILMS);
  
  res.json(duree === undefined ? movies : [...movies].filter(movie => movie.duration >= duree));
});

router.get('/:id', (req, res, next) => {

  const movies = parse(jsonDbPath, FILMS);

  const filmIndex = movies.findIndex((film) => film.id == req.params.id);

  if(!filmIndex) return res.sendStatus(400);

  res.json(movies[filmIndex]);
});

router.post('/', (req, res, next) => {

  const movies = parse(jsonDbPath, FILMS);

  const newFilm = {id : 0, title : req.body.title, duration : req.body.duration, budget : req.body.budget, link : req.body.link};
  let id = 0;
  for(let i = 0 ; i < movies.length ; i++){
    if(movies[i].id > id) id = movies[i].id;
  }

  newFilm.id = id;
  if(newFilm.duration > 0 && newFilm.budget > 0) {
    movies.push(newFilm);
    serialize(jsonDbPath, movies);
  }
  else return res.sendStatus(400);
  
  res.redirect('/');
});

router.delete('/:id',(req, res, next) => {

  const movies = parse(jsonDbPath, FILMS);
  
  const  filmId = req?.params?.id? req.params.id : undefined;

  if(filmId === undefined) return res.sendStatus(404);
  
  for(let i = 0 ; i < FILMS.length ; i++){
    if(movies[i].id == filmId) movies.splice(i, 1);
  }

  serialize(jsonDbPath, movies);

  res.redirect('/');
});

router.patch('/:id', (req, res, next) => {

  const movies = parse(jsonDbPath, FILMS);

  const title = req?.body?.title;
  const duration = req?.body?.duration;
  const budget = req?.body?.budget;
  const link = req?.body?.link;
  const id = req.params.id;

  if((!title && !duration && !budget && !link) || title?.length === 0 || duration <= 0 || budget <= 0 || link?.length === 0) return res.sendStatus(400);

  const updatedMovie = {...movies[id-1], ...req.body};

  movies[id-1] = updatedMovie;

  serialize(jsonDbPath, movies);

  res.json(updatedMovie);
});

router.put('/:id', (req, res, next) => {

  const movies = parse(jsonDbPath, FILMS);

  const film = {id: parseInt(req.params.id), title: req?.body?.title, duration: req?.body?.duration, budget: req?.body?.budget, link: req?.body?.link};

  if(!film.id || !film.title || !film.duration || !film.budget || !film.link || film.id < 1  || film.title.length === 0 || film.link.length === 0 || film.duration < 1 || film.budget < 1) res.sendStatus(400);
  
  for(let i = 0 ; i < FILMS.length ; i++){
    if(movies[i].id == film.id){
      movies[i] = film;
      return res.json(film);
    }
  }

  movies.push(film);
  serialize(jsonDbPath, movies);
  res.json(film);
});

module.exports = router;