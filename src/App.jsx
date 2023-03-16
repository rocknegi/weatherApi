import { useEffect, useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import Geocode from "react-geocode";
import { useFetch } from './hooks/useFetch';
import WeatherCard from './components/WeatherCard';
import Loader from './components/Loader';

Geocode.setLanguage("en");
Geocode.setApiKey(import.meta.env.VITE_MAPS_KEY);

export default function App() {
  const [value, setValue] = useState(null);
  const [lat, setlat] = useState(null);
  const [lng, setlng] = useState(null);
  const [{ data, error, loading }, fetchData] = useFetch(null);

  useEffect(() => {
    if (value) {
      Geocode.fromAddress(value.label).then(
        (response) => {
          const { lat, lng } = response.results[0].geometry.location;
          setlat(lat);
          setlng(lng);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }, [value]);
  useEffect(() => {
    if (lat && lng) {
      fetchData(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&hourly=temperature_2m&daily=temperature_2m_max,temperature_2m_min,uv_index_max,windspeed_10m_max&current_weather=true&forecast_days=5&timezone=Europe%2FBerlin`)
    }
  }, [lat, lng]);

  const getCurrentLocation = async () => {
    await navigator.geolocation.getCurrentPosition(
      position => {
        setlat(position.coords.latitude)
        setlng(position.coords.longitude)
      },
      err => alert(err.message)
    );
  }

  return (
    <div className="p-5 flex flex-1 h-max flex-col">
      <h1 className="pb-5 text-center text-3xl font-bold underline">
        Weather API
      </h1>
      <div>
        <GooglePlacesAutocomplete
          debounce={1000}
          apiKey={import.meta.env.VITE_MAPS_KEY}
          selectProps={{
            value,
            onChange: setValue,
          }}
        />
      </div>
      <div className='flex flex-1 justify-center mt-2'>
        <button onClick={getCurrentLocation} className='bg-gray-100 rounded-lg w-38 p-2'>Use current location</button>
      </div>
      {error && <div>Something went wrong</div>}
      {loading && <Loader />}
      {data && <WeatherCard data={data} loading={loading} />}
    </div>
  )
}