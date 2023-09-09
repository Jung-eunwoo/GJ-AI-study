import React from "react";

const GoodsItem = () => {

  return (
    <div className="goods-item" style={{ position: "relative" }}>
      <div className="goods-item-icon">
        {/* 해당 상품이 new인지 best인지 조건부 렌더링을 통해 출력하시오. */}

        <em className="goods-new">new</em>

        <em className="goods-best">best</em>
      </div>
      <div className="goods-thumb">
        {/* 
          이미지 클릭 시, Link컴포넌트를 이용해 상세페이지로 이동하시오
          상세페이지 URL : /menu/상품의 id
        */}

        <img src={"상품이미지경로"} alt="이미지" />
      </div>
      <div className="goods-name">
        <h4>{"상품이름"}</h4>
        <p>
          <span>{"상품가격"}</span>원
        </p>
      </div>
    </div>
  );
};

export default GoodsItem;
