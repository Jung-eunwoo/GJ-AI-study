// user와 관련된 router들 모음
/*
기능 : 회원가입, 중복체크, 로그인, 회원탈퇴, 로그아웃, 회원검색
작성자 : 정은우(23.09.19)
*/
const express = require("express");
// 나는 express의 방대한 기능 중 Router만 이용하면 되기 때문
const router = express.Router();
const conn = require("../config/database");
const path = require("path");

// 회원가입 시 ID 중복체크
router.post("/checkId", (req, res) => {
  console.log("check Id Router", req.body);

  let { id } = req.body;
  // * 안쓰는 이유 : 비번같이 예민한 정보도 다 가지고 와지니까 보안성 측면에서 이러는 것
  let sql = "select id from project_member where id = ?";
  conn.query(sql, [id], (err, rows) => {
    console.log("rows", rows);
    console.log("err", err);
    // 사실 id값이 null이 아닌 경우에만 조회되도록 조건을 한 번 더 걸어줘야함
    if (rows.length > 0) {
      // 중복값이 존재한다면(조회된 값이 있다면)
      res.json({ result: "duplication" });
    } else {
      // 중복값이 없다면(조회된 값이 없다면)
      res.json({ result: "unique" });
    }
  });
});

// 회원가입 라우터
router.post("/join", (req, res) => {
  console.log("join Router");
  console.log(req.body);
  let { id, pw, name, email } = req.body.userData;
  let sql2 =
    "insert into project_member (id, pw, user_name, email) value (?,?,?,?)";
  conn.query(sql2, [id, pw, name, email], (err, rows) => {
    // console.log('msg : success', rows)
    // console.log('msg : faild', err)

    if (err) {
      res.json({ msg: "faild" });
    } else {
      res.json({ msg: "success" });
    }
  });
});

// 로그인 라우터
router.post("/login", (req, res) => {
  console.log("login Router");
  console.log(req.body);
  let { id, pw } = req.body.userData;
  console.log("id, pw", id, pw);
  let sql =
    "select id, user_name, email from project_member where id = ? and pw = ?";
  conn.query(sql, [id, pw], (err, rows) => {
    // console.log('msg : success', rows)
    // console.log('msg : failed', err)
    console.log("rows", rows);
    if (rows.length > 0) {
      res.json({
        msg: "success",
        user: { id: rows[0].id, name: rows[0].user_name, email: rows[0].email },
      });
    } else {
      res.json({ msg: "failed" });
    }
  });
});

// 로그아웃 라우터
// session을 server에 저장한 경우에는 해당 라우터로 와야 함(기존)
// session을 front에 저장한 경우 로그아웃을 react에서 설정가넝
// router.get('/logout', (req, res)=>{

// })

// 마이페이지 - 비밀번호 수정
router.post("/checkPw", (req, res) => {
  console.log("check Pw Router", req.body);

  let { id } = req.body;
  let { currentPw } = req.body;
  let { changePw } = req.body;
  console.log("id", id, "cuPw", currentPw, "caPw", changePw);
  // * 안쓰는 이유 : 비번같이 예민한 정보도 다 가지고 와지니까 보안성 측면에서 이러는 것
  let sql = "select id, pw from project_member where id=? and pw=?";
  conn.query(sql, [id, currentPw], (err, rows) => {
    console.log("rows", rows);
    console.log("err", err);
    // 사실 id값이 null이 아닌 경우에만 조회되도록 조건을 한 번 더 걸어줘야함
    if (rows.length > 0) {
      // 중복값이 존재한다면(조회된 값이 있다면)
      let sql2 = "update project_member set pw = ? where id = ?";
      conn.query(sql2, [changePw, id], (err2, rows2) => {
        console.log("sql2", rows2);
        if (err2) {
          res.json({ msg: "failed" });
        } else {
          res.json({ msg: "success" });
        }
      });
    } else {
      // 중복값이 없다면(조회된 값이 없다면)
      res.json({ msg: "failed" });
    }
  });
});
router.post("/modify", (req, res) => {
  console.log("check modify Router", req.body);

  let { id, new_name, new_email } = req.body;

  let sql = "select id, user_name, email from project_member where id = ?";
  conn.query(sql, [id], (err, rows) => {
    console.log("rows", rows);
    console.log("err", err);
    console.log("rows");
    // 사실 id값이 null이 아닌 경우에만 조회되도록 조건을 한 번 더 걸어줘야함
    if (rows.length > 0) {
      // 중복값이 존재한다면(조회된 값이 있다면)
      let sql2 =
        "update project_member set user_name = ?, email = ? where id = ?";
      conn.query(sql2, [new_name, new_email, id], (err2, rows2) => {
        if (err2) {
          res.json({ msg: "failed" });
        } else {
          res.json({ msg: "success" });
        }
      });
    } else {
      // 중복값이 없다면(조회된 값이 없다면)
      res.json({ msg: "failed" });
    }
  });
});

// 회원 탈퇴 라우터
router.post("/delete", (req, res) => {
  let { id, pw } = req.body;
  console.log("delete router", req.body);

  let sql = "select id, pw from project_member where id=? and pw=?";
  conn.query(sql, [id, pw], (err, rows) => {
    if (rows.length > 0) {
      let sql2 = "delete from project_member where id=? and pw=?";
      conn.query(sql2, [id, pw], (err, rows) => {
        console.log("delete DB연결", rows);
        if (rows) {
          res.json({ msg: "success" });
        } else {
          res.json({ msg: "failed" });
        }
      });
    } else {
      res.json({ msg: "failed" });
    }
  });
});

// 회원 정보 검색 라우터
router.post("/select", (req, res) => {
  let sql = "select id, user_name, email from project_member";
  conn.query(sql, (err, rows) => {
    res.json({ list: rows });
  });
});

// 라우터의 와일드 카드
// 위의 흝고 온 라우터에 전부 해당하지 않으면 이 라우터로 들어오겠다.
// main page
// router.get('*', (req, res)=>{
//   res.sendFile(path.join(__dirname,'..','react-project', 'build', 'index.html'))
// })

// 회원가입 시 ID 중복체크
// router.post('/join',(req, res)=>{
//     console.log('join Router')
// })
// , user: { id: id, name: user_name, email: email }
module.exports = router;
