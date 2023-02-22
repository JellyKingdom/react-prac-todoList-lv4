import React from "react";
import TodosList from "../features/todos/components/TodoList";
import { useNavigate } from "react-router-dom";
import { IoAddCircleSharp } from "react-icons/io5";
import styled from "styled-components";
import flex from "../lib/flex";
import TodoItems from "../features/todos/components/TodoItems";

const Home = () => {
    const navigate = useNavigate();
    return (
        <>
            <div style={{ display: "flex", justifyContent: "end" }}>
                <IconWrap>
                    <IoAddCircleSharp
                        onClick={() => {
                            navigate("todos/add");
                        }}
                    />
                </IconWrap>
            </div>

            {/* <TodosList /> */}
            <TodoItems/>
        </>
    );
};

export default Home;

const IconWrap = styled.div`
    svg {
        color: #2176ba;
        font-size: 50px;

        cursor: pointer;
    }
`;
