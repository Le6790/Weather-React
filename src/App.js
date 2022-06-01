import React, { useState } from 'react'
import "./App.css"

const api = require('./config.js');
console.log(api);
// const api = {
//   key: "70ec2b2b0fb598f0b82fd02b83eba7e4",
//   base: "https://api.openweathermap.org/data/2.5/"
// }

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [units, setUnits] = useState('F');

  const [coldTemp, setColdTemp] = useState(16);
  const search = evt => {
    const unit_val = (units === "F" ? "imperial" : "metric")
    if (evt.key === "Enter") {
      fetch(`${api.base_url}weather?q=${query}&units=${unit_val}&APPID=${api.weather_api_key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result)
          setQuery('')
          console.log(result);
        });
    }
  }

  const switch_units = () => {
    if (units === "F") {
      setUnits("C")
    }
    else {
      setUnits("F");
    }
  }


  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day} ${date} ${month} ${year}`

  }
  return (
    <div className={(typeof weather.main != "undefined")
    ? ((weather.main.temp > coldTemp)
      ? 'app warm' : 'app') : 'app'}>

      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
          <button className="unit-box" onClick={switch_units}>{units}</button>
        </div>
        {(typeof weather.main != "undefined") ? (
          <div>
            <div className="location-box">
              <div className='location'> {weather.name}, {weather.sys.country}</div>
              <div className='date'>{dateBuilder(new Date())}</div>
            </div>


            <div className="weather-box">
              <div className='temp'>
                {Math.round(weather.main.temp)}°
              </div>
              <div className="weather">
                {weather.weather[0].main}
              </div>
            </div>
          </div>
        ) : ('Not found')}


      </main>
    </div>
  );
}

export default App;
