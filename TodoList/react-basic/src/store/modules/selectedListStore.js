import { createSlice } from '@reduxjs/toolkit';

const selectedListSlice = createSlice({
    name:'selectedList',
    initialState: {
        selectedList: [],
    },
    reducers: {
        updateSelect(state, action) {
            console.log("updateSelect reducer", action.payload)
            console.log("updateSelect state", state.selectedList)
            state.selectedList = action.payload
        }
    }
})

export const { updateSelect } = selectedListSlice.actions

export default selectedListSlice.reducer