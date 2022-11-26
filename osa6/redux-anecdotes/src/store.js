
import ancdeoteReducer  from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'

import { configureStore } from '@reduxjs/toolkit'


const store = configureStore({
    reducer: {
      anecdotes: ancdeoteReducer,
      notifications: notificationReducer,
      filter: filterReducer
    }
  })

export default store