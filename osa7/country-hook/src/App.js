import { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  const url = `https://restcountries.com/v3.1/name/${name}?fullText=true`

  useEffect(() => {
    async function getCountryData() {
      try {
          const response = await axios.get(url)
          setCountry({
            common: response.data[0].name.common,
            population: response.data[0].population,
            capital: response.data[0].capital[0],
            flag: response.data[0].flags 
              }
          )
      } catch(err) {
        setCountry(null)
      }
    }
  getCountryData()
  },[name])

  return country
}

const Country = ({ country }) => {
  if (!country) {
    return <div>not found...</div>
  }

  return (
    <div>
      <h3>{country.common}</h3>
      <div>population {country.population}</div> 
      <div>capital {country.capital}</div>
      <img src={country.flag.png} height='100' alt={`flag of ${country.common}`}/> 
    </div>
  )  
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App
