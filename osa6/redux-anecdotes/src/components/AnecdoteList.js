import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { createNotification, deleteNotification } from '../reducers/notificationReducer'

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

    const anecdotes = useSelector(({ filter, anecdotes }) => {
        let kaikki = anecdotes
        if (filter) {
          kaikki = anecdotes.filter(anecdote =>
            anecdote.content.includes(filter))
        }
    
        return kaikki
      })
    const dispatch = useDispatch()
    const voteForAnecdote = (anecdote) => {
        dispatch(vote(anecdote.id))
        dispatch(createNotification(`äänestetty anekdoottia: ${anecdote.content}`))
        setTimeout(
            async () => dispatch(deleteNotification()),
            50000
          )

    }


    
    return (
        <div>
            {anecdotes.map(anecdote =>
                <Ancecdote
                    key = {anecdote.key}
                    anecdote={anecdote}
                    handleClick={() => 
                        voteForAnecdote(anecdote)}
                />
            )}
        </div>
        
    )
}

export default AnecdoteList