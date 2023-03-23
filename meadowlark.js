const express = require('express')
const expressHandlebars = require('express-handlebars')

const app = express()

const port = process.env.PORT || 3000

// configure Handlebar's viwe engine
app.engine('handlebars', expressHandlebars.engine({
    defaultLayout: 'main'
}))
app.set('view engine', 'handlebars')

// static middleware
app.use(express.static(__dirname + '/public'))


/* ROUTES
 * order of the routes matter! */
app.get('/', (req, res) => {
    
    res.render('home')
})

app.get('/about', (req, res) => {
    const fortunes = [
        "Conquer your fears or they will conquer you.",
        "Rivers need springs.",
        "Do not fear what you don't know.",
        "You will have a pleasant surprise.",
        "Whenever possible, keep it simple.",
        "Perfect practice makes perfect",
        "Practice makes permanent"
       ]
       const randomFortune = fortunes[Math.floor(Math.random()*fortunes.length)]       

    res.render('about', { fortune: randomFortune })
})

/* Middleware
 * express uses app.use() for middleware */

// custom 404 page
app.use((req, res) => {
    
    res.status(400)
    res.render('404')
})

// custom 500 page
app.use((err, req, res, next) => {
    
    console.error(err.message)
    res.status(500)
    res.render('500')
})

app.listen(port, () => console.log(
    `Express started on http://localhost:${port}; ` +
    `press Ctrl-C to terminate.`))