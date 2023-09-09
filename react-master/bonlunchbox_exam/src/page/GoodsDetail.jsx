import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const GoodsDetail = () => {
  //상품정보를 저장하는 state를 정의하시오.
  //state명: good

  //GoodsItem에서 넘겨받은 상품id를 저장하는 변수를 정의하시오.
  // useParams() 활용

  //상품리스트에서 특정 상품정보만 JSON서버로부터 가져온 후, good state에 저장하는
  //getGoods함수를 구현하시오.
  //요청URL : http://localhost:3004/goods_list/상품id

  //useEffect()를 이용하여 getGoods 함수를 한 번만 호출하시오.

  return (
    <div className="goods-detail-box">
      <div className="goods-detail-box-thumb">
        <img src={"상품sub이미지"} alt="이미지" />
      </div>
      <div className="goods-detail-box-info">
        <div className="goods-detail-title">
          <div className="goods-icon">
            {/* 해당 상품이 new인지 best인지 조건부 렌더링을 통해 출력하시오. */}
            <em className="goods-new">new</em>
            <em className="goods-best">best</em>
          </div>
          <p className="goods-detail-name">{"상품이름"}</p>
          <p className="goods-detail-txt">{"상품간단한설명"}</p>
          <div className="goods-detail-price-box">
            <strong>{"상품가격"}</strong>
            <span>원</span>
          </div>
        </div>
        <div className="goods-detail-summary">{"상품상세설명"}</div>
      </div>
    </div>
  );
};

export default GoodsDetail;
