import React from 'react'
import { formatToLocalTime } from '../services/weatherService'

export default function DateTimeLocation({weather: {
  dt, timezone, name, country
}}) {
  return (
    <div className='mb-1 sm:mb-5'>
         <div className='flex sm:items-start justify-center sm:justify-start mt-3'>
            <p className='text-white text-3xl font-medium'>
                {`${name}, ${country}`}
            </p>
        </div>
        <div className='flex justify-center sm:justify-start mt-2'>
            <p className='text-white text-sm font-extralight'>
                {formatToLocalTime(dt, timezone)}
            </p>
        </div>
  
    </div>
  )
}
