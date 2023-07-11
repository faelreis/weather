import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import axios from 'axios';
import './App.css';

interface City {
  name: string;
  celsius: number;
  wind: number;
  humidity: number;
  desc: string;
  img: string;
}

function App(): JSX.Element {
  const [city, setCity] = useState<City>({
    name: 'Florianópolis',
    celsius: 20,
    wind: 2,
    humidity: 3,
    desc: 'Clima',
    img: '../public/image/foggy.svg'
  });

  const [name, setName] = useState('');

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      handleClick();
    }
  };

  const handleClick = (): void => {
    if (name !== '') {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&units=metric&appid=721ae6e20d02be9173692911575b24c2`;
      axios
        .get(apiUrl)
        .then((res) => {
          let imgPath: string = '';
          if (res.data.weather[0].main === 'Clear') {
            imgPath = '../public/image/sunny.svg';
          } else if (res.data.weather[0].main === 'Clouds') {
            imgPath = '../public/image/cloudy.svg';
          } else if (res.data.weather[0].main === 'Rain') {
            imgPath = '../public/image/rainy.svg';
          } else if (res.data.weather[0].main === 'Drizzle') {
            imgPath = '../public/image/foggy.svg';
          } else if (res.data.weather[0].main === 'Mist') {
            imgPath = '../public/image/stormy.svg';
          } else {
            imgPath = '../public/image/clouds.svg';
          }
          setCity({
            ...city,
            celsius: res.data.main.temp,
            name: res.data.name,
            humidity: res.data.main.humidity,
            wind: res.data.wind.speed,
            desc: res.data.weather[0].description,
            img: imgPath,
          });
        })
        .catch((err) => {
          if (err.response.status === 404) {
            alert('Invalid city');
          } else {
            alert('Integration error');
          }
        });
    }
  };

  const currentDate = new Date();
  const options:Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long' };
  const formattedDate:string = currentDate.toLocaleDateString('en-US', options);

  return (
    <div className='weather-app'>
      <div className='search'>
        <img src='../public/image/icon-place.svg' alt='Place icon' />
        <input
          type='text'
          onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={handleClick} className='btn-search'>
          <img src='../public/image/icon-search.svg' alt='Search icon' />
        </button>
      </div>
      <div className='image'>
        <img className='' src={city.img} alt='Illustration' />
      </div>
      <main className='box-forecast'>
        <h3 className='date'>Today, {formattedDate}</h3>
        <h3 className='city'>{city.name}</h3>
        <h1 id='celcius'>{Math.round(city.celsius)}°</h1>
        <h2>{city.desc.charAt(0).toUpperCase() + city.desc.slice(1)}</h2>
        <div className='wrapper-wind'>
          <img src='../public/image/icon-wind.svg' alt='Wind icon' />
          <span>Wind</span>
          <span className='divisor'>|</span>
          <span className='velocity-wind'>{Math.round(city.wind)} km/h</span>
        </div>
        <div className='wrapper-hum'>
          <img src='../public/image/icon-hum.svg' alt='Hum icon' />
          <span>Hum</span>
          <span className='divisor'>|</span>
          <span className='percentage-hum'>{Math.round(city.humidity)}%</span>
        </div>
      </main>
    </div>
  );
}

export default App;
