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
  let filmDuree = [];
  if(duree === undefined) {
    filmDuree = [...FILMS];
  } else {
    for (let i = 0 ; i < FILMS.length ; i++) {
      if(FILMS[i].duration >= duree) {
        filmDuree.push(FILMS[i]);
      }
    }
  }
  res.json(filmDuree);
});

router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  let movie = {};
  for (let i = 0 ; i < FILMS.length ; i++) {
    if (FILMS[i].id == id) {
      movie = FILMS[i];
    }
  }
  res.json(movie);
});

router.post('/', (req, res, next) => {
  const newFilm = {id : FILMS.length + 1, title : req.body.title, duration : req.body.duration, budget : req.body.budget, link : req.body.link};
  if(newFilm.duration > 0 && newFilm.budget > 0) {
    FILMS.push(newFilm);
  }
  res.redirect('/');
});

module.exports = router;