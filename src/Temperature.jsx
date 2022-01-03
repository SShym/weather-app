import "./index.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Temperature() {
  const [country, setCountry] = useState('');
  const [value, setValue] = useState('Украина');
  const [temperature, setTemperature] = useState('');
  const [weather, setWeather] = useState('');
  const [countryName, setCountryName] = useState('');
  const [err, setError] = useState(false);
  
  const sendRequest = (e) => {
    if (e.key === 'Enter') {
      setValue(country)
    }
  }
  
  const thisCountry = (obj) => {
    setCountry(obj.target.value)
  }

  useEffect(() => {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${value}&units=metric&appid=b3bd1678f52c4640806607098f3bf8ae`)
      .then(response => {
        setCountryName(response.data.name)
        setWeather(response.data.weather[0].description)
        setTemperature(response.data.name)
        setTemperature(response.data.main)
        return response.data
      })
      .catch(e => setError(true))
      setError(false)
  }, [value])

  return (
      <div className="container-fluid">
        <div className="row">
          <div className="mx-auto text-center">
            <div className="d-flex justify-content-center align-items-center cen">
              <div className="card round main">
                <input onKeyDown={sendRequest} placeholder="Enter Country / City " type="search" onChange={thisCountry} className="mx-4 text-capitalize font-weight-bold mt-4 p-2 rounded-pill inpo" />
                {err 
                ?
                <div className="card-body">
                  <i className="fas fa-3x orange textshadow fa-cloud-sun"></i>
                  <h2 className="card-title textshadow1 text-secondary font-weight-bold pt-3 pb-5">You entered the wrong name</h2>
                  <div className="overflow-hidden">
                    <h1 className="mt-5 overflow-hidden text-white textshadow font-weight-bold">Not found</h1>
                  </div>
                  <div className="ocean">
                    <div className="wave"></div>
                    <div className="wave"></div>
                  </div>
                </div> 
                : 
                <div className="card-body">
                    <i className="fas fa-3x orange textshadow fa-cloud-sun"></i>
                    <h1 className="card-title text-capitalize textshadow1 text-secondary font-weight-bold pt-2 pb-5"> {countryName}
                      <p className='text-capitalizen text-black h4'>{weather}</p>
                    </h1>
                    <div className="overflow-hidden"><h1 className="mt-5 overflow-hidden  text-white textshadow font-weight-bold">{temperature.temp}°C</h1>
                      <h5 className="font-weight-bold mt-3">Feels like {temperature.feels_like}°C </h5>
                      <p className="card-text mt-4 textshadow text-white">Min {temperature.temp_min}°C | Max {temperature.temp_max}°C</p>
                    </div>
                    <div className="ocean">
                      <div className="wave"></div>
                      <div className="wave"></div>
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Temperature;