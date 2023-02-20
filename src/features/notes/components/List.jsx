import React from "react";
import { useNavigate } from "react-router-dom";

function List() {
    const navigate = useNavigate();
    return(
        <>
            <button onClick={()=>{
                navigate("notes/add");
            }}>추가하기</button>
        </>
    );
}

export default List;
