import React, { useEffect } from 'react';

const Renderonecountry = ({ country, setSelectedCountry }) => {
  useEffect(() => {
    return () => setSelectedCountry(null);
  });

  return (
    <div className="item">
      <div className="content">
        <div className="ui header large">{country.name}</div>

        <div className="ui list">
          <div className="item">Capital: {country.capital}</div>
          <div className="item">Population: {country.population}</div>
        </div>

        <div className="ui header small">Languages</div>

        <div className="ui list">
          {country.languages.map(language => {
            return (
              <div key={language.name} className="item">
                {language.name}
              </div>
            );
          })}
        </div>
      </div>
      <div className="ui horizontal divider"></div>
      <div style={{ maxWidth: '300px' }} className="image">
        <img style={{ maxWidth: '300px' }} src={country.flag} alt="img" />
      </div>
    </div>
  );
};

export default Renderonecountry;
