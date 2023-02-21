import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../axios/api";

const initialState = {
    notes: [],
    isLoading: false,
    isError: false,
    error: null,
};

export const __getNotes = createAsyncThunk(
    "getNotes",
    async (payload, thunkAPI) => {
        try {
            const {data} = await api.get("/notes");
            return thunkAPI.fulfillWithValue(data);
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);

const notesSlice = createSlice({
    name: "notes",
    initialState,
    reducers: {},
    extraReducers: {
        [__getNotes.pending]:(state, action) => {
            //아직 진행중일때
            state.isLoading = true;
            state.isError = false;
        },
        [__getNotes.fulfilled]:(state, action)=>{
            // console.log('fullfilled : ', action)
            state.isLoading = false;
            state.isError = false;
            state.notes = action.payload;

        },
        [__getNotes.rejected]:(state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.error = action.payload;

        }
    },
});

//export
export const { } = notesSlice.actions;
export default notesSlice.reducer;
