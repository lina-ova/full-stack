
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import {connect} from 'react-redux'

const NewAnecdote = (props) => {


    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''

        props.createAnecdote(content)
        props.setNotification(`lisätty anekdoottia: ${content}`, 10)
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

const mapDispatchToProps = {
    createAnecdote,
    setNotification
  }
const connectedAnecdote = connect(null, mapDispatchToProps)(NewAnecdote)
export default connectedAnecdote