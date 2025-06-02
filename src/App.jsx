import './App.css';

// Package dependencies
import {useState} from 'react';
import axios from 'axios';

// Assets
import worldMapImage from './assets/world_map.png';

function App() {
  async function getCountriesInformation() {
    const response = await axios.get("https://restcountries.com/v3.1/all");

    setCountriesInformation(response.data.map((countryInformation, index) => {
      return {
        id: index,
        name: countryInformation.name.official,
        flagImageURL: countryInformation.flags.png,
        flatImageAlt: countryInformation.flags.alt,
        population: countryInformation.population
      };
    }));

    setHideCountriesButton(true);
  }

  const [countriesInformation, setCountriesInformation] = useState([]);
  const [hideGetCountriesButton, setHideCountriesButton] = useState(false);

  return (<>
    <img
      src={worldMapImage}
      alt="An image of the world map"
      className="world-map"
    />
    <h1>World regions</h1>
    <button type="button" onClick={getCountriesInformation} hidden={hideGetCountriesButton}>Toon alle landen</button>
    <div className="country-cards">
      {countriesInformation.map((countryInformation) => {return (
        <div
          key={countryInformation.id}
          className="country-card"
        >
          <div className="title">
            <img src={countryInformation.flagImageURL} alt="Flag image"/>
            <span>{countryInformation.name}</span>
          </div>
          <span>Has a population of {countryInformation.population} people</span>
        </div>
      );})} {/* Hier staat inderdaad veel troep op 1 regel, dat heb ik bewust gedaan om te diepe nesting te voorkomen. */}
    </div>
  </>)
}

export default App
