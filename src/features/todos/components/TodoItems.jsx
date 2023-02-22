import React, { useEffect } from "react";
import Todo from "./Todo";
import styled from "styled-components";
import { useQuery } from "react-query";
import {  getTodos } from "../../../api/todos";



const TodoItems = () => {


    const { isLoading, isError, data } = useQuery("todos", getTodos
    );

    if (isLoading) {
        return <h1>로딩중입니다!</h1>;
    }

    if (isError) {
        return <h1>에러가 발생했습니다.</h1>;
    }



    return (
        <TodoItemsBox>
            <Title>Working🔥</Title>
            <ItemWrapper>
                {data && data.map((todo) => {
                    if (!todo.isDone) {
                        return (
                            <Todo
                                key={todo.id}
                                todo={todo}
                            />
                        );
                    }
                })}
            </ItemWrapper>
            <Title>Done💘</Title>
            <ItemWrapper>
                {data && data.map((todo) => {
                    if (todo.isDone) {
                        return (
                            <Todo
                                key={todo.id}
                                todo={todo}
                            />
                        );
                    } else return null;
                })}
            </ItemWrapper>
        </TodoItemsBox>
    );
};

export default TodoItems;

const TodoItemsBox = styled.div`
    padding: 0 24px;
`;

const Title = styled.h2`
    display: block;
    font-size: 1.5em;
    margin-block-start: 0.83em;
    margin-block-end: 0.83em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bo;
`;
const ItemWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
`;
