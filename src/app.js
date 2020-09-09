const express = require('express')
const path = require('path') 
const hbs = require('hbs')
const geocode = require('./Utils/goecode.js')
const forecast = require('./Utils/forecast.js')

const app = express()
const port = process.env.PORT || 3000

//Define paths for express configration
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//setup handle bars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(path.join(publicDirectoryPath)))

app.get('',(req,res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Santhosh'
    })
})

app.get('/about',(req,res) => {
    res.render('about', {
        title: 'About',
        name: 'Santhosh'
    })
})

app.get('/help',(req,res) => {
    res.render('help', {
        title: 'Help',
        name: 'Santhosh'
    })
})


app.get('/weather',(req,res) => {

    if (!req.query.address) {
        return res.send({
            error: 'You most provide an address'
        })
    }

    geocode(req.query.address, (error,{latitude,longitude,location} = {}) => {
        if (error) {
            return res.send({
                error
            })
        }

        forecast(latitude,longitude,(error,{weather_description,temperature,feelslike} = {}) => {
            if (error) {
                return res.send({
                    error
                })
            }

            res.send({
                forecast: weather_description,
                address: req.query.address,
                temperature: temperature,
                feelslike: feelslike
            })
        })
    })

}) 

app.get('/products',(req,res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        }) 
    } 

    res.send({
        products: []
        })
    
})

app.get('/help/*',(req,res) => {
    res.render('pageNotFound', {
        title: 'Requested Help Page Not Found!',
        name: 'Santhosh'
    } )
})

app.get('*',(req,res) => {
    res.render('pageNotFound', {
        title: 'Page Not Found!',
        name: 'Santhosh'
    } )
})

app.listen(port, () => {
    console.log('Server is up in port' + port)
})