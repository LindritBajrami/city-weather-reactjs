import React, { useEffect, useRef, useState } from 'react'
import '../components/Card.css'

import search_icon from '../Assets/search.png'
import clear_icon from '../Assets/clear.png'
import cloud_icon from '../Assets/clouds.png'
import drizzle_icon from '../Assets/drizzle.png'
import rain_icon from '../Assets/rain.png'
import snow_icon from '../Assets/snow.png'
import wind_icon from '../Assets/wind.png'
import humidity_icon from '../Assets/humidity.png'



const Card = () => {
  const inputRef = useRef()
  const [weatherData, setweatherData] = useState(false);

  const allIcons = {
    '01d': clear_icon,
    '01n': clear_icon,
    '02d': cloud_icon,
    '02n': cloud_icon,
    '03d': cloud_icon,
    '03n': cloud_icon,
    '04d': drizzle_icon,
    '04n': drizzle_icon,
    '09d': rain_icon,
    '09n': rain_icon,
    '10d': rain_icon,
    '10n': rain_icon,
    '13d': snow_icon,
    '13n': snow_icon,
  }

  const search = async (city) => {
    if(city == '') {
      alert('Enter City Name')
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=67ee20b2b679fd810923178f356f8add`;

      const response = await fetch(url);
      const data = await response.json();

      if(!response.ok) {
        alert(data.message);
        return;
      }
      const icon = allIcons[data.weather[0].icon] || clear_icon;

      setweatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon
      })
    } catch(error) {
      setweatherData(false)
      console.error('Error in fetching data')
    }
  }
  useEffect(() =>{
    search('Tirana')
  }, [])

  return (
    <div className='card'>
        <div className='search'>
          <input ref={inputRef} type='text' placeholder='enter city name'></input>
          <button onClick={() => search(inputRef.current.value)}><img src={search_icon} ></img></button>
        </div>
        {
          weatherData ? <>
          <div className="weather">
              <img src={weatherData.icon} className="weather-icon"></img>
              <h1 className="temp">{weatherData.temperature} °C</h1>
              <h2 className="city">{weatherData.location}</h2>
                <div className="details">
                    <div className="col">
                        <img src={humidity_icon}></img>
                        <div>
                          <p className="humidity">{weatherData.humidity} %</p>
                          <p>Humidity</p>
                        </div>
                    </div>
                    <div className="col">
                        <img src={wind_icon} alt=""></img>
                        <div>
                            <p className="wind">{weatherData.windSpeed} km/h</p>
                            <p>Wind Speed</p>
                        </div>
                    </div>
                </div>
          </div>
          </> : <></>
        }
    </div>
  )
}

export default Card