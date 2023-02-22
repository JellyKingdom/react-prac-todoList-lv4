import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    todos: [],
    isLoading: false,
    isError: false,
    error: null,
};

export const __getTodos = createAsyncThunk(
    "getTodos",
    async (payload, thunkAPI) => {
        try {
            const {data} = await axios.get(`${process.env.REACT_APP_SERVER_URL}/todos`);
            // console.log(data);
            return thunkAPI.fulfillWithValue(data);
        } catch (error) {
            // console.log(error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);

const todosSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        updateAction: (state, action) => {
            const test = state.todos.map((todo) =>
                todo.id === action.payload ? { ...todo, isDone: !todo.isDone } : todo
            );
            state.todos = test;
        },
        deleteAction: (state, action) => {
            const test = state.todos.filter((todo) => todo.id !== action.payload);

            state.todos = test;
        },
    },
    extraReducers: {
        [__getTodos.pending]:(state, action) => {
            //아직 진행중일때
            state.isLoading = true;
            state.isError = false;
        },
        [__getTodos.fulfilled]:(state, action)=>{
            // console.log('fullfilled : ',state, action)
            state.isLoading = false;
            state.isError = false;
            state.todos = action.payload;

        },
        [__getTodos.rejected]:(state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.error = action.payload;

        }
    },
});

//export
export const { updateAction, deleteAction } = todosSlice.actions;
export default todosSlice.reducer;
