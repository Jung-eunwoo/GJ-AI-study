import Button from "react-bootstrap/Button";
import logo from "../img/logo.png";
import axios from "axios";
import { useRef, useState } from "react";

function Search() {
  const searchWord = useRef()
  const [keyWord, setKeyWord] = useState()
  let word = null;
  const getData = (e) => {
    // 네이버 검색 api를 이용해서 데이터를 받아오겠습니다.
    /*
    1. 검색 키워드(짜장면) / 2. 검색 카테고리(뉴스) <- 두 가지가 반드시 필요 함
    */
   if(searchWord.current.value=''){   
    alert('값을 입력해주세요')
    searchWord.current.value = '값'
   }
   word = e.target.innerText === '뉴스' ? 'news' : (e.target.innerText === '쇼핑' ? 'shop' : 'book')
    
    axios
      .get(`/v1/search/${word}.json`, {
        params: { query: `${searchWord.current.value}` },
        headers: {
          "X-Naver-Client-Id": "ZcX6UV8ZDlH32W4xj6b4",
          "X-Naver-Client-Secret": "t0u3q4BYp_",
        },
      })
      .then((res) => {
        //  res: 응답한 결과를 가져옴
        // 검색어에 따른 뉴스, 쇼핑, 책 데이터를 받아오게끔 만들기
        console.log(res);
      });
  };
  return (
    <>
      <img className="logo" src={logo} alt="NAVER SEARCH API" />
      <div className="Search fixed">
        <div className="Category">
          {/* 카테고리 선택 버튼 */}
          <Button variant="outline-success" onClick={getData}>
            뉴스
          </Button>
          <Button variant="outline-success" onClick={getData}>쇼핑</Button>
          <Button variant="outline-success" onClick={getData}>책</Button>
        </div>

        <br></br>

        <div className="search-wrap">
          {/* 검색어 입력 */}
          <input ref={searchWord}/>
        </div>
      </div>
    </>
  );
}
export default Search;
