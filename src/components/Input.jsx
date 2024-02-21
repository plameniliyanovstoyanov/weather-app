import React, { useState } from 'react';
import { UilSearch, UilSave } from "@iconscout/react-unicons";

// Add a prop for handling search submissions
export default function Input({ onSearch, onSaveToFavorites }) {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    if (inputValue.trim() !== '') {
      onSearch(inputValue.trim());
    }
  };

  // Optional: handle "Enter" key press for submission
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleSaveToFavorites = () => {
    if (inputValue.trim() !== '') {
      onSaveToFavorites(inputValue.trim());
    }
  };

  return (
<div className='flex justify-center sm:justify-end my-6 mb-5'>
    <div className='flex flex-row items-center justify-center space-x-4'>
        <input 
          className='text-xl font-light p-2 w-full shadow-xl focus:outline-none capitalize placeholder:lowercase rounded-lg'
          type='text'
          placeholder='Enter city name'
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <UilSearch size={35} className="text-white cursor-pointer transition ease-out hover:scale-125" onClick={handleSubmit}/>
        <UilSave size={35} className="text-white cursor-pointer transition ease-out hover:scale-125" onClick={handleSaveToFavorites}/>
    </div>
</div>
  )
}

