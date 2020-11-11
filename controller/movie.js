const axios = require('axios');
const AppError = require('../utils/AppError.js');


module.exports.searchMovies = async (req,res,next) => {
	try{
		if(req.query.title) {
			const title = req.query.title;
			await axios.get(`http://www.omdbapi.com/?apikey=${process.env.api_key}&s=${title}`)
			.then(movies => {
				if(movies.data.Search){
					res.render('index', {result:movies.data.Search, title: title});
				}
				else {
					next(new AppError('Search not found...', 404));
				}
			})
		}
		else res.render('index', {result: null});
	} catch {
		next(new AppError());
	}
}

module.exports.handleSearch = (req,res) => {
	res.redirect(`/movie/?title=${req.body.title}`);
}

module.exports.showMovie = (req,res) => {
	axios.get(`http://www.omdbapi.com/?apikey=${process.env.api_key}&i=${req.params.imdbID}`)
	.then(movie => {
		res.render('show',{movieData: movie.data});
	})
}