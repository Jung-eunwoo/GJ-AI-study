import React, { useRef } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "../axios";

const Login = () => {
  const idRef = useRef();
  const pwRef = useRef();

  /** 로그인 기능을 해주는 함수 */
  const handleLogin = (e) => {
    e.preventDefault();
    console.log("value :", idRef.current.value, pwRef.current.value);

    // Case : 데이터를 따로 객체로 보관하지 않고 바로 axios 보내주기
    // 프로젝트 시, 넘겨줘야하는 데이터의 그룹이 2개 이상이면 따로 객체화 => useEffect
    // 넘겨줘야하는 데이터의 그룹이 1개라면 바로 보내주는 방법

    axios
      .post("/user_T/login", {
        id: idRef.current.value,
        pw: pwRef.current.value,
      })
      .then((res) => {
        if (res.data.msg === "success") {
          console.log("로그인 결과", res.data.user);
          console.log("로그인 결과", sessionStorage);
          alert("어서오세요. 환영합니다! 😊");

          // session storage 저장
          /** 실제 로그인 세션을 이용할 경우 server단에 있는 session을 사용하는게 보안 상 좋음
           * => 그러나, 보안이 중요하지 않은 간단한 데이터를 저장해야할 때
           *    front단에 있는 sessionStorage, localStorage 사용할 수 있음
           * => 지금은 로그인으로 사용방법의 예를 보여주는 것 뿐,
           *    실제 로그인 세션은 back-end 세션으로 사용하세요
           * => 프로젝트? OK, 현업에서는 사용 XXXXXXX
           *
           * 1) localStorage
           * - 브라우저를 꺼도 데이터가 남아있음
           * - 7일간 보지않기, 자동 로그인, 장바구니
           *
           * - localStorage 등록 : localStorage.setItem('key', 'value')
           * - localStorage 아이템 읽기 : localStorage.getItem('key')
           * - localStorage 값 삭제 : localStorage.removeItem('key')
           *
           * 2) sessionStorage
           * - 브라우저를 끄면 날아가지만, 페이지 안에는 남아있음
           * - 로그인 기능(front만 있을 때, front개발자로 포폴만들때나ㅎ..)
           *
           * - sessionStorage 등록 : localStorage.setItem('key', 'value')
           * - sessionStorage 아이템 읽기 : localStorage.getItem('key')
           * - sessionStorage 값 삭제 : localStorage.removeItem('key')
           */
          // keyName 이라는 이름의 key 에 objectData 이름의 객체 데이터를 세션에 저장
          // 저장소에 객체 저장하는 방법
          sessionStorage.setItem('user', JSON.stringify(res.data.user));
          // keyName 이름의 String 을 가져와 JSON 형태로 다시 Parse 진행
          // JSON.parse(sessionStorage.getItem('user'));

          // page 이동
          // navigate로 해도는 되는데, 나중에 조건을 걸어 이동하게 하려고 이렇게 하는 거임
          // navigate("/link");
          window.location.href = "/";
        } else if (res.data.msg === "failed") {
          alert("아이디 혹은 비밀번호를 다시 한번 확인해주세요!😭");
          console.log("로그인 결과", res);
          idRef.current.value = "";
          pwRef.current.value = "";
          idRef.current.focus();
        }
      });
  };

  return (
    <div>
      <h1>로그인</h1>
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3" controlId="formBasicID">
          <Form.Label>ID</Form.Label>
          <Form.Control type="id" placeholder="Enter id" ref={idRef} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" ref={pwRef} />
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
