import React from 'react';
import WeatherComponent from './components/WeatherComponent';
import "./App.css"

const App = () => {

  return (
    <div>
      <div className="app-container mx-auto max-w-screen-md mt-4 py-4 px-10 h-fit shadow-xl shadow-gray-400 rounded-lg">
            <WeatherComponent/>
      </div>
    </div>
  );
};


export default App;