import './App.css';

// Package dependencies
import {useState} from 'react';
import axios from 'axios';

// Assets
import worldMapImage from './assets/world_map.png';

function App() {
  const baseURL = 'https://restcountries.com/v3.1';

  // Op het moment is deze setup een beetje gek omdat zowel de "toon alle landen" en "zoek land" op 1 pagina staan.
  // Dit is geen normale situatie.
  const [disableGetCountriesButton, setDisableCountriesButton] = useState(false);
  const [countriesInformation, setCountriesInformation] = useState([]);
  const [countrySearchTerm, setCountrySearchTerm] = useState("");
  const [countrySearchResult, setCountrySearchResult] = useState(undefined);
  const [countrySearchError, setCountrySearchError] = useState(false);

  async function getCountriesInformation() {
    try {
      const response = await axios.get(
        `${baseURL}/all`,
        {
          params: {
            'fields': 'name,flags,population,region'
          }
        }
      );

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

      setCountrySearchResult(undefined);
      setDisableCountriesButton(true);
      setCountrySearchError(false);
    } catch (error) {
      console.error(error);
    }
  }

  async function getCountryInformationByName(e, name) {
    e.preventDefault();
    setDisableCountriesButton(false);

    try {
      const response = await axios.get(`${baseURL}/name/${name}`);

      setCountrySearchResult(response.data[0]);
      setCountrySearchError(false);
      setCountrySearchTerm("");
    } catch (error) {
      const errorMessage = countrySearchTerm || " ";
      setCountrySearchResult(errorMessage);
      setCountrySearchError(true);
      console.error(error);
    }
  }

  function populationToMillions(population) {
    return Math.round(population / 1000000);
  }

  function getRegionColorCSSClass(region) {
    switch (region.toLowerCase()) {
      case "africa":
        return "color-blue";
      case "americas":
        return "color-green";
      case "asia":
        return "color-red";
      case "europe":
        return "color-yellow";
      case "oceania":
        return "color-purple";
      default:
        return "color-black";
    }
  }

  return (
    <main>
      <section className="header">
        <img
          src={worldMapImage}
          alt="An image of the world map"
          className="world-map"
        />
        <h1>World regions</h1>
      </section>

      <section className="data-controls">
        <button type="button" onClick={getCountriesInformation} disabled={disableGetCountriesButton}>
          Toon alle landen
        </button>

        <form onSubmit={(e) => getCountryInformationByName(e, countrySearchTerm)}>
          <input
            type="text"
            placeholder="Vul een landnaam in..."
            value={countrySearchTerm}
            onChange={(e) => setCountrySearchTerm(e.target.value)}
          />
          <button type="submit">Zoek</button>
        </form>
      </section>

      {countrySearchResult ? (
        <section className="country-search-result">
          {countrySearchError ? (
            <span className="error-message">&quot;{countrySearchResult}&quot; bestaat niet. Probeer het opnieuw</span>
          ) : (
            <>
              <div className="country-search-result-title">
                <img src={countrySearchResult.flags.png} alt={countrySearchResult.flags.alt}/>
                <h2>{countrySearchResult.name.official}</h2>
              </div>
              <hr/>
              <p>{countrySearchResult.name.official} is situated in {countrySearchResult.region} and the capital
                is {countrySearchResult.capital[0]}</p>
              <p>It has a population of {populationToMillions(countrySearchResult.population)} million people and it
                borders with {countrySearchResult.borders?.length ?? 0} neighboring countries.</p>
              <p>Websites can be found on <code>{countrySearchResult.tld.join(', ')}</code> domains.</p>
            </>
          )}
        </section>
      ) : (
        <section className="country-cards">
          {[...countriesInformation]
            .sort((left, right) => left.population - right.population)
            .map((countryInformation) => {
              return (
                <article key={countryInformation.id} className="country-card">
                  <div className="title">
                    <img src={countryInformation.flagImageURL} alt="Flag image"/>
                    <span className={getRegionColorCSSClass(countryInformation.region)}>
                      {countryInformation.name}
                    </span>
                  </div>
                  <span>Has a population of {countryInformation.population} people</span>
                </article>
              );
            })
          }
        </section>
      )}
    </main>
  );
}

export default App;