const Person =({person, deletePerson}) => {
    return (
        <li key={person.name}>
            {person.name} {person.number}  <button onClick={deletePerson}>delete</button>
        </li>
    )
}
  
  const Persons = ({personsToShow, deletePerson})=>{
    return (
        <ul>
            {personsToShow.map(
                person => 
                    <Person  
                        key= {person.name} 
                        person={person} 
                        deletePerson={()=>deletePerson(person.name,person.id)}
                    />
            )}
        </ul>
    )
  }

export default Persons