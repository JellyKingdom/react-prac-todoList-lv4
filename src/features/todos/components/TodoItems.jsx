import Todo from "./Todo";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { __getTodos } from "../../../redux/modules/todosSlice";


const TodoItems = () => {

    const dispatch = useDispatch();

    const todos = useSelector((state) => {
        return state.todos.todos;
    });


    useEffect(() => {
        dispatch(__getTodos());

    }, [dispatch]);


    return (
        <TodoItemsBox>
            <Title>Working🔥</Title>
            <ItemWrapper>
                {todos.map((todo) => {
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
                {todos.map((todo) => {
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
