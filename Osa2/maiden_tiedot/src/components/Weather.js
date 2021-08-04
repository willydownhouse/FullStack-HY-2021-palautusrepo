import React, { useState, useEffect } from 'react';

import weatherStack from '../apis/WeatherStack';

const Weather = ({ selectedCountry }) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    weatherStack
      .get('/current', {
        params: {
          query: selectedCountry.capital,
        },
      })
      .then(res => {
        setWeatherData(res.data.current);
      });
  }, []);

  if (!weatherData) {
    return <div className="ui active centered inline loader"></div>;
  }

  return (
    <div className="ui segment">
      <h2 className="ui header">Weather in {selectedCountry.capital}</h2>
      <div className="ui one column grid">
        <div className="column">
          <div className="ui segment">
            <img src={weatherData.weather_icons[0]} alt="img" />
            <div className="content">
              <h3 className="ui header">{weatherData.weather_descriptions}</h3>
              <div className="ui label">
                Temperature: {weatherData.temperature}
              </div>
              <div className="ui label">
                Wind: {weatherData.wind_speed}mph from direction{' '}
                {weatherData.wind_dir}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
