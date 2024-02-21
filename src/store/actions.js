import actions from './actionTypes';

export const getCurrentWeather = (data) => ({
  type: actions.GET_CURRENT_WEATHER,
  payload: data,
});

export const getForecastWeather = (data) => ({
  type: actions.GET_FORECAST_WEATHER,
  payload: data,
});

export const fetchWeather = (lat, lon) => {
  return async (dispatch) => {
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=2d873cd53ee53b740c6f0ec8d3cf44eb`;
    const response = await fetch(currentWeatherUrl);
    const data = await response.json();
    dispatch(getCurrentWeather(data));
  };
};

export const fetchForecast = (lat, lon) => {
  return async (dispatch) => {
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=2d873cd53ee53b740c6f0ec8d3cf44eb`;
    const response = await fetch(forecastUrl);
    const data = await response.json();
    dispatch(getForecastWeather(data));
  };
};