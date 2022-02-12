import React, { useState, useEffect } from 'react'
import './index.css'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

import personService from './services/persons'

const App = () => {
    const [ persons, setPersons ] = useState([])
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ searchName, setSearchName ] = useState('')
    const [ message, setMessage ] = useState(null);
    const [ isError, setIsError ] = useState(false); 

    useEffect(() => {
        personService
            .getAll()
            .then(persons => {
                setPersons(persons)
            })
    }, [])

    const addPerson = (event) => {
        event.preventDefault();

        const person = {
            name: newName,
            number: newNumber
        };

        const existingPerson = persons.find(p => p.name === person.name);

        if (existingPerson) {
            if (window.confirm(`${person.name} is already added to the phonebook, replace the old number with a new one?`)) {
                personService
                    .update(existingPerson.id, person)
                    .then(updatedPerson => {
                        setPersons(persons.map(person => person.id !== updatedPerson.id ? person : updatedPerson));
                        setNewName("");
                        setNewNumber("");
                        setMessage(`Updated ${updatedPerson.name}`);
                        setIsError(false);
                        setTimeout(() => {
                            setMessage(null)
                        }, 5000)
                    })
                    .catch(error => {
                        setMessage(`Unable to update ${existingPerson.name}`);
                        setIsError(true);
                        setTimeout(() => {
                            setMessage(null)
                        }, 5000)
                    })
            }
        } else {
            personService
                .create(person)
                .then(newPerson => {
                    setPersons(persons.concat(newPerson))
                    setNewName("");
                    setNewNumber("");
                    setMessage(`Added ${newPerson.name}`);
                    setIsError(false);
                    setTimeout(() => {
                        setMessage(null)
                    }, 5000)
                })
                .catch(error => {
                    setMessage(`Unable to update ${person.name}`);
                    setIsError(true);
                    setTimeout(() => {
                        setMessage(null)
                    }, 5000)
                })
        }
    }

    const handleSearchChange = (event) => {
        setSearchName(event.target.value);
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value);
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value);
    }
    
    const personsToShow = persons.filter(person => person.name.toLowerCase().includes(searchName.toLowerCase()));

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={message} isError={isError}/>
            <Filter search={searchName} onChange={handleSearchChange}/>

            <br/>
            <hr/>

            <h3>New Number</h3>
            <PersonForm 
                newName = {newName}
                onChangeName = {handleNameChange}
                newNumber = {newNumber}
                onChangeNumber = {handleNumberChange}
                onSubmit = {addPerson}
            />

            <br/>
            <hr/>

            <h3>Numbers</h3>
            <Persons persons={personsToShow} setPersons={setPersons} setMessage={setMessage} setIsError={setIsError} />
        </div>
    )
}

export default App;
