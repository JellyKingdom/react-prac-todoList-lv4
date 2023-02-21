import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


function List() {
    const [notes, setNotes] = useState(null);

    const navigate = useNavigate();
    
    const fetchNotes = async () => {
        const {data} = await axios.get('http://localhost:4000/notes/');
        console.log(data);
        setNotes(data);

    }
    useEffect(()=>{
        //db로부터 값 가져오기
        fetchNotes();
    },[]);
    return(
        <>
            <button onClick={()=>{
                navigate("notes/add");
            }}>추가하기</button>
            <div>
            {
                notes?.map((item) => {
                    return (
                        <div key={item.id}>
                            {item.id} : {item.title}
                        </div>
                    )
                })
            }
            </div>

        </>
    );
}

export default List;
