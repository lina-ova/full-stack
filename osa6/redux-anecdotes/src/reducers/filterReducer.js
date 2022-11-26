import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
    name: 'filter',
    initialState: '',
    reducers: {
        filter(state, action) {
            const content = action.payload
            return state = content
        }
    }  
})


export const { filter } = filterSlice.actions
export default filterSlice.reducer