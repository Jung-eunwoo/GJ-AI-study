import React, { useRef, useState } from 'react'
import { FaCheckCircle } from 'react-icons/fa'

// dispatch랑 action은 서로 한 쌍!
import { useDispatch } from 'react-redux'
import { TodoReducerActions } from '../redux/reducers/todoSlice'

const Todoitem = ({ todo }) => {
  console.log('투두아이템실행되니')
  
  const [newText, setNewText] = useState(todo.text)
  const [edited, setEdited] = useState(false)
  
  const dispatch = useDispatch()
  
  // 수정상태를 true로 변경
  const handleEditChange = () => {
    setEdited(true)
  }
  // 수정 완료 기능 구현
  const handleSubmit = () => {
    setEdited(false)
    console.log('수정기넝 동작?',newText)
    
    // let updateList = todos.map((item) => ({
    //   ...item,
    //   text: item.id === todo.id ? newText : item.text
    // }))
    // setTodos(updateList);  
    dispatch(TodoReducerActions.textChangeTodo({id:todo.id,text:newText}))

  }

  // 소괄호 쓰고 중괄호 소괄호:함수 몸체, 중괄호: 객체
  const handleCheckChange = () => {
    // let updateList = todos.map((item) => ({
    //   ...item,
    //   complete: item.id === todo.id ? !item.complete : item.complete,
    // }))
    // setTodos(updateList)
    // console.log('클릭확인')
    dispatch(TodoReducerActions.checkChangeTodo({id:todo.id}))
  }

  const handleDelete = (id) => {
    // if(window.confirm('정말 진짜 리얼로 삭제할겁니까? 돌이킬 수 없는 선택입니다.')){
    //   console.log('삭제할 todo의 id : ', id)
    //   let updateList = todos.filter((item)=> item.id !== id )
    //   setTodos(updateList)
    // }
    dispatch(TodoReducerActions.deleteChangeTodo({id:todo.id}))
  }

  return (
    <li className="todo-item">
      {todo.complete ? (
        <FaCheckCircle
          className="todo-item-checkbox"
          style={{ color: 'green', cursor: 'pointer' }}
          onClick={handleCheckChange}
        />
      ) : (
        <FaCheckCircle
          className="todo-item-checkbox"
          style={{ color: 'lightgray', cursor: 'pointer' }}
          onClick={handleCheckChange}
        />
      )}

      {edited ? (
        <input
          type="text"
          className="todo-item-edit-input"
          value={newText}
          onChange={(e) => {
            setNewText(e.target.value)
          }}
        />
      ) : (
        <span
          className={`todo-item-content ${
            todo.complete ? 'todo-item-content-checked' : ''
          }`}
        >
          {newText}
        </span>
      )}

      {todo.complete ? null : edited ? (
        <button className="todo-item-submit-btn" onClick={handleSubmit}>
          ✔
        </button>
      ) : (
        <button className="todo-item-edit-btn" onClick={handleEditChange}>
          ✏
        </button>
      )}

{/* 직접쓰는 거면 ()=>{} 구조로 만들어야 함 */}
      <button className="todo-item-delete-btn" onClick={()=>handleDelete(todo.id)}>🗑</button>
    </li>
  )
}

export default Todoitem
