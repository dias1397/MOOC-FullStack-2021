import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Search from './components/Search';
import Countries from './components/Countries';

function App() {
    const [ filter, setFilter ] = useState('')
    const [ countries, setCountries ] = useState([])

    useEffect(() => {
        axios
            .get('https://restcountries.com/v3.1/all')
            .then(response => {
                setCountries(response.data);
            })
    }, [])

    const handleSearchChange = (event) => {
        setFilter(event.target.value);
    }
    
    return (
        <div>
            <Search filter={filter} onChange={handleSearchChange} />
            <Countries countries={countries} filter={filter} setFilter={setFilter} /> 
        </div>
    );
}

export default App;
