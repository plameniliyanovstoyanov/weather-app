import React from 'react';

const Favorites = ({ onSelectFavorite, favorites, onRemoveFavorite }) => {
  return (
    <div className="flex flex-wrap space-x-4 text-center justify-center">
      {favorites.map((city) => (
        <div key={city} className="flex items-center space-x-1">
            <button className=" text-white rounded p-1 hover:cursor-pointer hover:scale-110 transition-transform duration-200 ease-in-out" onClick={() => onSelectFavorite(city)}>
                {city}
            </button>
             <button className="text-red-500 text-sm" onClick={() => onRemoveFavorite(city)}>x</button>
        </div>
      ))}
    </div>
  );
};

export default Favorites
