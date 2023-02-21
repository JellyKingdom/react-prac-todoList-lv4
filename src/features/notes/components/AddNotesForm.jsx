import React, { useState } from "react";
import { addNotes } from "../../../api/notes";
import {useQueryClient} from "react-query";
import {useMutation} from "react-query";

function AddNotesForm() {

    //리액트 쿼리 관련 코드
    const queryClient = useQueryClient();
    const mutation = useMutation(addNotes, {
        onSuccess: () => {
            queryClient.invalidateQueries("notes");
            console.log('성공하였습니다!');
        }
    });

    const [note, setNote] = useState({
        title: "",
        content: "",
        username: "",
    });

    const onSubmitHandler = async () => {

        if (
            note.content.trim() === "" ||
            note.username.trim() === "" ||
            note.title.trim() === ""
        ) {
            return alert("모든 항목을 입력해주세요.");
        }

        // api.post("notes", note);
        mutation.mutate(note);

        setNote({ title: "", content: "", username: "" });
    };

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setNote({
            ...note,
            [name]: value,
        });
    };

    return (
        <>
            <div>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        //버튼 클릭시 input에 들어있는 값(state)을 이용하여 db에 저장(post 요청)
                        onSubmitHandler();
                    }}
                >
                    <input
                        type='text'
                        onChange={onChangeHandler}
                        placeholder='작성자'
                        name='username'
                        value={note.username}
                    />
                    <input
                        type='text'
                        onChange={onChangeHandler}
                        placeholder='제목'
                        name='title'
                        value={note.title}
                    />
                    <input
                        tyep='textarea'
                        onChange={onChangeHandler}
                        placeholder='내용'
                        name='content'
                        value={note.content}
                    />
                    <button>추가하기</button>
                </form>
            </div>
        </>
    );
}

export default AddNotesForm;
