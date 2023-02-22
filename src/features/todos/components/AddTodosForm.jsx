import React, { useState } from "react";
import { addTodos } from "../../../api/todos";
import { useQueryClient } from "react-query";
import { useMutation } from "react-query";
import Button from "../../../elem/Button";
import Input from "../../../elem/Input";
import styled from "styled-components";
import Text from "../../../elem/Text";
import Wrapper from "../../../elem/Wrapper";
import flex from "../../../lib/flex";

function AddTodosForm() {
    //리액트 쿼리 관련 코드
    const queryClient = useQueryClient();
    const mutation = useMutation(addTodos, {
        onSuccess: () => {
            queryClient.invalidateQueries("todos");
            // console.log("성공하였습니다!");
        },
    });

    const [todo, setTodo] = useState({
        title: "",
        content: "",
        username: "",
    });

    const onSubmitHandler = async () => {
        if (
            todo.content.trim() === "" ||
            todo.username.trim() === "" ||
            todo.title.trim() === ""
        ) {
            return alert("모든 항목을 입력해주세요.");
        }

        mutation.mutate(todo);

        setTodo({ title: "", content: "", username: "" });
    };

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setTodo({
            ...todo,
            [name]: value,
        });
    };

    return (
        <>
            <StContainer>
                <StForm
                    onSubmit={(e) => {
                        e.preventDefault();
                        //버튼 클릭시 input에 들어있는 값(state)을 이용하여 db에 저장(post 요청)
                        onSubmitHandler();
                    }}
                >
                    <StMain>
                        <Wrapper mg='10px 0'>
                            <Text size="24">작성자</Text>
                        </Wrapper>
                        <Input
                            type='text'
                            onChange={onChangeHandler}
                            placeholder='작성자'
                            name='username'
                            value={todo.username}
                        />
                        <Wrapper mg='10px 0'>
                            <Text size="24">제목</Text>
                        </Wrapper>
                        <Input
                            type='text'
                            onChange={onChangeHandler}
                            placeholder='제목'
                            name='title'
                            value={todo.title}
                        />
                        <Wrapper mg='10px 0'>
                            <Text size="24">내용</Text>
                        </Wrapper>
                        <Textarea
                            onChange={onChangeHandler}
                            placeholder='내용을 입력해주세요'
                            name='content'
                            value={todo.content}
                            rows='10'
                            maxLength={200}
                        />
                    </StMain>
                    <Button size='large'
                    >추가하기</Button>
                </StForm>
            </StContainer>
        </>
    );
}

export default AddTodosForm;

const StContainer = styled.div`
    height: 100%;
`;

const StMain = styled.div`
    width: 100%;
`;

const StForm = styled.form`
    width: 100%;
    height: 100%;
    ${flex({
        direction: "column",
        align: "start",
        jusify: "space-between",
    })}
`;

const Textarea = styled.textarea`
    width: 100%;
    border: 1px solid #eee;
    box-sizing: border-box;
    border-radius: 8px;
    padding: 12px;
    font-size: 14px;

    margin-bottom: 20px;
`;
