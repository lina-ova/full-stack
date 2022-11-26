
import anecdoteService from '../services/anecdotes'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const ancdeoteReducer = (state = [], action) => {
  switch(action.type) {
    case "VOTE" : 
      return state
        .map(anecdote => 
        anecdote.id !== action.anecdote.id ? anecdote : action.anecdote)
        .sort((a,b) => { return b.votes - a.votes})

    case 'NEW_ANECDOTE':
      return [...state, action.data.anecdote]
      case 'SET_ANECDOTES':
        return action.data.anecdotes
    default: 
        return state
  }
}

export const vote = (anecdote) => {
  return {
    type: 'VOTE',
    anecdote
  }
}

const appendAnecdote = ( anecdote ) => {
  return {
    type: 'NEW_ANECDOTE',
    data: {
      anecdote: anecdote
    }
  }
}

const setAnecdotes = ( anecdotes ) => {
  return {
    type: 'SET_ANECDOTES',
    data: {
      anecdotes: anecdotes
    }
  }
}
export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteForAnecdote = anecdote => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.updateVotes(anecdote)
    dispatch(vote(updatedAnecdote))
  }
}
export default ancdeoteReducer