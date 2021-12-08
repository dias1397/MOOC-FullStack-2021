import CountryInfo from './CountryInfo';

const Countries = ({ countries, filter, setFilter }) => {

    const countriesToShow = countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()));

    if (countriesToShow.length > 10) {
        return (
            'Too many matches, specify another filter'
        )
    }
    
    if (countriesToShow.length === 1) {
        return (
            <CountryInfo country={countriesToShow[0]} />
        )
    }

    return (
        countriesToShow.map(country => 
            <div key={country.ccn3}>{country.name.common} 
                <button onClick={() => setFilter(country.name.common)}>show</button>
            </div>
        ) 
    )
}

export default Countries;
