import React, { useState, useEffect } from 'react';

import Renderonecountry from './Renderonecountry';
import Weather from './Weather';
import Findcountries from './Findcountries';
import Rendercountries from './Rendercountries';
import restcountries from '../apis/RestCountries';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    restcountries.get('/all').then(res => {
      setCountries(res.data);
    });
  }, []);

  return (
    <div className="ui container">
      <Findcountries inputValue={inputValue} setInputValue={setInputValue} />
      {selectedCountry ? (
        <Renderonecountry
          country={selectedCountry}
          setSelectedCountry={setSelectedCountry}
        />
      ) : (
        <Rendercountries
          setSelectedCountry={setSelectedCountry}
          inputValue={inputValue}
          countries={countries}
        />
      )}

      {selectedCountry ? <Weather selectedCountry={selectedCountry} /> : null}
    </div>
  );
};

export default App;
