import { createStore } from 'redux'

import notificationReducer from './reducers/notificationReducer.js'


const reducer = combineReducers({
    notification: notificationReducer,

})
const store = createStore(reducer
    )
export default store