import { configureStore } from "@reduxjs/toolkit";
import todosSlice from "../modules/todosSlice";

const store = configureStore({
    reducer: {
        todos: todosSlice,
    },
    devTools: process.env.NODE_ENV !== 'production',
})

export default store;