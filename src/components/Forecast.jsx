import React from 'react';
import { weatherIcon } from '../services/weatherService';

const convertCelsiusToFahrenheit = (celsius) => (celsius * 9) / 5 + 32;

export default function Forecast({ items, units }) {
    const formatTemperature = (temp) => {
        return units === 'metric' ? temp.toFixed() : convertCelsiusToFahrenheit(temp).toFixed();
    };

    return (
        <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-xl shadow-lg p-4 m-4">
            <div className="flex flex-col sm:flex-row items-center justify-between text-white">
                {items && items.map((item, index) => (
                    <div key={item.day} className="flex flex-col items-center justify-center">
                        <p className="font-light text-sm text-white">
                            {item.day}
                        </p>
                        <img 
                        src={weatherIcon(item.icon)}
                        className="w-12 sm:w-20 my-1"
                        alt="weather icon"
                        />
                        <p className="font-medium text-white">
                        {`${formatTemperature(item.tempMax)}° - ${formatTemperature(item.tempMin)}°`}
                        </p>
                        <small>
                            {item.weather}
                        </small>
                        {index < items.length - 1 && (
                            <div className="border-b border-gray-200 w-full my-5 block sm:hidden"></div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
