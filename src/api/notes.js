// axios 요청이 들어가는 모든 모듈
import axios from "axios";

// notes 조회
const getNotes = async () => {
    const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/notes`
    );
    // console.log(response.data);
    return response.data;
};

// 상세 note 조회
const getNotesById = async (id) => {
    const res = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/notes/${id}`
    );
    // console.log(res.data);
    return res.data;
};

// 추가
const addNotes = async (newNotes) => {
    await axios.post(`${process.env.REACT_APP_SERVER_URL}/notes`, newNotes);
};

// 삭제
const deleteNotes = async (id) => {
    await axios.delete(`${process.env.REACT_APP_SERVER_URL}/notes/${id}`);
};

// 업데이트
const updateNotes = async (edit) => {
    await axios.put(`${process.env.REACT_APP_SERVER_URL}/notes/${edit.id}`, edit);
};

export { getNotes, addNotes, deleteNotes, getNotesById, updateNotes };
