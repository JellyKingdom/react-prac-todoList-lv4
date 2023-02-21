import { createSlice } from "@reduxjs/toolkit";


const notesSlice = createSlice({
    name: 'notes',
    initialState:'',
    reducers:{
        addNote : (state, action) => {
            state.push(action.payload)
        },
    }
});

//export
export default notesSlice.reducer;
export const { addNote } = notesSlice.actions;