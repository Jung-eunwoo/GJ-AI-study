// user와 관련된 router들 모음
/*
기능 : 회원가입, 중복체크, 로그인, 회원탈퇴, 로그아웃, 회원검색
작성자 : 정은우(23.09.19)
*/

const express = require("express");
// 나는 express의 방대한 기능 중 Router만 이용하면 되기 때문
const router = express.Router();
const conn = require("../config/database");

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
  let sql =
    "insert into project_member (id, pw, user_name, email) value (?,?,?,?)";
  conn.query(sql, [id, pw, name, email], (err, rows) => {
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
  let { id, pw } = req.body;
  // 객체로 보낸 사람들  let { id, pw } = req.body.userData;
  console.log("id, pw", id, pw);
  let sql =
    "select id, user_name, email from project_member where id = ? and pw = ?";
  conn.query(sql, [id, pw], (err, rows) => {
    // console.log('msg : success', rows)
    // console.log('msg : failed', err)
    console.log("rows", rows);
    if (err) {
      res.json({ msg: "failed" });
    } else {
      res.json({
        msg: "success",
        user: { id: rows[0].id, name: rows[0].user_name, email: rows[0].email },
      });
    }
  });
});
// 마이페이지 - 비밀번호 수정
router.post("/checkPw", (req, res) => {
  console.log("check Pw Router", req.body);

  let { id } = req.body;
  let { currentPw } = req.body;
  let { changePw } = req.body;
  console.log("id", id, "cuPw", currentPw, "caPw", changePw);
  // * 안쓰는 이유 : 비번같이 예민한 정보도 다 가지고 와지니까 보안성 측면에서 이러는 것

  // 1) 사용자가 비밀번호 입력을 틀리게 한 경우, "비밀번호를 다시 입력해주세요"
  // 2) 서버측 문제가 있는 경우, "죄송합니다. 다시 시도해주세요"
  // 3) 1, 2 모두 문제 X => 정상수정 : 변경완료 로직

  let sql = "select id, pw from project_member where id = ? and pw =?";
  conn.query(sql, [id, currentPw], (err, rows) => {
    console.log("1번 쿼리문 결과", rows);
    // 사실 id값이 null이 아닌 경우에만 조회되도록 조건을 한 번 더 걸어줘야함
    if (rows.length > 0) {
      // 우리 회원 맞음 (조회된 값이 있다면)
      // 변경 쿼리문 시작!
      let sql2 = "update project_member set pw = ? where id = ?";
      conn.query(sql2, [changePw, id], (err, rows) => {
        console.log("2번 쿼리문 결과", rows);
        if (rows) {
          res.json({ msg: "success" });
        } else {
          res.json({ msg: "error" });
        }
      });
    } else {
      // 세션값은 맞는데 비번이 틀린거면 비번을 잘못 입력한 것!
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
    if (rows.length > 0) {
      // 중복값이 존재한다면(조회된 값이 있다면)
      let sql2 =
        "update project_member set user_name = ?, email = ? where id = ?";
      conn.query(sql2, [new_name, new_email, id], (err, rows) => {
        if (err) {
          res.json({ msg: "error" });
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
// 회원가입 시 ID 중복체크
// router.post('/join',(req, res)=>{
//     console.log('join Router')
// })
// , user: { id: id, name: user_name, email: email }
module.exports = router;
