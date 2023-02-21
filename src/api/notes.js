// axios 요청이 들어가는 모든 모듈
import axios from "axios";

// notes 조회
const getNotes = async () => {
    const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/notes`);
    // console.log(response.data);
    return response.data;
}

// 추가
const addNotes = async (newNotes) => {
    await axios.post(`${process.env.REACT_APP_SERVER_URL}/notes`, newNotes);
}

export {getNotes, addNotes};