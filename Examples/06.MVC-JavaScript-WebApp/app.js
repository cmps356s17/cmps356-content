let express		 =	require('express')
let bodyParser   = 	require('body-parser')
let cookieParser = 	require('cookie-parser')
let handlebars   =  require('express-handlebars')

let app			 =	express()

//Allow serving static files from __dirname which is the current folder
app.use( express.static(__dirname) )

/*
 body-parser extracts the entire body portion of an incoming request and assigns it to req.body.
 Parses the body text as URL encoded data (which is how browsers send form data from forms with method set to POST)
 and exposes the resulting object (containing the keys and values) on req.body.
 */
app.use( bodyParser.urlencoded({extended: true}) )
//If the body of incoming request is a json object then assign it to req.body property
app.use( bodyParser.json() )
app.use( cookieParser() )

// Bind Handlebars View Engine to html extension so express knows what extension to look for.
//set extension to .html so handlebars knows what to look for
app.engine('hbs', handlebars({defaultLayout: 'layout', extname: '.hbs'}))

// Register handlebars as our view engine as the view engine
app.set('view engine', 'hbs')

//Set the location of the view templates
app.set('views', __dirname + '/views')

//Mount the routes to the app
let routes = require('./routes')
app.use('/', routes)

let port = 9080
app.listen(port, () => {
    let host = "localhost"
    console.log(`Students App is running @ http://${host}:${port}`)
})