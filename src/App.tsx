import { useState, useEffect } from 'react'
import axios from 'axios';
import './App.css'

function App() {

  const [data, setData] = useState({
    name: 'City',
    celcius: '-',
    wind: '-',
    humidity: '-',
    desc: 'Clima',
  })

  useEffect(()=>{
    const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=belo%20horizonte&APPID=721ae6e20d02be9173692911575b24c2'
    axios.get(apiUrl)
    .then(res => 
      setData({...data, celcius: res.data.main.temp, name: res.data.name, humidity: res.data.main.humidity, wind: res.data.wind.speed, desc: res.data.weather[0].description})  
    )
    .catch(err => console.log(err))
  },[])

  return (
      <div className='weather-app'>
              <div className="search">
                  <img src="../public/image/icon-place.svg" alt="Place icon" />
                  <input type="text" />
                  <button className='btn-search'>
                    <img src="../public/image/icon-search.svg" alt="Search icon" />
                  </button>
              </div>
              <div className="image">
                <img className="" src="../public/image/foggy.svg" alt="Foogy" />
              </div>
              <main className='box-forecast'>
                <h3 className='date'>Today, 12 September</h3>
                <h3 className='city'>{data.name}</h3>
                <h1 id='celcius'>{data.celcius}</h1>
                <h2>{data.desc}</h2>
                <div className="wrapper-wind">
                  <img src="../public/image/icon-wind.svg" alt="Wind icon" />
                  <span>Wind</span>
                  <span className='divisor'>|</span>
                  <span className='velocity-wind'>{data.wind}</span>
                </div>
                <div className="wrapper-hum">
                  <img src="../public/image/icon-hum.svg" alt="Hum icon" />
                  <span>Hum</span>
                  <span className='divisor'>|</span>
                  <span className='percentage-hum'>{data.humidity}</span>
                </div>
              </main>
        </div>
  )
}

export default App
