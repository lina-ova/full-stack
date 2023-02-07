import { useState } from 'react'
import { gql, useMutation } from '@apollo/client'

export const EDIT_YEAR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo)  {
      name
      born
    }
  }
`
const BornForm = () => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [ changeYear ] = useMutation(EDIT_YEAR)

  const submit = async (event) => {
    event.preventDefault()

    changeYear({ variables: { name, setBornTo: Number(born) } })

    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>Set Birthyear</h2>

      <form onSubmit={submit}>
        <div>
          name <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          born <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>change year</button>
      </form>
    </div>
  )
}

export default BornForm