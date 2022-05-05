import Country from './Country'


const ListItem =({name, button}) => {
    return <li>
                {name} 
                <button onClick={button}>
                    show
                </button>
            </li>
  }

const Countries = ({ countries, handleFill }) => {

    if (
        countries.length===1
        ){
      return <Country country={countries[0]}/>
    }

    if (
        countries.length<10
        ){
      return (
        countries.map(country =>
           <ListItem 
            name={country.name.common} 
            key={country.name.official} 
            button={()=>handleFill(country.name.common)}/>)
      )
    }
    if(
        countries.length>10 
        ){
      return <p>Too many matches, specify </p>
    } 
}

export default Countries;