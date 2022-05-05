import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Form from './components/Form'
import Persons from './components/Persons'
import Notification from './components/Notification/Noticifation'

import PersonsBase from './services/persons-base'


const App = () => {
  const [persons, setPersons] = useState([]) 

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  
  const [newSearch, setNewSearch] = useState('')
  const [shawAll, setShowAll] = useState(true)

  const [message, setMessage] = useState(null)

  useEffect(() => {
    PersonsBase
    .getAll()
    .then( persons => setPersons(persons))
  }, [])

  const handleNewSearch = (event) => {
    setNewSearch(event.target.value)
    setShowAll(false)
  }

  const handleNameChange = (event) =>{
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) =>{
    setNewNumber(event.target.value)
  }

  const personsToShow = shawAll
    ? persons 
    : persons.filter(person => person.name.toLowerCase().includes(newSearch) ===true)

  const addName  = (event) => {
    event.preventDefault()
    const check = persons.some(person => person.name === newName)
    

    if(!check){
      const nameObject = {
        name: newName,
        number: newNumber
      }

      PersonsBase
        .create(nameObject)
        .then( returnedPerson => setPersons(persons.concat(returnedPerson)))
      
      
      setMessage(`${newName} added to the phonebook`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)

    } else{
      
        const confirm = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      
        if(confirm){
          const person = persons.find(person => person.name === newName)

          const changedPerson = {...person, number: newNumber}
          PersonsBase
            .update(person.id, changedPerson)
            .then(returnedPerson =>{
              setPersons(persons.map(
                person => 
                  person.id !== returnedPerson.id 
                              ? person 
                              : returnedPerson))                    
            })
            .catch(error => {
              setMessage(`${newName} was already deleted`) 
              setPersons(persons.filter(n => n.name !== newName))
            })

          setMessage(`${newName} Number was updated`) }
          setTimeout(() => {
            setMessage(null)
          }, 5000)
            }
        setNewName('')
        setNewNumber('')
    }
    
  

  const deletePerson = (name,id) =>{
    const confirm = window.confirm(`Do you really want to delete ${name}`)
    if(confirm){
      PersonsBase.deletePerson(id)

      setPersons(persons.filter(person => person.id !== id ))

      setMessage(`${name} Number was deleted`) 
        setTimeout(() => {
          setMessage(null)
        }, 5000)
    }
  }

  return (
    <div>
      <Notification message={message}/>
      <h2>Phonebook</h2>
        <Filter 
          newSearch={newSearch} 
          handleNewSearch={handleNewSearch} 
        />

      <h2>Add  Name</h2>
        <Form 
          newName={newName}
          addName={addName}
          handleNameChange={handleNameChange}
          newNumber={newNumber}
          handleNumberChange={handleNumberChange}
        />
      
      <h2>Numbers</h2>

        <Persons 
          personsToShow={personsToShow} 
          deletePerson={deletePerson}
        />
    
    </div>
  )

}

export default App