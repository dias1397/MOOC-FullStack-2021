import personService from '../services/persons' 

const Person = ({ person, persons, setPersons, setMessage, setIsError }) => {
    const delPerson = () => {
       if (window.confirm(`Delete ${person.name}?`)) {
           personService
                .remove(person.id)
                .then(deletedPerson => {
                    setPersons(persons.filter(p => p.id !== person.id));
                    setMessage(`Deleted ${person.name}`);
                    setIsError(false);
                    setTimeout(() => {
                        setMessage(null)
                    }, 5000)
                })
                .catch(err => {
                    setPersons(persons.filter(p => p.id !== person.id))
                    setMessage(`Information of ${person.name} has already been removed from the server`);
                    setIsError(true);
                    setTimeout(() => {
                        setMessage(null)
                    }, 5000)
                })
       }
    }

    return <p> {person.name} - {person.number} <button onClick={() => delPerson()}>Delete</button> </p>
}

export default Person;
