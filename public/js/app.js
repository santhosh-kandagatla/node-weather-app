console.log('On the web page!')

const search = document.querySelector('input')
const result = document.querySelector('#result')
const error = document.querySelector('#error')


document.querySelector('form').addEventListener('submit',(event) => {
    event.preventDefault()
    const location = search.value

    const url = 'http://localhost:3000/weather?address=' + location

    result.textContent = ''
    error.textContent = ''

    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                error.textContent = data.error
                console.log(data.error)
            } else {
                result.textContent = data.forecast
                console.log(data.address)
                console.log(data.forecast)
            }
        })
    })

})
