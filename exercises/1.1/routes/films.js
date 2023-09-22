var express = require('express');
var router = express.Router();

const FILMS = [
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
  
  /* GET home page. */
  router.get('/', (req, res, next) => {
    console.log('Affichage films');
    res.json(FILMS);
  });
  
module.exports = router;