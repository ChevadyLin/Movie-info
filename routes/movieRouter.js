const express = require('express');
const router = express.Router();
const movies = require('../controller/movie.js');


router.get('/', (req,res) => {
		res.render('landing');
});

router.get('/movie', movies.searchMovies)

router.post('/movie', movies.handleSearch);

router.get('/movie/:imdbID', movies.showMovie)

module.exports = router;