import React from "react";
import { Card } from "react-bootstrap";
import {Routes, Route} from 'react-router-dom'
import Header from "./Header";
import Main from "./Main";  
import Join from "./Join";  
import Login from "./Login";  
import MemberList from "./MemberList";  
import Delete from "./Delete";  
import MyPage from "./MyPage";  

const Body = () => {
  return (
    <div>
      <Card>
        {/* Application의 Header */}
        <Header />
        {/* Application의 Main */}
        <Card.Body>
          <Routes>
            {/* 메인 라우터 설정을 우리가 link로 해서 아래 path는 link */}
            <Route path='/link' element={<Main/>}></Route>
            <Route path='/join' element={<Join/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/list' element={<MemberList/>}></Route>
            <Route path='/delete' element={<Delete/>}></Route>
            <Route path='/mypage' element={<MyPage/>}></Route>
          </Routes>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Body;
