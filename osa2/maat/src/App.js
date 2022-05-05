import { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/Countries'
import Filter from './components/Filter'


const App = () => {
  const [countries, setCountries] = useState([])
  const [shawAll, setShawAll] = useState(true)

  const [newSearch, setNewSearch] = useState('')

  useEffect ( () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  
  }, [])
  const handleFill= (name) =>{
    setNewSearch(name)
    setShawAll(false)
  }
  const handleNewSearch = (event) => {
    setNewSearch(event.target.value)
    setShawAll(false)
  }

  const countriesToShow = shawAll
    ? countries
    : countries.filter(country => country.name.common.toLowerCase().includes(newSearch.toLowerCase()) === true)

  return (
    <div>
      <h2>Countries</h2>

        < Filter newSearch={newSearch} handleNewSearch={handleNewSearch} />

        <Countries countries={countriesToShow} handleFill={handleFill}/>

    </div>
  )
}


export default App;