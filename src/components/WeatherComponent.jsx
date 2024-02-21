import React, { useEffect, useState } from 'react';
import Input from './Input';
import Temperature from './Temperature';
import DateTimeLocation from './DateTimeLocation';
import Forecast from './Forecast';
import getFormattedWeatherData from '../services/weatherService';
import Favorites from '../components/Favorites'
import ErrorMessage from './ErrorMessage';

const WeatherComponent = () => {
  const [query, setQuery] = useState({q: 'sofia'}); // this can be changed to get geo location in the future
  const [units, setUnits] = useState('metric');
  const [weather, setWeather] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(false); 

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const data = await getFormattedWeatherData({...query, units});
        setWeather(data);
        setError(null);
      } catch (error) {
        setError("No such city found: " + error.message);
      }
    };
     fetchWeather()
  }, [query, units])

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, []);

  const handleUnitChange = (newUnit) => {
    setUnits(newUnit); 
    setQuery({ ...query }); 
  };

  const handleSearch = (cityName) => {
    setQuery({ q: cityName });
  };

  const handleSelectFavorite = (city) => {
    setQuery({ q: city });
  };

  const handleSaveToFavorites = (city) => {
    if (!favorites.includes(city)) {
      const updatedFavorites = [...favorites, city];
      setFavorites(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    }
  };

  const handleRemoveFavorite = (city) => {
    const updatedFavorites = favorites.filter(favorite => favorite !== city);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <div>
      {error && <ErrorMessage message={'No city found'} />}
      {weather && (
        <div>
            <Favorites 
              onSelectFavorite={handleSelectFavorite} 
              favorites={favorites}
              onRemoveFavorite={handleRemoveFavorite}
            />
            <div className='grid sm:grid-cols-2 sm:gap-4'>
              <DateTimeLocation weather={weather.currentWeather} />
              <Input onSearch={handleSearch} onSaveToFavorites={handleSaveToFavorites} />
            </div>
          <Temperature weather={weather.currentWeather} units={units} onUnitChange={handleUnitChange} />
          <Forecast items={weather.forecastWeather} units={units} />
        </div>
      )}
     </div>
  );
};

export default WeatherComponent;
