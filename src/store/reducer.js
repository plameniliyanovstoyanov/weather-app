import ActionTypes from './actionTypes';

const initialState = {
  currentWeather: null,
  forecast: null,
};

const weatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_CURRENT_WEATHER:
      return {
        ...state,
        currentWeather: action.payload,
      };
    case ActionTypes.GET_FORECAST_WEATHER:
      return {
        ...state,
        forecast: action.payload,
      };
    default:
      return state;
  }
};

export default weatherReducer;