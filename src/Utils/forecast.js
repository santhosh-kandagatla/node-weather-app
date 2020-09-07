const request = require('request')

//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const forecast = (latitude,longitude,callback) => {
    
    const url = 'http://api.weatherstack.com/current?access_key=b49b18af99fa22ee30774b9f286a7ebf&query=' + latitude + ',' + longitude + '&units=f'

    request({url, json: true}, (error,{body}) => {
    if (error) {
        callback('Unable to connect to Weather stack API!',undefined)
    } else if (body.error) {
        callback('unable to find location',undefined)
    } else {
        callback(undefined,{
            weather_description: body.current.weather_descriptions[0],
            temperature: body.current.temperature,
            feelslike: body.current.feelslike
        })
    }
    })
}

module.exports = forecast