import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddTodos from "../pages/AddTodos";
import Home from "../pages/Home";
import TodoDetail from "../pages/TodoDetail";
import Header from "../components/ui/Header";
import Layout from "../components/ui/Layout";

const Router = () => {
    return (
        <BrowserRouter>
            <Layout>
                <Header />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/todos/add' element={<AddTodos />} />
                    <Route path='/todos/:id' element={<TodoDetail />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
};

export default Router;
