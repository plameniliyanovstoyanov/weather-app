import React from 'react'
import {
  UilTemperature,
  UilTear,
  UilWind,
  UilSun,
  UilSunset,
} from "@iconscout/react-unicons"
import { formatToLocalTime, weatherIcon } from '../services/weatherService'

function Temperature({weather: {
  description, icon, temp, temp_min, temp_max, sunrise, sunset,
  speed, humidity, feels_like, timzeone
},
  units, onUnitChange,
}) {

  const isActive = (unit) => unit === units ? 'text-xl font-bold' : 'text-md';

  const handleUnitChange = (e) => {
    const selectedUnit = e.target.name;
    onUnitChange(selectedUnit);
  };

  return (
    <div>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5 text-white'>
        <div className='flex flex-row items-center justify-center sm:justify-start'>
          <p className='temperature pr-4'>{`${temp.toFixed()}°`}</p>
          <div className='flex flex-col items-center'>
            <div className='flex flex-row items-center'>
              <button name='metric' onClick={handleUnitChange} className={`text-white font-light ${isActive('metric')} p-1 rounded-lg cursor-pointer hover:scale-110 transition-transform duration-200 ease-in-out`}>C°</button>
              <span className='text-xl text-white mx-1'>|</span>
              <button name='imperial' onClick={handleUnitChange} className={`text-white font-light ${isActive('imperial')} p-1 rounded-lg cursor-pointer hover:scale-110 transition-transform duration-200 ease-in-out`}>F°</button>
            </div>
            <div className='text-2md'>{description}</div>
          </div>
        </div>
      <div className='flex flex-row justify-center sm:justify-end'>
        <div className='flex flex-col justify-center mr-4'>
          <img src={weatherIcon(icon)} alt="" />
        </div>
        <div className='flex flex-col justify-around'>
          <div className='flex font-light text-sm justify-start mb-2'>
            <UilTemperature size={18} className="mr-1"/> 
            Feels like: <span className='font-medium ml-1'>{`${feels_like.toFixed()}°`}</span>
          </div>
          <div className='flex font-light text-sm justify-start mb-2'>
            <UilTear size={18} className="mr-1"/> 
            Humidity: <span className='font-medium ml-1'>{`${humidity.toFixed()}%`}</span>
          </div>
          <div className='flex font-light text-sm justify-start'>
            <UilWind size={18} className="mr-1"/> 
            Wind: <span className='font-medium ml-1'>{`${speed.toFixed()} km/h`}</span>
          </div>
      </div>
    </div>
  </div>
  <div className="flex flex-row items-center justify-center space-x-2
 text-white text-sm py-3 mt-4">
    <UilSun />
    <p className='font-light'>
      Sunrise: <span className='font-medium ml-1'>{formatToLocalTime(sunrise, timzeone, 'hh:mm a')}</span>
    </p>
    <p className="font-light">|</p>
    <UilSunset />
    <p className='font-light'>
      Sunset: <span className='font-medium ml-1'>{formatToLocalTime(sunset, timzeone, 'hh:mm a')}</span>
    </p>
    <p className="font-light">|</p>
    <UilSun />
    <p className='font-light'>
      High: <span className='font-medium ml-1'>{`${temp_max.toFixed()}°`}</span>
    </p>
    <p className="font-light">|</p>
    <UilSun />
    <p className='font-light'>
      Low: <span className='font-medium ml-1'>{`${temp_min.toFixed()}°`}</span>
    </p>
    <p className="font-light">|</p>
  </div>
</div>
  )
}

export default Temperature