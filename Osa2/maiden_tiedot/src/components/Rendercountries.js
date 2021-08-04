import React, { useEffect } from 'react';

const Rendercountries = ({ inputValue, countries, setSelectedCountry }) => {
  //FILTER COUNTRIES WITH INPUT
  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(inputValue)
  );

  useEffect(() => {
    if (filteredCountries.length === 1) {
      setSelectedCountry(filteredCountries[0]);
    }
  });

  const renderCountries = () => {
    if (!inputValue) return null;

    if (filteredCountries.length > 10) {
      return (
        <div className="ui error message">
          <p>
            Too many matches ({filteredCountries.length}), specify another
            filter
          </p>
        </div>
      );
    }

    return filteredCountries.map(country => {
      return (
        <div key={country.numericCode} className="item">
          <div className="right floated content">
            <button
              onClick={() => setSelectedCountry(country)}
              className="ui button"
            >
              Show
            </button>
          </div>
          <div className="content">
            <p className="ui header">{country.name}</p>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="ui middle aligned divided list">{renderCountries()}</div>
  );
};

export default Rendercountries;
