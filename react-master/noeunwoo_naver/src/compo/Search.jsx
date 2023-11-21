import Button from "react-bootstrap/Button";
import logo from "../img/logo.png";
import axios from "axios";
import { useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { NaverData } from "../App";

function Search() {
  const data = useContext(NaverData);
  // Data = {searchData:searchData, setSearchData:setSearchData}
  const inputData = useRef();
  const nav = useNavigate();
  const [keyword, setKeyword] = useState("");

  function getData(category) {
    //네이버 검색 api 를 이용해서 데이터를 받아오겠습니다
    //1.검색 키워드(짜장면) , 2.검색 카테고리(뉴스)
    //http:localhost:3000  ----> https://openapi.naver.com/v1/search/news.json

    axios
      .get(`/v1/search/${category}.json`, {
        params: { query: keyword },
        display:20,
        headers: {
          "X-Naver-Client-Id": "O3p0uRoXJyZm1UP07tSa",
          "X-Naver-Client-Secret": "76DgW5LkbJ",
        },
      })
      .then((res) => {
        //검색어에 따른 뉴스, 쇼핑, 책 데이터를 받아 오게끔 만들어 주세요!
        console.log(res);
        data.setSearchData(res.data.items);
        nav("/news");
      });
  }
  const handleOnkeyPress = (e) => {
    if (e.key === "Enter") {
      getData("image");
    }
    console.log("실행은 되니");
  };
  return (
    <>
      <div className="search-wrap">
        {/* 검색어 입력 */}
        <input
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
          onKeyDown={handleOnkeyPress}
        />
      </div>
    </>
  );
}
export default Search;
