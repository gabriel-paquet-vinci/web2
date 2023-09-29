var express = require('express');
var router = express.Router();

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
  
  res.json(duree === undefined ? FILMS : [...FILMS].filter(film => film.duration >= duree));
});

router.get('/:id', (req, res, next) => {
  const filmIndex = FILMS.findIndex((film) => film.id == req.params.id);

  if(!filmIndex) return res.sendStatus(400);

  res.json(FILMS[filmIndex]);
});

router.post('/', (req, res, next) => {
  const newFilm = {id : FILMS.length + 1, title : req.body.title, duration : req.body.duration, budget : req.body.budget, link : req.body.link};

  if(newFilm.duration > 0 && newFilm.budget > 0) FILMS.push(newFilm);
  else return res.sendStatus(400);
  
  res.redirect('/');
});

router.delete('/:id',(req, res, next) => {
  const  filmId = req?.params?.id? req.params.id : undefined;

  if(filmId === undefined) return res.sendStatus(404);
  
  for(let i = 0 ; i < FILMS.length ; i++){
    if(FILMS[i].id == filmId) FILMS.splice(i, 1);
  }

  res.redirect('/');
});

router.patch('/:id', (req, res, next) => {
  const title = req?.body?.title;
  const duration = req?.body?.duration;
  const budget = req?.body?.budget;
  const link = req?.body?.link;
  const id = req.params.id;

  if((!title && !duration && !budget && !link) || title?.length === 0 || duration <= 0 || budget <= 0 || link?.length === 0) return res.sendStatus(400);

  const updatedMovie = {...FILMS[id-1], ...req.body};

  FILMS[id-1] = updatedMovie;

  res.json(updatedMovie);
});

router.put('/:id', (req, res, next) => {
  const film = {id: parseInt(req.params.id), title: req?.body?.title, duration: req?.body?.duration, budget: req?.body?.budget, link: req?.body?.link};

  if(!film.id || !film.title || !film.duration || !film.budget || !film.link || film.id < 1  || film.title.length === 0 || film.link.length === 0 || film.duration < 1 || film.budget < 1) res.sendStatus(400);
  
  for(let i = 0 ; i < FILMS.length ; i++){
    if(FILMS[i].id == film.id){
      FILMS[i] = film;
      return res.json(film);
    }
  }

  FILMS.push(film);
  res.json(film);
});

module.exports = router;