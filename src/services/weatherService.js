import { DateTime } from "luxon"

const API_KEY = '2d873cd53ee53b740c6f0ec8d3cf44eb'
const BASE_URL = "https://api.openweathermap.org/data/2.5"

// fetch current weather
const getWeatherData = (infoType, searchParams) => {
    const url = new URL(BASE_URL + "/" + infoType)
    url.search = new URLSearchParams({...searchParams, appid:API_KEY, units: searchParams.units})

    return fetch(url)
    .then((res) => res.json())
    .then((data) => data)
    .catch(error => {
      alert(error);
    });
}

// format data from endpoint
const formatCurrentWeather = (data) => {
    const {
        coord: {lon, lat},
        main: {temp,  feels_like, temp_min, temp_max, humidity},
        name,
        sys: {country, sunrise, sunset},
        weather,
        dt,
        wind: {speed}
    } = data

    const {main: description, icon} = weather[0]

    return {lat, lon, temp, feels_like, temp_min, temp_max, humidity, name, dt, country, sunrise, sunset, weather, description, icon, speed}
}

const formatForecastWeather = (data) => {
    const dailyForecasts = data.list.reduce((acc, item) => {
        const date = DateTime.fromSeconds(item.dt).toFormat('yyyy-MM-dd');
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(item);
        return acc;
    }, {});

    const dailyData = Object.keys(dailyForecasts).map(date => {
        const dayForecasts = dailyForecasts[date];
        const temps = dayForecasts.map(forecast => forecast.main.temp);
        const tempMax = Math.max(...temps);
        const tempMin = Math.min(...temps);
        const weatherOccurrences = dayForecasts.reduce((acc, curr) => {
            const weatherMain = curr.weather[0].main;
            if (!acc[weatherMain]) {
                acc[weatherMain] = { count: 0, icon: curr.weather[0].icon };
            }
            acc[weatherMain].count++;
            return acc;
        }, {});

        const mostCommonWeather = Object.keys(weatherOccurrences).reduce((acc, curr) => {
            if (!acc || weatherOccurrences[curr].count > weatherOccurrences[acc].count) {
                return curr;
            }
            return acc;
        }, null);

        return {
            day: DateTime.fromSeconds(dayForecasts[0].dt).toFormat('cccc'), // Display the day of the week
            tempMax,
            tempMin,
            weather: mostCommonWeather,
            icon: weatherOccurrences[mostCommonWeather].icon
        };
    });

    // Assuming we want only next 5 days forecast
    return dailyData.slice(1, 6);
}


const getForecastWeatherData = async (lat, lon) => {
    const url = new URL(`${BASE_URL}/forecast`);
    url.search = new URLSearchParams({lat, lon, units: 'metric', appid: API_KEY});

    return fetch(url)
        .then(res => res.json())
        .then(formatForecastWeather)
        .catch(error => console.error("Error fetching forecast data: ", error));
}


// return data
const getFormattedWeatherData = async (searchParams) => {
    const currentWeather = await getWeatherData('weather', searchParams)
        .then(formatCurrentWeather); // first get current weather

    const {lat, lon} = currentWeather; // save lat and lon

    const forecastWeather = await getForecastWeatherData(lat, lon); // use lat and lon to get forecast data

    return {currentWeather, forecastWeather};
}

// format
const formatToLocalTime = (secs, zone, format = "cccc, dd LLL y' | Local time: 'hh:mm a") => DateTime.fromSeconds(secs)
.setZone(zone).toFormat(format) 

// get icon
const weatherIcon = (code) => `http://openweathermap.org/img/wn/${code}@2x.png`

export default getFormattedWeatherData

export {formatToLocalTime, weatherIcon}
