import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import api from "../../../axios/api";
import { useDispatch, useSelector } from "react-redux";
import { __getNotes } from "../../../redux/modules/notesSlice";


function List() {
    const dispatch = useDispatch();
    const {isLoading, error, notes} = useSelector((state) => {
        return state.notes;
    })


    useEffect(()=>{
        dispatch(__getNotes());
    },[]);

    const navigate = useNavigate();


    // const onDeleteButtonHandler = async (id) => {
    //     api.delete(`notes/${id}`);
    //     setNotes(notes.filter((item) => {
    //         return item.id !== id;
    //     }))
    // }


    // useEffect(()=>{
    //     //db로부터 값 가져오기
    //     fetchNotes();
    // },[]);

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
                            <Link to={`notes/${item.id}`}>
                            {item.id} : {item.title}
                            </Link>
                            
                            &nbsp;
                            {/* <button onClick={()=>{onDeleteButtonHandler(item.id)}}>삭제</button> */}
                        </div>
                    )
                })
            }
            </div>

        </>
    );
}

export default List;
