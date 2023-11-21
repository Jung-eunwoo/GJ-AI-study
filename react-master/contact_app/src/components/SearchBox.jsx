import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
// react-redux 명령을 내리기 위한 Action 불러오기
import {ContactReducerActions} from '../redux/reducers/contactSlice'
const SearchBox = () => {
  const contactPhone = useRef()
  const dispatch = useDispatch()
  const searchKeyword = () => {
    dispatch(
      ContactReducerActions.searchContact({keyword:contactPhone.current.value})
    )
  }
  return (
    <div>
      <input
        type="text"
        placeholder="검색할 키워드를 입력해주세요."
        ref={contactPhone}
      />
      <input type="button" value="등록" onClick={searchKeyword} />
    </div>
  )
}

export default SearchBox
