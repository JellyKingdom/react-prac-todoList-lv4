import { configureStore } from "@reduxjs/toolkit";
import notesSlice from "../modules/notesSlice";

const store = configureStore({
    reducer: {
        notesSlice,
    },
})

export default store;