import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useQueryClient } from "react-query";
import { useMutation } from "react-query";
import { deleteTodos, switchTodo } from "../../../api/todos";
import { HiMinusCircle } from "react-icons/hi2";
import Button from "../../../elem/Button";
import { useSelector } from "react-redux";
import { updateAction } from "../../../redux/modules/todosSlice";
import { useDispatch } from "react-redux";
const Todo = ({ todo }) => {
    const dispatch = useDispatch();

    const todos = useSelector((state) => {
        return state.todos.todos;
    });

    const navigate = useNavigate();

    const updateTodos = (id) => {
        dispatch(updateAction(id));
    };


    //리액트 쿼리 관련 코드
    const queryClient = useQueryClient();
    const mutation = useMutation(deleteTodos, {
        onSuccess: () => {
            queryClient.invalidateQueries("todos");
        },
    });

    const switchMutation = useMutation(switchTodo, {
        onSuccess: () => {
            queryClient.invalidateQueries("todos");
        },
    });

    const onDeleteButtonHandler = async (id) => {
        mutation.mutate(id);
    };

    const switchButtonHandler = () => {
        
        const payload = {
            id: todo.id,
            isDone: !todo.isDone,
        };
        switchMutation.mutate(payload);
        updateTodos(todo.id);

    };

    return (
        <TodoContainer>
            <div>
                <IconWrap>
                    <HiMinusCircle
                        onClick={() => {
                            onDeleteButtonHandler(todo.id);
                        }}
                    >
                        삭제
                    </HiMinusCircle>
                </IconWrap>
                <h2>{todo.title}</h2>
                <div>{todo.content}</div>
            </div>

            <BtnsBox>
                <Button
                borderColor="#B66EB0"
                    onClick={() => {
                        navigate(`todos/${todo.id}`);
                    }}
                >
                    수정
                </Button>
                <Button 
                borderColor="#2176BA"
                onClick={switchButtonHandler}>
                    {todo.isDone ? "취소" : "완료"}
                </Button>
            </BtnsBox>
        </TodoContainer>
    );
};

export default Todo;

const TodoContainer = styled.div`
    border: 4px solid #2176BA;
    border-radius: 12px;
    padding: 12px 24px 24px;
    width: 270px;
`;

const BtnsBox = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 24px;
`;


const IconWrap = styled.div`
    display: flex;
    justify-content: end;
    svg {
        color: #f37a9e;
        font-size: 50px;

        cursor: pointer;
    }
`;
