
import ancdeoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
    reducer: {
      anecdotes: ancdeoteReducer,
      notifications: notificationReducer
    }
  })

export default store