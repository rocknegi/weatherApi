import { useEffect, useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

export default function App() {
  const [value, setValue] = useState(null);
  useEffect(() => {
    console.log(value)
  }, [value])
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