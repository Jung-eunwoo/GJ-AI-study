import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

// 구조분해 문법 : props. 말고 바로 들어가게 하는 문법
const Login = ({ setAuthenticate}) => {
  //submit 버튼 클릭 시, 로그인 상태값을 전환하고 메인 페이지로 이동되도록 구현하시오.
  const navigate = useNavigate()
  const idRef = useRef()
  const pwRef = useRef()

  const handleSubmit = (e) => { 
    // 이벤트 동작을 중지시키는 함수(원래 가진 기능을 동작이 안되도록 막아주는 것)
    // 원래 submit을 누르면 a태그처럼 페이지가 새로고침되며 넘어가는데, 그걸 막기 위해 아래 함수를 쓰는 것
    e.preventDefault()
    console.log('idRef.current', idRef.current, 'pwRef.current',pwRef.current)
    if(idRef.current==='eunwoo' && pwRef.current==='1234'){
      setAuthenticate(true)
      navigate('/')
    }else{
      alert('틀렸습니다. 다시 입력해주세요')
      idRef.current=''
      pwRef.current=''
    }
    // 다시 메인으로 이동
  }

  return (
    <div className="login-box">
      <div className="login-box-tit">
        <h2>로그인</h2>
      </div>
      <div className="login-box-form">
        <form>
          <div className="input-block">
            <input type="text" placeholder="아이디를 입력해주세요." ref={idRef}/>
          </div>
          <div className="input-block">
            <input type="password" placeholder="비밀번호를 입력해주세요." ref={pwRef}/>
          </div>
          <div className="submit">
            <input
              type="submit"
              className="login-btn"
              onClick={handleSubmit}
              value="로그인"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
