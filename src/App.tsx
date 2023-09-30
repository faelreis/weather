import { useState, ChangeEvent, KeyboardEvent } from "react";
import axios from "axios";
import "./App.css";

import IconPlace from "./assets/icon-place.svg";
import IconSearch from "./assets/icon-search.svg";
import IconHum from "./assets/icon-hum.svg";
import IconWind from "./assets/icon-wind.svg";
import Sunny from "./assets/sunny.svg";
import Cloudy from "./assets/cloudy.svg";

interface City {
  name: string;
  celsius: number;
  wind: number;
  humidity: number;
  desc: string;
  img: string;
}

interface MyError {
  response: {
    status: number;
  };
}

interface WeatherData {
  weather: {
    main: string;
    description: string;
  }[];
  main: {
    temp: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
  name: string;
}

function App(): JSX.Element {
  const [city, setCity] = useState<City>({
    name: "Florianópolis",
    celsius: 20,
    wind: 2,
    humidity: 3,
    desc: "Clima",
    img: "./assets/foggy.svg",
  });

  const [name, setName] = useState("");

  const [weatherImage, setWeatherImage] = useState("../public/image/sunny.svg");

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === "Enter") {
      handleClick();
    }
  };

  const handleClick = (): void => {
    if (name !== "") {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&units=metric&appid=721ae6e20d02be9173692911575b24c2`;
      axios
        .get<WeatherData>(apiUrl)
        .then((res) => {
          let imgPath = "";
          if (res.data.weather[0].main === "Clear") {
            imgPath = "/src/assets/sunny.svg";
          } else if (res.data.weather[0].main === "Clouds") {
            imgPath = "/src/assets/cloudy.svg";
          } else if (res.data.weather[0].main === "Rain") {
            imgPath = "/src/assets//rainy.svg";
          } else if (res.data.weather[0].main === "Drizzle") {
            imgPath = "/src/assets/foggy.svg";
          } else if (res.data.weather[0].main === "Mist") {
            imgPath = "/src/assets/stormy.svg";
          } else {
            imgPath = Cloudy;
          }
          setWeatherImage(imgPath);
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
        .catch((err: MyError) => {
          if (err.response.status === 404) {
            alert("Invalid city");
          } else {
            alert("Integration error");
          }
        });
    }
  };

  const currentDate = new Date();
  const options: Intl.DateTimeFormatOptions = { day: "numeric", month: "long" };
  const formattedDate: string = currentDate.toLocaleDateString(
    "en-US",
    options
  );

  return (
    <div className="weather-app">
      <div className="search">
        <img src={IconPlace} alt="Place icon" />
        <input
          type="text"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
          onKeyPress={handleKeyPress}
        />
        <button onClick={handleClick} className="btn-search">
          <img src={IconSearch} alt="Search icon" />
        </button>
      </div>
      <div className="image">
        <img src={weatherImage} alt="Illustration" />
      </div>
      <main className="box-forecast">
        <h3 className="date">Today, {formattedDate}</h3>
        <h3 className="city">{city.name}</h3>
        <h1 id="celcius">{Math.round(city.celsius)}°</h1>
        <h2>{city.desc.charAt(0).toUpperCase() + city.desc.slice(1)}</h2>
        <div className="wrapper-wind">
          <img src={IconWind} alt="Wind icon" />
          <span>Wind</span>
          <span className="divisor">|</span>
          <span className="velocity-wind">{Math.round(city.wind)} km/h</span>
        </div>
        <div className="wrapper-hum">
          <img src={IconHum} alt="Hum icon" />
          <span>Hum</span>
          <span className="divisor">|</span>
          <span className="percentage-hum">{Math.round(city.humidity)}%</span>
        </div>
      </main>
    </div>
  );
}

export default App;
