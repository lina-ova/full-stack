import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { gql, useQuery } from '@apollo/client'

const ALL = gql`
  query {
    allAuthors  {
      name
      born
      id
      bookCount
    }
    allBooks {
      title
      published
      id
      author
    }
  }
`
const App = () => {
  const result = useQuery(ALL)
  const [page, setPage] = useState('authors')

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors show={page === 'authors'} result={result} />

      <Books show={page === 'books'} result={result}/>

      <NewBook show={page === 'add'} />
    </div>
  )
}

export default App
