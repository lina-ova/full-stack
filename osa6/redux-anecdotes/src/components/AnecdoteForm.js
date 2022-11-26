import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { createNotification, deleteNotification } from '../reducers/notificationReducer'

const NewAnecdote = () => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''


        dispatch(createAnecdote(content))
        dispatch(createNotification(`lisätty anekdoottia: ${content}`))
        setTimeout(
            async () => dispatch(deleteNotification()),
            50000
          )
      }
    
    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <input name='anecdote' />
                <button type='submit'>create</button>
            </form>
        </div>
        
    )
}

export default NewAnecdote