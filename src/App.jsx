import './App.css';
import {useState} from 'react';
import axios from 'axios';
// Wanneer de gebruiker op een knop klikt, wordt informatie over alle landen ter wereld opgehaald. Hiervoor zul je de documentatie van de REST Countries API moeten bekijken om erachter te komen welk endpoint het beste past. Wanneer er resultaten op de pagina worden getoond, verdwijnt de knop.
//   Bovenaan de pagina staat de afbeelding van een wereldkaart (zie de map assets);
// Wanneer de gebruiker op een knop klikt, wordt informatie over alle landen ter wereld opgehaald. Hiervoor zul je de documentatie van de API moeten bekijken om erachter te komen welk endpoint het beste past.
//   Voor ieder land geef je het volgende weer:
//   De naam van het land
// De vlag van dat land
// De zin: Has a population of [amount] people
// Je zorgt dat de landen worden gesorteerd op populatie, van laag naar hoog;
// De land-namen moeten worden weergegeven in een kleur die overeenkomt met het continent waar het land in ligt. Tip: maak hier een helper-functie voor die een regio-naam verwacht en bepaalt welke kleur het land moet krijgen. Een land ligt meestal in één van de volgende vijf regio's, maar uitzonderingen kunnen voorkomen:
// Africa: blauw
// Americas: groen
// Asia: rood
// Europe: geel
// Oceania: paars
// De styling mag je zelf bepalen. Je mag het voorbeeld namaken of een eigen huisstijl bedenken!
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
