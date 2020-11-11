const express = require('express');
const bodyParser = require('body-parser');
const ejsMate = require('ejs-mate');
const ejs = require('ejs');
const movieRouter = require('./routes/movieRouter.js');
const app = express();

require('dotenv').config();

app.set('view engine','ejs');
app.engine('ejs',ejsMate);
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('./public'));

app.use('/', movieRouter);


app.use(function(err, req, res, next) {
	const {message = 'Something went wrong...', status='500'} = err;
	res.render('notFound',{message,status});
})

app.listen(3000,() => {
	console.log('Server listening or Port 3000');
})