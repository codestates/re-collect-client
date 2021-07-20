import axios from "axios";
import { Refresh } from "./refresh";

const Api = axios.create({
  baseURL: `https://api.recollect.today`,
  timeout: 10000, // 인스턴스의 모든 요청은 10초간 대기후 타임아웃
  params: {},
});

Api.interceptors.request.use(Refresh);

export default Api;

// Todo : get Collect 요청 적용해보기
