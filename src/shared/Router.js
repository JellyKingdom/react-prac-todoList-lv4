import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddTodos from "../pages/AddTodos";
import Home from "../pages/Home";
import Todo from "../pages/TodoDetail";
import Prac from "../pages/prac";

const Router = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/todos/add" element={<AddTodos/>}/>
                <Route path="/todos/:id" element={<Todo />}/>
                <Route path="/prac" element={<Prac />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;