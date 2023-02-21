import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getNotesById } from "../api/notes";
import { updateNotes } from "../api/notes";
import { useQueryClient } from "react-query";
import { useMutation } from "react-query";
import { useState } from "react";


function Note() {

  const [edit, setEdit] = useState({
    title: "",
    content: "",
    username:""
  });

  const queryClient = useQueryClient();
  const mutation = useMutation(updateNotes, {
    onSuccess: () => {
        queryClient.invalidateQueries("notes");
        console.log('성공하였습니다!');
    }
});

const { id } = useParams();
const { isLoading, isError, data } = useQuery(["notes"], () =>
getNotesById(id)
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

    console.log(edit)

    const onSubmitHandler = async () => {

      mutation.mutate(edit);

  };

    return (
        <>
            <div>
                id: {data.id}
                <h1>{data.title}</h1>
                <p>{data.content}</p>
                
                    <input
                        type='text'
                        onChange={onChangeHandler}
                        placeholder='수정할내용'
                        name='content'
                        value={edit.content}
                    />
                    <button onClick={(e) => {
                      e.preventDefault();

                      onSubmitHandler(id);
                    }}>수정하기</button>
                
            </div>
        </>
    );
}

export default Note;
