import { useNavigate, Link } from "react-router-dom";
import { deleteTodos, getTodos } from "../../../api/todos";
import { useQuery } from "react-query";
import { useQueryClient } from "react-query";
import { useMutation } from "react-query";
import styled from "styled-components";
import { HiMinusCircle } from "react-icons/hi2";

import {
    Card,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
} from "@mui/material";

function TodosList() {
    const navigate = useNavigate();

    //리액트 쿼리 관련 코드
    const queryClient = useQueryClient();
    const mutation = useMutation(deleteTodos, {
        onSuccess: () => {
            queryClient.invalidateQueries("todos");
            console.log("성공하였습니다!");
        },
    });

    const { isLoading, isError, data } = useQuery("todos", getTodos);

    if (isLoading) {
        return <h1>로딩중입니다!</h1>;
    }

    if (isError) {
        return <h1>에러가 발생했습니다.</h1>;
    }

    const onDeleteButtonHandler = async (id) => {
        mutation.mutate(id);
    };

    return (
        <>
 
                {data.map((item) => {
                    return (
                        <div key={item.id}>
                            <Card variant="outlined">
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}
                            >
                            
                                <div 
                                style={{cursor:"pointer"}}
                                onClick={() => {
                                    navigate(`todos/${item.id}`)
                                }}>
                                    {item.title}
                                </div>
                                <IconWrap>
                                    <HiMinusCircle
                                        onClick={() => {
                                            onDeleteButtonHandler(item.id);
                                        }}
                                    >
                                        삭제
                                    </HiMinusCircle>
                                </IconWrap>
                       
                                
                            </div>
                            </Card>
                           
                        </div>
                            
                    );
                })}
         
        </>
    );
}

export default TodosList;

const IconWrap = styled.div`
    svg {
        color: #f37a9e;
        font-size: 50px;

        cursor: pointer;
    }
`;
