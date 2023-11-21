import axios from "axios";

const instance = axios.create({
  // 개발용
  baseURL: "http://localhost:3001"

  // 배포용
  // baseURL:"배포용url"

  // 서브용
  // baseURL:"서브용url"
});

export default instance;
