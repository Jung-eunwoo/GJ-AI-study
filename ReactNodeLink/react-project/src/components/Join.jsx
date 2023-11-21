import React, { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "../axios";
import { Navigate, useNavigate } from "react-router-dom";

const Join = () => {
  const idRef = useRef();
  const pwRef = useRef();
  const pw2Ref = useRef();
  const nameRef = useRef();
  const addRef = useRef();
  const spanRef = useRef();
  const span2Ref = useRef();
  const [dupCheck, setDupCheck] = useState();
  const [dupCheckBool, setDupCheckBool] = useState(false);
  const [textColor, setTextColor] = useState();

  const [userData, setUserData] = useState({});

  const navigate = useNavigate();

  /** <== 함수 부가설명 */
  /** ID의 중복체크를 해주는 함수 */
  const checkId = () => {
    console.log("사용자 입력 아이디", idRef.current.value);

    // 사용자가 ID input 안에 값을 넣었는가?
    if (idRef.current.value !== "") {
      // 노드로 데이터 전송 시작
      axios
        .post("/user/checkId", {
          id: idRef.current.value,
        })
        .then((res) => {
          console.log("중복체크 결과", res.data.result);
          if (res.data.result === "unique") {
            idRef.current.disabled = true;
            setDupCheck("사용 가능한 아이디입니다. 😊");
            spanRef.current.style = "color:#0f9db9";
            setDupCheckBool(true);
            // setTextColor('#0f9db9')
          } else {
            idRef.current.value = "";
            idRef.current.focus();
            setDupCheck(
              "이미 사용중인 이름이에요. 뒤에 숫자를 붙여보시는 건 어때요?"
            );
            setDupCheckBool(false);
            spanRef.current.style = "color:red";
            // setTextColor('red')
          }
        });
    }
  };

  /** 회원가입 기능을 하는 함수 */
  const handleJoin = (e) => {
    e.preventDefault();
    console.log("handle join function");
    if (dupCheckBool) {
      setUserData({
        id: idRef.current.value,
        pw: pwRef.current.value,
        name: nameRef.current.value,
        email: addRef.current.value,
      });
    }else{
      alert('아이디 중복체크를 하신 뒤 다시 눌러주세요.')
    }
  };
  useEffect(() => {
    // 조건1) 첫페이지 렌더링 제외
    console.log("useEffect를 활용한 axios 전송");
    if (userData.id === undefined) {
    } else {
      if (pwRef.current.value == pw2Ref.current.value) {
        axios.post("/user/join", { userData: userData }).then((res) => {
          console.log("회원가입 결과", res);
          if (res.data.msg === "success") {
            alert("어서오세요. 환영합니다! 😊");
            window.location.href = "/";
            // navigate로 해도는 되는데, 나중에 조건을 걸어 이동하게 하려고 이렇게 하는 거임
            // navigate("/link");
          } else if (res.data.msg === "faild") {
            alert("다시 한번 확인해주세요!😭");
            window.location.href = "/join";
            // navigate("/join");
          }
        });
      } else {
        alert("비밀번호를 확인해주세요");
        span2Ref.current.style = "color:red";
        span2Ref.current.innerText = "비밀번호가 다릅니다.";
      }
    }
  }, [userData]);

  return (
    <div>
      <h1>sign in</h1>
      <hr />
      <Form onSubmit={handleJoin}>
        <Form.Group className="mb-3" controlId="formBasicID">
          <Form.Label>ID</Form.Label>
          <Form.Control type="text" placeholder="Enter ID" ref={idRef} />
          <span
            ref={spanRef}
            style={{
              color: `${textColor}`,
              fontSize: "0.8rem",
              marginLeft: "6px",
            }}
          >
            {dupCheck}
          </span>
        </Form.Group>
        {/* 해당 className은 bootstrap이 자기들이 정한 이름 */}
        <div className="d-grid gap mb-3">
          <Button variant="light" onClick={checkId}>
            중복체크
          </Button>
        </div>

        <Form.Group className="mb-3" controlId="formBasicPassword1">
          <Form.Label>비밀번호</Form.Label>
          <Form.Control type="text" placeholder="Enter Password" ref={pwRef} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword2">
          <Form.Label>비밀번호 확인</Form.Label>
          <Form.Control
            type="text"
            placeholder="Confirm Password"
            ref={pw2Ref}
          />
          <span ref={span2Ref}></span>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>이름</Form.Label>
          <Form.Control type="text" placeholder="Enter Name" ref={nameRef} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email address"
            ref={addRef}
          />
        </Form.Group>
        <div className="d-grid gap mb-3">
          <Button variant="info" type="submit">
            회원가입
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Join;
