import React, { useEffect, useRef, useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "../axios";

const Login = () => {
  const idRef = useRef();
  const pwRef = useRef();
  const [userData, setUserData] = useState({});
  const handleLogin = (e) => {
    e.preventDefault();
    setUserData({
      id: idRef.current.value,
      pw: pwRef.current.value,
    });
  };
  useEffect(() => {
    if (userData.id !== undefined) {
      axios.post("/user/login", { userData }).then((res) => {
        if (res.data.msg === "success") {
          console.log("로그인 결과", res.data.user);
          console.log("로그인 결과", sessionStorage);
          alert("어서오세요. 환영합니다! 😊");

          // session storage 저장
          // keyName 이라는 이름의 key 에 objectData 이름의 객체 데이터를 세션에 저장
          sessionStorage.setItem('user', JSON.stringify(res.data.user));
          // keyName 이름의 String 을 가져와 JSON 형태로 다시 Parse 진행
          JSON.parse(sessionStorage.getItem('user'));

          // page 이동
          // navigate로 해도는 되는데, 나중에 조건을 걸어 이동하게 하려고 이렇게 하는 거임
          // navigate("/link");
          window.location.href = "/link";
        } else if (res.data.msg === "failed") {
          alert("아이디 혹은 비밀번호를 다시 한번 확인해주세요!😭");
          console.log("로그인 결과", res);
          idRef.current.value = ""
          pwRef.current.value = ""
          idRef.current.focus()
        }
      });
    }
  }, [userData]);
  return (
    <div>
      <h1>로그인</h1>
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3" controlId="formBasicID">
          <Form.Label>ID</Form.Label>
          <Form.Control ref={idRef} type="id" placeholder="Enter id" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control ref={pwRef} type="password" placeholder="Password" />
        </Form.Group>

        <div className="d-grid gap mb-3">
          <Button variant="info" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Login;
