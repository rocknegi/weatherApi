import { useEffect, useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import Geocode from "react-geocode";
import { useFetch } from './hooks/useFetch';

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
      console.log(lat,lng)
      fetchData(`https://api.open-meteo.com/v1/forecast?latitude=28.65&longitude=77.2&forecast_days=5&hourly=temperature_2m&timezone=Europe%2FBerlin&current_weather=true`)
    }
  },[lat,lng])

  return (
    <div className="p-5 flex flex-col">
      <h1 className="pb-5 text-center text-3xl font-bold underline">
        Weather API
      </h1>
      <div>
        <GooglePlacesAutocomplete
          apiKey={import.meta.env.VITE_MAPS_KEY}
          selectProps={{
            value,
            onChange: setValue,
          }}
        />
      </div>
    </div>
  )
}