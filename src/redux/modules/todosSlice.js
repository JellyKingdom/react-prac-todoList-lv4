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
            return thunkAPI.fulfillWithValue(data);
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);

const todosSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        updateAction: (state, action) => {
            return state?.map((todo) =>
                todo.id === action.payload ? { ...todo, isDone: !todo.isDone } : todo
            );
        },
    },
    extraReducers: {
        [__getTodos.pending]:(state, action) => {
            //아직 진행중일때
            state.isLoading = true;
            state.isError = false;
        },
        [__getTodos.fulfilled]:(state, action)=>{
            // console.log('fullfilled : ', action)
            state.isLoading = false;
            state.isError = false;
            state.Todos = action.payload;

        },
        [__getTodos.rejected]:(state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.error = action.payload;

        }
    },
});

//export
export const { updateAction } = todosSlice.actions;
export default todosSlice.reducer;
