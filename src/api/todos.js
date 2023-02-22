// axios 요청이 들어가는 모든 모듈
import axios from "axios";

// Todos 조회
const getTodos = async () => {
    const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/todos`
    );
    // console.log(response.data);
    return response.data;
};

// 상세 todo 조회
const getTodosById = async (id) => {
    const res = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/todos/${id}`
    );
    // console.log(res.data);
    return res.data;
};

// 추가
const addTodos = async (newTodos) => {
    await axios.post(`${process.env.REACT_APP_SERVER_URL}/todos`, newTodos);
};

// 삭제
const deleteTodos = async (id) => {
    await axios.delete(`${process.env.REACT_APP_SERVER_URL}/todos/${id}`);
};

// 업데이트
const updateTodos = async (edit) => {
    await axios.patch(
        `${process.env.REACT_APP_SERVER_URL}/todos/${edit.id}`,
        edit
    );
};

const switchTodo = async (payload) => {
    await axios.patch(`${process.env.REACT_APP_SERVER_URL}/todos/${payload.id}`, {
        isDone: payload.isDone,
    });
};

export {
    getTodos,
    addTodos,
    deleteTodos,
    getTodosById,
    updateTodos,
    switchTodo,
};
