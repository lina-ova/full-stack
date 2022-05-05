import Weather from "./Weather"

const Language =({name}) => {
    return <li>{name}</li>

}

const Languages = ({languages}) =>{
    const languagesList = Object.values(languages)
    return(
      <ul>
        {languagesList.map(
          language => <Language name={language} key ={language}/>
        )}
      </ul>
    )
}

const Country = ({country})=>{
    return (
      <div>
        <h2>{country.name.official}/{country.name.common}</h2>
          <p>capital {country.capital}</p>
          <p>area {country.area}</p>
        <h3> languages </h3>
          <Languages languages={country.languages}/>
          <img src={country.flags.svg} alt='flag' width='200'/>

        <Weather name={country.capital} info={country.capitalInfo.latlng}/>
      </div>
    )
  }
  

export default Country