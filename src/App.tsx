import './App.css'

function App() {
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
          <img src="../public/image/foggy.svg" alt="" />
        </div>
        <main className='box-forecast'>
          <h3 className='date'>Today, 12 September</h3>
          <h1>29°</h1>
          <h2>Cloudy</h2>
          <div className="wrapper-wind">
            <img src="../public/image/icon-wind.svg" alt="Wind icon" />
            <span>Wind</span>
            <span className='divisor'>|</span>
            <span className='velocity-wind'>10 km/h</span>
          </div>
          <div className="wrapper-hum">
            <img src="../public/image/icon-hum.svg" alt="Hum icon" />
            <span>Wind</span>
            <span className='divisor'>|</span>
            <span className='percentage-hum'>54 %</span>
          </div>
        </main>
    </div>
  )
}

export default App
