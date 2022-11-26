import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notifications',
    initialState: 'alku',
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


export const { createNotification, deleteNotification } = notificationSlice.actions
export default notificationSlice.reducer