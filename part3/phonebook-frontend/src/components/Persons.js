import Person from './Person'

const Persons = ({ persons, setPersons, setMessage, setIsError }) => {
    return (
        persons.map(person => 
            <Person key={person.id} 
                person={person} 
                persons={persons} 
                setPersons={setPersons} 
                setMessage={setMessage} 
                setIsError={setIsError} />
        )
    )
}

export default Persons;
