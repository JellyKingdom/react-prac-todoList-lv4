import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getTodosById } from "../api/todos";
import { updateTodos } from "../api/todos";
import { useQueryClient } from "react-query";
import { useMutation } from "react-query";
import { useState } from "react";
import Button from "../elem/Button";
import styled from "styled-components";

function Todo() {
    const navigate = useNavigate();

    const [edit, setEdit] = useState({
        title: "",
        content: "",
        username: "",
    });

    const queryClient = useQueryClient();
    const mutation = useMutation(updateTodos, {
        onSuccess: () => {
            queryClient.invalidateQueries("todos");
        },
    });

    const { id } = useParams();
    const { isLoading, isError, data } = useQuery(["todos"], () =>
        getTodosById(id)
    );

    if (isLoading) {
        return <h1>로딩중입니다!</h1>;
    }

    if (isError) {
        return <h1>에러가 발생했습니다.</h1>;
    }

    const onChangeHandler = (e) => {
        const { value } = e.target;
        setEdit({
            ...data,
            content: value,
        });
    };

    const onSubmitHandler = async () => {
        if(edit.content === "") {
            return alert('내용을 입력해주세요');
        }
        mutation.mutate(edit);
        setEdit({ content: "" });
    };


    const buttonClickHandler = () => {
        navigate("/");
    };

    return (
        <>
            <DetailsBox>
                <div>
                    <IdBox>
                        <div>ID: {data?.id}</div>

                        <Button onClick={buttonClickHandler}>이전으로</Button>
                    </IdBox>

                    <Title>{data.title}</Title>

                    <Body>
                        <Textarea
                            type='text'
                            onChange={onChangeHandler}
                            placeholder={data.content}
                            name='content'
                            value={edit.content}
                        />
                        <Button
                            onClick={(e) => {
                                e.preventDefault();
                                onSubmitHandler();
                            }}
                        >
                            수정하기
                        </Button>
                        
                    </Body>
                </div>
            </DetailsBox>
        </>
    );
}

export default Todo;

const DetailsBox = styled.div`
    margin: 0 auto;
    width: 600px;
    height: 400px;
    border: 1px solid rgb(238, 238, 238);
    display: flex;
    flex-direction: column;
    text-align: justify;
    justify-content: space-between;
`;

const IdBox = styled.div`
    display: flex;
    height: 80px;
    text-align: justify;
    justify-content: space-between;
    padding: 0px 24px;
    -webkit-box-align: center;
    align-items: center;
`;

const Title = styled.h1`
    display: block;
    padding: 0px 24px;
    font-size: 2em;
    margin-block-start: 0.67em;
    margin-block-end: 0.67em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
`;

const Body = styled.div`
    padding: 0px 24px;
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
