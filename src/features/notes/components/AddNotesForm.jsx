import React, { useState } from "react";
import axios from "axios";

function AddNotesForm() {
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

        axios.post("http://localhost:4000/notes", note);
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
