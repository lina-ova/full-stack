const Filter = ({newSearch, handleNewSearch}) => {
    return (
      <div>
        Search for Country: <input value={newSearch} onChange={handleNewSearch} />
      </div>
    )
  }

export default Filter