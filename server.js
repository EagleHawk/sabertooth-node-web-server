const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;

	console.log(log);
	fs.appendFile('server.log', log + '\n');
	next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});

app.get('/', (req, res) => {
	res.render('home.hbs', {
		pageTitle: 'Home Page',
		welcomeMessage: 'Welcome to my website'
	});
});

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: 'About Page'
	});
});

app.get('/contacts', (req, res) => {
	res.render('contacts.hbs', {
		cona: '022 424364190',
		conb: '022 424364191',
		conc: '022 424364192',
		cond: '022 424364193'
	}) ;
}) ;


// /bad - send back json with errorMessage
app.get('/bad', (req, res) => {
	res.send({
		errorMessage: 'Unable to handle request'
	});
});

app.listen(7000, () => {
	console.log('Server is up on port 7000');
});
