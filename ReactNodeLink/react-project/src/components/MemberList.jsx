import React, { useEffect, useState } from "react";
import axios from "../axios";

const MemberList = () => {
  // 초기값 배열 해야함. 안하면 map 돌렸을 때 첨에 오류 남
  const [list, setList] = useState([]);

  // 화면 렌더링이 완료됐을 때 실행될 react Hook
  useEffect(() => {
    axios.post("/user/select", {}).then((res) => {
      setList(res.data.list);
    });
  }, []);
  return (
    <div>
      <h1>회원정보</h1>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>email</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item,idx) => (
            <tr key={idx}>
              <td>{item.id}</td>
              <td>{item.user_name}</td>
              <td>{item.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MemberList;
