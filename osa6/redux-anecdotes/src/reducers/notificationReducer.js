import { createSlice } from '@reduxjs/toolkit'

let timeoutId = null
const notificationSlice = createSlice({
    name: 'notifications',
    initialState: '',
    reducers: {
        createNotification(state, action) {
            const content = action.payload
            return state = content
        },
        deleteNotification(state) {

            return state = '' 
          }
        }

})

export const setNotification = (notification, timer=3 ) => {
    return async dispatch => {

        if(timeoutId !== null){clearTimeout(timeoutId)}
        timeoutId = 

        await dispatch(createNotification(notification))
        timeoutId = setTimeout(
           async() => await dispatch(deleteNotification()), timer * 1000
        )
    }  
}


export const { createNotification, deleteNotification } = notificationSlice.actions
export default notificationSlice.reducer