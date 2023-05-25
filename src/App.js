import React, { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [errors, setErrors] = useState([]);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=81decfba4a0da0e67ff96f76d5d698ba`;

  const searchLocation = () => {
    axios
      .get(url)
      .then((response) => {
        setData(response.data);
      })
      .catch(function (error) {
        setErrors(error.toJSON());
      });
    setLocation("");
  };
  return (
    <div className="WeatherApp">
      <div className="search">
        <input
          type="text"
          className="search"
          placeholder="Enter Location"
          onChange={(event) => setLocation(event.target.value)}
        />
        <button className="btn" type="button" onClick={searchLocation}>
          Search
        </button>
        {errors.length !== 0 && errors.code === "ERR_BAD_REQUEST" && (
          <p className="errormessage">city not found</p>
        )}
      </div>

      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp}°C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>
        {data.name !== undefined && (
          <div className="bottom">
            <div className="feels">
              {data.main ? (
                <p className="bold">{data.main.feels_like}°C</p>
              ) : null}
              <p>Feels like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className="bold">{data.wind.speed}MPH</p> : null}
              <p>Wind Speed</p>
            </div>
            <div className="pressure">
              {data.main ? (
                <p className="bold">{data.main.pressure}mbar</p>
              ) : null}
              <p>Pressure</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
