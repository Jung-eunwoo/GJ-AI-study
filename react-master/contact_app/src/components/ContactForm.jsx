import React from 'react'
import { useRef } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useDispatch, useSelector } from 'react-redux'
// react-redux 명령을 내리기 위한 Action 불러오기
import {ContactReducerActions} from '../redux/reducers/contactSlice'

const ContactForm = () => {
  const contactName = useRef(null)
  const contactPhone = useRef(null)
  const dispatch = useDispatch()

  const handleContactInput = () => {
    dispatch(
      ContactReducerActions.addContact({
        id:uuidv4(),
        name:contactName.current.value,
        phone:contactPhone.current.value
      })
    )
    contactName.current.value = ''
    contactPhone.current.value = ''
    // contactName.current.value.focus()
  }
  

  return (
    <div className='contact-form-container'>
      <input type='text' placeholder='이름을 입력해주세요.' ref={contactName}/>
      <input type='text' placeholder='전화번호를 입력해주세요.' ref={contactPhone}/>
      <input type='button' value='등록' onClick={handleContactInput}/>
    </div>
  )
}

export default ContactForm