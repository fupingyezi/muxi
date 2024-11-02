import { configureStore } from "@reduxjs/toolkit"
import listStore from "./modules/listStore"
import selectedListStore from "./modules/selectedListStore"

const store = configureStore({
    reducer: {
        listStore,
        selectedListStore
    }
})

export default store