const express = require('express')
const bodyparser = require('body-parser')
const cookieparser = require('cookie-parser')
const handlebars = require('express-handlebars')
const apiroutes = require('./api-routes')
const uiroutes = require('./ui-routes')

const port = 7000
const hostname = 'localhost'

const app = express()
app.use(express.static(__dirname))

app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())
app.use(cookieparser())
app.use('/api/', apiroutes)
app.use('/', uiroutes)

app.engine('hbs',handlebars({defaultLayout:'layout',extname:'.hbs'}))
app.set('view engine','hbs')
app.set('views' , __dirname+'/views')

app.listen(port, () => {
    console.log(`App is running @ http://${hostname}:${port}`)
})
