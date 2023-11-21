// 맨 위에 해당 파일에 대한 설명을 간단히 적어주면 좋음
/* 페이지 이동을 다뤄주는 라우터 모음
 * 메인페이지 
 * 작성자 : 정은우(23-09-18) 오전 10:15
*/
const express = require('express');
// 나는 express의 방대한 기능 중 Router만 이용하면 되기 때문
const router = express.Router();

// main page
router.get('/link', (req, res)=>{
    console.log('main router')
    res.sendFile(path.join(__dirname,'..','react-project', 'build', 'index.html'))
})


// react = export
// node = exports << s 들어감! 
module.exports = router;