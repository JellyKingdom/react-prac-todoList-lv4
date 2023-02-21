import axios from "axios";

// axios를 구성하는 환경설정 관련 코드가 입력값으로 들어간다.
// configuration
const instance = axios.create({
    baseURL: 'http://localhost:4000',
});

export default instance;
