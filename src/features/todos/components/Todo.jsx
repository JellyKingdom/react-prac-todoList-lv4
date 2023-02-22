import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useQueryClient } from "react-query";
import { useMutation } from "react-query";
import { deleteTodos, switchTodo } from "../../../api/todos";
import { HiMinusCircle } from "react-icons/hi2";

const Todo = ({ todo }) => {
    const navigate = useNavigate();

    //리액트 쿼리 관련 코드
    const queryClient = useQueryClient();
    const mutation = useMutation(deleteTodos, {
        onSuccess: () => {
            queryClient.invalidateQueries("todos");
            console.log("성공하였습니다!");
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
                <div
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                        navigate(`todos/${todo.id}`);
                    }}
                >
                    <h2>{todo.title}</h2>
                </div>
                <div>{todo.content}</div>
            
            </div>

            <BtnsBox>
                <Btn
                    borderColor='red'
                    onClick={() => {
                        navigate(`todos/${todo.id}`);
                    }}
                >
                    수정
                </Btn>
                <Btn
                    borderColor='green'
                    className='doneBtn'
                    onClick={switchButtonHandler}
                >
                    {todo.isDone ? "취소" : "완료"}
                </Btn>
            </BtnsBox>
        </TodoContainer>
    );
};

export default Todo;

const TodoContainer = styled.div`
    border: 4px solid teal;
    border-radius: 12px;
    padding: 12px 24px 24px;
    width: 270px;
`;

const BtnsBox = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 24px;
`;

const Btn = styled.button`
    border-radius: 8px;
    cursor: pointer;
    height: 40px;
    width: 50%;

    background-color: #fff;
    border: 2px solid ${(props) => props.borderColor};
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
