
import ancdeoteReducer, { setAnecdotes } from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'
import anecdoteService from './services/anecdotes'
import { configureStore } from '@reduxjs/toolkit'


const store = configureStore({
    reducer: {
      anecdotes: ancdeoteReducer,
      notifications: notificationReducer,
      filter: filterReducer
    }
  })

  anecdoteService.getAll().then(anecdotes => 
    store.dispatch(setAnecdotes(anecdotes))
    )



export default store