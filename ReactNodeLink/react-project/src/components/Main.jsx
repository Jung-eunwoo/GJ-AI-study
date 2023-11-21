import React from "react";

const Main = () => {
  // 세션 스토리지 값 가져오기
  const userObj = JSON.parse(sessionStorage.getItem("user"));
  console.log("userObj", userObj);

  return (
    <div>
      {userObj === null ? (
        <h1>로그인 후 이용 가능합니다.</h1>
      ) : (
        <h1>{userObj.name}님 하이 반가워용</h1>
      )}
    </div>
  );
};

export default Main;
