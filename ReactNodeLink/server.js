// require, import .. 
const express = require('express')
const app = express();
// ./routes/index이나, index는 기본값 생략가능
// 팔로우 링크 : 컨트롤 클릭했을 때 파일로 이동

// Router Require
const indexRouter = require('./routes');
// index는 express 프레임워크의 default값이기 때문에 생략가능한 것 뿐임
// 프레임워크는 규칙이 다 정해져 있음
const userRouter = require('./routes/user');

const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
// 정적인 파일을 가져오기 위한 미들웨어
// 앞으로 난 정적인 애들을 여기서만 가져올 거야. 원래대로라면 'react-project/build'로 하면 되지만, mac rinux 등은 \<= 이게 아닌 경우가 있음
// __dirname : 내가 현재 있는 위치
// 정적으로 변한 React file을 가져와주기 위한 미들웨어 세팅 中...
// 각 OS에 맞게 경로를 자동으로 만들어주기 위함
app.use(express.static(path.join(__dirname, 'react-project', 'build'))); 

// cors 오류 해결을 위한 미들웨어
// 1) cors 모듈 설치 : npm i cors
// 2) 미들웨어 호출 : require
// 3) 사용
app.use((cors()));
app.use(express.json());


// body-parser 미들웨어 대체 express 내장 모듈
app.use(express.urlencoded({extended: false}));

// app.use 어쩌구 함서 미들웨어 한 거 무조건!!!!! 아래 router 위에 적어줘야 함 

// router
app.use('/', indexRouter);
app.use('/user', userRouter);

// app.get(*) : Express 라우팅에서 사용되는 패턴 중, '와일드 카드'로 모든 URL 경로에 대한 처리를 진행
// 모든 URL 경로에 대한 처리를 진행 
// 단!! 모든 라우팅 중, 가장 하단에 존재해야 함.
// React+Node 연동할 때 꼭 필요한 존재!!
// 라우터의 와일드 카드
// 위의 흝고 온 라우터에 전부 해당하지 않으면 이 라우터로 들어오겠다.
// main page
app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname,'react-project', 'build', 'index.html'))
  })

  
// 포트번호 세팅
// Q. 왜 3000번 안 씀?
// A. 3000번은 나중에 React에서 쓸거임
app.set('port',process.env.PORT || 3001)

// 누가 들어오나? 내 포트번호 누가 사용하나?
app.listen(app.get('port'), ()=>{
    console.log('넌 최고야😊')
    console.log('http://localhost:3001')
});
