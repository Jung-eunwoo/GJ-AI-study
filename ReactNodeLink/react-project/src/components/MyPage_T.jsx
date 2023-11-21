import React, { useRef, useState } from "react";
import { Table, Button, Form, Modal, Row, Col } from "react-bootstrap";
import axios from '../axios'

const MyPage = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // 세션 값 가져오기
  const {id, user_name, email} =JSON.parse(sessionStorage.getItem("user"))

  // 비밀번호 input 및 버튼 useRef
  const pwRef = useRef(); // 현재 비번
  const pwEditRef = useRef(); // 바꿀 비번
  const changePWBtn = useRef();

  const new_name = useRef()
  const new_email = useRef()

  const changePW = () => {
    console.log("사용자  아이디", id);
    if (pwEditRef.current.value !== "") {
      // 노드로 데이터 전송 시작
      axios
        .post("/user/checkPw", {
          id: id,
          currentPw: pwRef.current.value,
          changePw: pwEditRef.current.value,
        })
        .then((res) => {
          console.log("중복체크 결과", res.data.msg);
          if (res.data.msg === "success") {
            alert('비밀번호 수정 완료')
            changePWBtn.current.disabled = true;
            changePWBtn.current.innerText = "비밀번호 변경 완료. 😊";
            handleClose()
          } else if(res.data.msg === 'failed') {
            // 사용자 문제
            alert('이미 사용중인 비밀번호 입니다.')
            pwEditRef.current.value = "";
            pwEditRef.current.focus();
          } else{
            // 서버 문제
            alert('죄송합니다. 다시 시도해 주세요')
            handleClose()
          }
        });
    }
  };

  /** 회원정보 수정 */
  const handleModify = () => {
    console.log('handle modify')
    if (new_name.current.value !== "") {
      // 노드로 데이터 전송 시작
      axios
        .post("/user/modify", {
          id: id,
          new_name: new_name.current.value,
          new_email: new_email.current.value,
        })
        .then((res) => {
          console.log("중복체크 결과", res.data.result);
          if (res.data.msg === "success") {
            alert("회원정보 변경 성공")
            window.location.href = '/link'
            
          } else {
            alert('값을 한번 더 확인해주시오!!')
            window.location.href = '/mypage'
          }
        });
    }
  }

  return (
    <div className="main-body">
      <h1>마이페이지</h1>
      <div align="center">
        <Table striped="columns">
          <tbody align="center">
            <tr>
              <td>ID</td>
              <td>{id}</td>
            </tr>
            <tr>
              <td>비밀번호</td>
              <td>
                <div className="d-grid gap-2">
                  <Button ref={changePWBtn} variant="light" size="sm" onClick={handleShow}>
                    비밀번호 변경
                  </Button>
                </div>
              </td>
            </tr>
            <tr>
              <td>이름</td>
              <td>
                <Form.Control ref={new_name} type="text" size="sm" defaultValue={user_name}/>
              </td>
            </tr>
            <tr>
              <td>email</td>
              <td>
                <Form.Control ref={new_email} type="text" size="sm" defaultValue={email}/>
              </td>
            </tr>
          </tbody>
        </Table>
        <Row>
          <Col>
            <Button variant="info" size="lg" onClick={handleModify}>
              수정완료
            </Button>
          </Col>
        </Row>
      </div>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>비밀번호 수정</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label>현재 비밀번호</Form.Label>
          <Form.Control ref={pwRef} type="password" size="sm" />
          <Form.Label>바꿀 비밀번호</Form.Label>
          <Form.Control ref={pwEditRef} type="password" size="sm" />
        </Modal.Body>
        <Modal.Footer>
          <Button  variant="info" onClick={changePW}>
            비밀번호 수정
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MyPage;
