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
    username:""
  });


  const [modal, setModal] = useState(false);

  const showModal = () => {
      setModal(true);
  };


  const queryClient = useQueryClient();
  const mutation = useMutation(updateTodos, {
    onSuccess: () => {
        queryClient.invalidateQueries("todos");
        console.log('성공하였습니다!');
    }
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
      mutation.mutate(edit);
  };

    return (
        <>

                    <DetailsBox>
                        <div>
                            <IdBox>
                                <div>ID: {data.id}</div>
                                <Btn onClick={() => {
                                    navigate('/');
                                }}>이전으로</Btn>
                                
                            </IdBox>
                            
                            <Title>{data.title}</Title>
                            <Body>{data.content}</Body>

                            <input
                        type='text'
                        onChange={onChangeHandler}
                        placeholder={edit.content}
                        name='content'
                        value={edit.content}
                    />

                            <Button 
                    onClick={showModal}
                    // onClick={(e) => {
                    //   e.preventDefault();
                      

                    //   onSubmitHandler(id);
                    // }}
                    >수정하기</Button>
                     {modal && <Modal setModal={setModal} />}

                            
                        </div>
                    </DetailsBox>
          





        </>
    );
}

export default Todo;


function Modal({ setModal }) {
  const closeModal = () => {
      setModal(false);
  };

  const confirmModal = () => {
      console.log("on!!");
  };

  return (
      <ModalBox>
        <button onClick={closeModal}>x</button>
        <input type="text"/>
          

          <button onClick={confirmModal}>수정</button>
      </ModalBox>
  );
}

const ModalBox = styled.div`
    /* 모달창 크기 */
    width: 800px;
    height: 500px;

    /* 최상단 위치 */
    z-index: 999;

    /* 중앙 배치 */
    /* top, bottom, left, right 는 브라우저 기준으로 작동한다. */
    /* translate는 본인의 크기 기준으로 작동한다. */
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    /* 모달창 디자인 */
    background-color: lightblue;
    border-radius: 10px;
`;

const ModalClose = styled.button`
    /* 모달창 내부 X버튼 */

    position: absolute;
    right: 10px;
    top: 10px;
`;


const BoxLayout = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
`;

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

const Btn = styled.button`
        border: 1px solid rgb(221, 221, 221);
    height: 40px;
    width: 120px;
    background-color: rgb(255, 255, 255);
    border-radius: 12px;
    cursor: pointer;
`;