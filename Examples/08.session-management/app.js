'use strict'
let express		 =	require('express');
let session		 =	require('express-session');
let bodyParser   = 	require('body-parser');
let cookieParser = 	require('cookie-parser');

let handlebars   =  require('express-handlebars');
let app			 =	express();

/* Configure handlebars:
 set extension to .hbs so handlebars knows what to look for
 set the defaultLayout to 'main' so that all partial templates will be rendered and inserted in the main's {{{body}}}
 the main.hbs defines define page elements such as the menu and imports all the common css and javascript files
 */
app.engine( 'hbs', handlebars( {defaultLayout: 'main', extname: '.hbs'} ) )

// Register handlebars as the view engine to be used to render the templates
app.set('view engine', 'hbs')

//Set the location of the view templates
app.set('views', __dirname + '/views')

//Allow serving static files
app.use(express.static(__dirname));

//Resave: Forces the session to be saved back to the session store, even if the session was never modified during the request.
//saveUninitialized: Forces a session that is "uninitialized" to be saved to the store. A session is uninitialized when it is new but not modified.
app.use(session({
    cookie: {
        path    : '/',
        maxAge  : 24*60*60*1000
    },
    secret: 'mysecret'
    , saveUninitialized: true, resave: true
}));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

let appController = require('./AppController');

//Middleware to intercept requests and redirect to the login page if the user is not logged-in
//app.use( (req, res, next) => {
function isAuthenticated(req, res, next) {
    if (!req.session.user) {
        console.log('User not logged-in', req.session.user);
        res.render('login');
    } else {
        //Allows accessing Express.js session from handlebars template
        res.locals.session = req.session;
        return next();
    }
}

app.get('/', isAuthenticated, (req,res) => res.redirect('/home'));

app.post('/login', (req, res) => appController.login(req, res));

app.get('/home', isAuthenticated, (req,res) => res.render('home'));

app.get('/hala', isAuthenticated, (req, res) => appController.hala(req, res));

app.get('/shop', isAuthenticated, (req, res) => {
    res.render('shop', {shoppingCart: req.session.shoppingCart});
});

app.post('/shop', isAuthenticated, (req, res) => appController.addItemToCart(req, res));

app.get('/logout', (req, res) => appController.logout(req, res));

let port = 3000;
app.listen(port, () => {
	console.log('App running @ http://localhost:' + port);
});