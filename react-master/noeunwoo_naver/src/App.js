import "./css/App.css";
import Search from "./compo/Search";
// import "./css/App.scss";
import "./css/Search_eunwoo.css";
import logo from "./img/logo.png";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Link } from "react-router-dom";
import { createContext, useState } from "react";
import NewsItem from "./compo/NewsItem";

export const NaverData = createContext();

function App() {
  const [searchData, setSearchData] = useState([]);

  return (
    <div className="App">
      {/* <img className="logo" src={logo} alt="NAVER SEARCH API" /> */}
      <div className="App-contents">
        <nav className="App-nav">
          <div>
            <p>NEW</p>
          </div>
          <div className="App-nav-list">
            <ul>
              <li>여자아이돌</li>
              <li>남자아이돌</li>
              <li>인디밴드</li>
            </ul>
          </div>
        </nav>
        <div className="App-content-wrap">
          <div className="logo">
            <Link to={'/'}><h1>NEW</h1></Link>
          </div>
          <NaverData.Provider
            value={{ searchData: searchData, setSearchData: setSearchData }}
          >
            <Routes>
              <Route path="/" element={<Search />}></Route>
              <Route path="/news" element={<NewsItem />}></Route>
            </Routes>
          </NaverData.Provider>
          {/* <List data={data} category={category} cnt={cnt} check={check} /> */}
        </div>
      </div>
    </div>
  );
}

export default App;
