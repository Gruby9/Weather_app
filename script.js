const docName = document.querySelector('.name')
const docTemp = document.querySelector('.temp')
const docPressure = document.querySelector('.pressure')
const docNowWeather = document.querySelector('.nowWeather')
const docNowWind = document.querySelector('.nowWind')

async function getCurrentWeather() {
    const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=Warsaw&units=metric&APPID=b33ebf0c5926241e76d3ffb2dd70a49d',
    {mode: 'cors'})
    const currentWeather = await response.json()
    return currentWeather
}

async function getForecast() {
    try {
        const response = await fetch('https://api.openweathermap.org/data/2.5/forecast?lat=52.2298&lon=21.0118&units=metric&appid=b33ebf0c5926241e76d3ffb2dd70a49d',
        {mode: 'cors'})
        const forecast = await response.json()
        return forecast
    } catch {
        console.log('error forecast')
    }
}

async function filterCurrentWeather() {
    const weather = await getCurrentWeather();
    const name = weather.name
    const temp = weather.main.temp
    const pressure = weather.main.pressure
    const nowWeather = weather.weather[0].description
    const nowWind = weather.wind.speed * 3.6
    return { name, temp, pressure, nowWeather, nowWind }
}


async function filterForecast() {
    const forecast = await getForecast()
    const array = []
    for (let i = 0; i < 16; i++) {
        const next3h = {
            time: forecast.list[i].dt_txt,
            temp: forecast.list[i].main.temp,
            weather: forecast.list[i].weather[0].description,
            wind: forecast.list[i].wind.speed * 3.6
        }
        array.push(next3h)
    }
    // console.log(array)
    return array
}
filterForecast().then(function full(response) {
    return response
})



async function DOM() {
    docName.innerHTML = (await filterCurrentWeather()).name
    docTemp.innerHTML = (await filterCurrentWeather()).temp
    docPressure.innerHTML = (await filterCurrentWeather()).pressure
    docNowWeather.innerHTML = (await filterCurrentWeather()).nowWeather
    docNowWind.innerHTML = (await filterCurrentWeather()).nowWind

    const array = (await filterForecast())

    for (let i = 0; i < 16; i++) {
        const p = document.getElementById(`${i+1}`)
        const ftime = document.createElement('p')
        const ftemp = document.createElement('p')
        const fweather = document.createElement('p')
        const fwind = document.createElement('p')

        ftime.innerHTML = array[i].time
        ftemp.innerHTML = array[i].temp
        fweather.innerHTML = array[i].weather
        fwind.innerHTML = array[i].wind

        p.appendChild(ftime)
         .appendChild(ftemp)
         .appendChild(fweather)
         .appendChild(fwind)
    }
}

getCurrentWeather()
getForecast()
filterCurrentWeather()
filterForecast()
DOM()
console.log(filterForecast())