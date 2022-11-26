import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

const Ancecdote = ({key, anecdote, handleClick }) => {
    return (
        <div key={key}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={handleClick}>vote</button>
          </div>
        </div>
    )
}

const AnecdoteList = () => {

    const anecdotes = useSelector(state => state.anecdotes)
    const dispatch = useDispatch()


    
    return (
        <div>
            {anecdotes.map(anecdote =>
                <Ancecdote
                    key = {anecdote.key}
                    anecdote={anecdote}
                    handleClick={() => 
                        dispatch(vote(anecdote.id))}
                />
            )}
        </div>
        
    )
}

export default AnecdoteList