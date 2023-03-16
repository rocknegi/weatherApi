import React from 'react'
import Loader from './Loader';

export default function WeatherCard({ data, loading }) {
    const { current_weather, hourly_units, daily, daily_units: { temperature_2m_max, windspeed_10m_max } } = data;
    const formatDate = (data) => {
        const temp = data.split('-')[2];
        const formatedDate = new Date(data);
        console
        return formatedDate.toLocaleString('default', { weekday: 'short' }) + '.' + temp
    }
    if (loading) {
        return <Loader />
    }
    return (
        <div className='flex flex-col'>
            <div className='flex justify-center text-2xl mt-10'>Current Weather conditions</div>
            <div className='sm:flex sm:flex-1 sm:justify-center mt-5'>
                <div
                    className='p-2 border border-gray-200 rounded-t-3xl rounded-b-3xl sm:w-1/3 h-36 bg-sky-300'>
                    <div
                        className='font-bold text-3xl py-2'
                    >{current_weather.temperature}{hourly_units.temperature_2m
                        }</div>
                    <div className='text-center'>Wind speed is {current_weather.windspeed} {windspeed_10m_max}</div>
                    <div className='text-center'>Wind direction is {current_weather.winddirection}</div>
                </div>
            </div>
            <div className='flex justify-center text-2xl m-5'>5 day forecast</div>
            <div className='grid grid-cols-2 sm:grid-cols-5 gap-6 my-2'>
                {Array.apply(null, { length: 5 }).map((e, i) => (
                    <div key={i}
                        className='p-2 w-38 h-38 border border-gray-200 rounded-t-3xl rounded-b-3xl bg-blue-300'>
                        <div className='text-xl p-2'>
                            {formatDate(daily.time[i])}</div>
                        <div className=' text-2xl font-bold p-2 text-center'>
                            {daily.temperature_2m_max[i]}{temperature_2m_max}
                        </div>
                        <div className=' text-xl p-2 text-center'>
                            {daily.temperature_2m_min[i]}{temperature_2m_max}</div>
                        <div className='text-xl p-2 text-center'>
                            UV index: {daily.uv_index_max[i]}</div>

                    </div>
                ))}
            </div>
        </div>
    )
}
