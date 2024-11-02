import { createSlice } from "@reduxjs/toolkit"

const listStore = createSlice({
    name: "list",
    initialState: {
        list: [],
    },
    reducers: {
        update(state, action) {
            console.log("action.payload", action.payload)
            console.log("state.list", state.list)
            state.list = action.payload
            console.log("after update: ",state.list)
        }
    }
})

export const { update } = listStore.actions

export default listStore.reducer