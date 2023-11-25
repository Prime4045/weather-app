const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q="

const apiKey = "e761f7a816a65f83a392caa0b99c3a24"

const aqiApiUrl = "https://api.weatherbit.io/v2.0/current/airquality?"

const aqiApiKey = "225b77d803af44a2a7693c173a339f78"

const searchBox = document.querySelector('.search input')
const searchBtn = document.querySelector('.search button')
const weatherIcon = document.querySelector('.weather_icon')

async function airQualityCheck(city){
    const aqi = await fetch(aqiApiUrl + `&city=${city}` + `&key=${aqiApiKey}`)
    let aqiData = await aqi.json()
    console.log(aqiData);

    document.querySelector('.aqi').innerHTML = `AQI  `+ aqiData.data[0].aqi 
}

async function weatherService(city){
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`)

    if(response.status == 404){
        document.querySelector('.error').style.display = 'block'
        document.querySelector('.weather').style.display = 'none'
    }else{
        let data = await response.json()

    document.querySelector('.city').innerHTML = data.name
    document.querySelector('.temp').innerHTML = Math.floor(data.main.temp) + `°c`
    document.querySelector('.humidity').innerHTML = data.main.humidity + '%'
    document.querySelector('.wind').innerHTML = data.wind.speed + ' km/h'

    if(data.weather[0].main == "Clouds"){
        weatherIcon.src = 'Images/cloudy.png'
    }else if(data.weather[0].main == "Clear"){
        weatherIcon.src = "Images/sun.png"
    }else if(data.weather[0].main == "Rain"){
        weatherIcon.src = "Images/Rain.png"
    }else if(data.weather[0].main == "Thunderstorm"){
        weatherIcon.src = "Images/storm.png"
    }else if(data.weather[0].main == "Snow"){
        weatherIcon.src = "Images/snow.png"
    }else if(data.weather[0].main == "Smoke"){
        weatherIcon.src = "Images/smoke.png"
    }else if(data.weather[0].main == "Drizzle"){
        weatherIcon.src = "Images/drizzle.png"
    }else{
        weatherIcon.src = "Images/sun.png"
    }
    document.querySelector('.weather').style.display = "block"
    document.querySelector('.error').style.display = 'none'
    }

}


searchBtn.addEventListener('click', function(){
    weatherService(searchBox.value)
    airQualityCheck(searchBox.value)
})


