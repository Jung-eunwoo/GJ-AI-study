import { useContext } from "react";
import { NaverData } from "../App";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import "../css/Image-item.css";

function NewsItem() {
  const data = useContext(NaverData);
  const FooterSlideImg = () => {
    return (
      <ul className="w-full ">
        {data.searchData.map((item, index) =>
          item.index + (1 % 2) === 1 ? (
            <li key={item.index}>
              <div className="img-box">
                <img
                  src={item.link}
                  className="aspect-[4/3] image-rounded image-size image-hover"
                />
                {/* <p>{item.title}</p> */}
              </div>
            </li>
          ) : (
            <li key={item.index}>
              <div className="img-box">
                <img
                  src={item.link}
                  className="image-rounded image-size image-hover"
                />
                {/* <p>{item.title}</p> */}
              </div>
            </li>
          )
        )}
      </ul>
    );
  };
  console.log("가져온 데이터 확인", data);
  return (
    <div className="warp">
      <div className="rolling-list w-full footer-animation-marquee">
        <FooterSlideImg />
      </div>
      <div className="rolling-list w-full footer-animation-marquee2">
        <FooterSlideImg />
      </div>
      {/* {data.searchData.map((item, index) => (
        <Card key={index}>
          <Card.Header ><Link to={item.link}>제목 : {item.title}</Link></Card.Header>
          <Card.Body>
            <blockquote className="blockquote mb-0">
              <p>내용 : {item.description}</p>
              <footer className="blockquote-footer">시간 : {item.pubDate}</footer>
            </blockquote>
          </Card.Body>
        </Card>
 */}
    </div>
  );
}

export default NewsItem;
