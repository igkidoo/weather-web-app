const apiKey = "09a3e53dc097c92db9e088be8ebe6267";
//const apiUrl = "https://api.openweathermap.org/data/3.0/onecall?timezone=";
//const apiUrl = 'https://api.openweathermap.org/data/2.5/forecast/daily?q=';
const apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?units=metric&q=';
const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weather-icon');
const weatherIconNext = document.querySelectorAll('.weather-icon-next');

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + '&exclude=daily' + `&appid=${apiKey}`)
        .then();
    let data = await response.json();
    console.log(data);
    document.querySelector('.city').innerHTML = data.city.name;
    document.querySelector('.temp').innerHTML = Math.round(data.list[0].main.temp) + '°C';
    document.querySelector('.humidity').innerHTML = data.list[0].main.humidity + '%';
    document.querySelector('.wind').innerHTML = data.list[0].wind.speed + 'km/h';

    if (data.list[0].weather[0].main === 'Clouds') {
        weatherIcon.src = './weatherimg/cloudy.png';
    } else if (data.list[0].weather[0].main === 'Clear') {
        weatherIcon.src = './weatherimg/sun.png';
    } else if (data.list[0].weather[0].main === 'Rain') {
        weatherIcon.src = './weatherimg/rain.png';
    } else if (data.list[0].weather[0].main === 'Drizzle') {
        weatherIcon.src = './weatherimg/sun-rain.png';
    }
    document.querySelector('.weather').style.display = 'block';
    //checkWeather_next(data);
}

async function checkWeather_next(city) {
    fetch(apiUrl + city + '&exclude=daily' + `&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < 5; i++) {

                if (data.list[i].weather[0].main === 'Clouds') {
                    weatherIconNext[i].src = './weatherimg/cloudy.png';
                } else if (data.list[i].weather[0].main === 'Clear') {
                    weatherIconNext[i].src = './weatherimg/sun.png';
                } else if (data.list[i].weather[0].main === 'Rain') {
                    weatherIconNext[i].src = './weatherimg/rain.png';
                } else if (data.list[i].weather[0].main === 'Drizzle') {
                    weatherIconNext[i].src = './weatherimg/sun-rain.png';
                }

                let date = new Date(Date.parse(data.list[i].dt_txt));
                document.querySelectorAll('.temperature_to')[i].innerHTML = Math.round(data.list[i].main.temp_max) + '°C';
                document.querySelectorAll('.temperature_from')[i].innerHTML = Math.round(data.list[i].main.temp_min) + '°C';
                document.querySelectorAll('.weather_day')[i].innerHTML = date.getHours()+":00";


            }document.querySelector('.weather-hours').style.display = 'block';
        })
    .catch(err => alert('error'));
}


searchBox.addEventListener('keyup', event => {
    if (event.code === 'Enter') {
        checkWeather(searchBox.value);
        checkWeather_next(searchBox.value);
    } else {
        searchBtn.addEventListener('click', () => {
            checkWeather(searchBox.value);
            checkWeather_next(searchBox.value);
        });
    }
})
