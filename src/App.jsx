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
        population: countryInformation.population,
        region: countryInformation.region
      };
    }));

    setHideCountriesButton(true);
  }

  function getRegionColor(region) {
    switch (region.toLowerCase()) {
      case "africa":
        return "#5575C2";
      case "americas":
        return "#4C824B";
      case "asia":
        return "#D14E5B";
      case "europe":
        return "#FFD435";
      case "oceania":
        return "#A653BA";
      default:
        return "#000000";
    }
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
      {[...countriesInformation]
        .sort((left, right) => left.population - right.population)
        .map((countryInformation) => {
          return (
            <div key={countryInformation.id} className="country-card">
              <div className="title">
                <img src={countryInformation.flagImageURL} alt="Flag image"/>
                {/* Ik heb er voor gekozen om de dynamische kleur met het style-attribuut op te lossen. Is dit oké?*/}
                <span style={{color: getRegionColor(countryInformation.region)}}>
                  {countryInformation.name}
                </span>
              </div>
              <span>Has a population of {countryInformation.population} people</span>
            </div>
          );
        })
      }
    </div>
  </>)
}

export default App
