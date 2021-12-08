import React from 'react';
import Weather from './Weather';

const CountryInfo = ({ country }) => {
    return (
        <div>
            <h1>{country.name.common}</h1>
            <div>capital {country.capital}</div>
            <div>population {country.population}</div>
        
            <h2>languages</h2>
            <ul>
                {Object.values(country.languages).map(lang => 
                    <li key={lang}>{lang}</li>
                )}
            </ul>

            <img src={country.flags.png} width='100px' alt='flag' />            

            <Weather capital={country.capital} />
        </div>
    )
}

export default CountryInfo;
