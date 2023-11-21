import React, { useRef } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useDispatch, useSelector } from 'react-redux'
// react-redux 명령을 내리기 위한 Action 불러오기
import {TodoReducerActions} from '../redux/reducers/todoSlice'
// 원래 v4라고 하는데, 구분이 잘 안되니까 uuid라는 별칭을 붙여 사용하겠다.



const TodoInput = () => {
  const todoInputRef = useRef(null)
  // store -> reducer (=todo) -> reducer
  const todos = useSelector((state) => state.todo.todos)
  const dispatch = useDispatch()

  const handleTodoInput = () => {
    let todo = todoInputRef.current // input 요소.value
      // setTodos([
      //   ...todos,
      //   { id: uuidv4(), text: todo.value, complete: false },
      // ])
      dispatch(
        TodoReducerActions.addTodo({
          id: uuidv4(),
          text: todo.value,
          complete: false,
        })
      )

    todo.value = ''
    todo.focus()
  }
  return (
    <div className="todo-inputbox">
      <input
        type="text"
        className="todo-inputbox-input"
        placeholder="할 일을 입력해주세요."
        ref={todoInputRef}
      />
      <input
        type="button"
        className="todo-inputbox-add-btn"
        value="등록"
        onClick={handleTodoInput}
      />
    </div>
  )
}

export default TodoInput
