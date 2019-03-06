import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import WeatherDisplay from './WeatherDisplay';
import SearchBar from './SearchBar';

const OPEN_WEATHER_API_KEY = '362a4b039038e395008ed626997d3623';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      temp: null,
      errorMessage: '',
      zipCode: '07950'
    };

    this.getTemperature = this.getTemperature.bind(this);
  }

  componentDidMount() {
    this.getTemperature(this.state.zipCode);
  }

  onSearchSubmit = (zipCode) => {
    this.setState({ zipCode });
    this.getTemperature(zipCode);
  }

  getTemperature(zipCode) {
    const countryCode = 'us';
    axios.get(`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},${countryCode}&appid=${OPEN_WEATHER_API_KEY}`).then(response => {
      this.setState({ temp: this.convertKelvinToFahrenheit(response.data.main.temp) })
    }).catch(error => {
      this.setState({ errorMessage: error.message });
    });
  }

  convertKelvinToFahrenheit(temp) {
    return ((9/5) * (temp - 273.15) + 32).toFixed(2);
  }

  render() {
    return (
      <div>
        <SearchBar onSubmit={this.onSearchSubmit}/>
        <WeatherDisplay temp={this.state.temp} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#root'));