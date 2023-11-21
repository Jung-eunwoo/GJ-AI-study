import React, { useEffect, useRef, useState } from 'react'
import {Form, Button} from 'react-bootstrap'
import axios from '../axios'

const Delete = () => {
  const idRef = useRef()
  const pwRef = useRef()

  const handleDelete = (e) =>{
    e.preventDefault()
    console.log("사용자  아이디", idRef.current.value);
    if (idRef.current.value !== "") {
      // 노드로 데이터 전송 시작
      axios
        .post("/user/delete", {
          id: idRef.current.value,
          pw: pwRef.current.value,
        })
        .then((res) => {
          console.log("중복체크 결과", res.data.msg);
          if (res.data.msg === "success") {
            alert('감사했어요 다음에 또 만나요')
            sessionStorage.setItem('user', null);
            window.location.href="/link";
          } else {
            alert('아이디 혹은 비번 한번 더 확인해주세요. 근데 확인을 꼭 해야겠서?🥹')
            idRef.current.value = ""
            pwRef.current.value = ""
            idRef.current.focus()
          }
        });
    }
  };

  return (
    <div>
      <h1>회원탈퇴</h1>
      <Form onSubmit={handleDelete}>
        <Form.Group className="mb-3" controlId="formBasicID">
          <Form.Label>ID</Form.Label>
          <Form.Control ref={idRef} type="id" placeholder="Enter id" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control ref={pwRef} type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default Delete