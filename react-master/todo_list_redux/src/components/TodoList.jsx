import React from 'react'
import TodoItem from './TodoItem.jsx'
import {useSelector} from 'react-redux'
// { title, todos, setTodos, checked }
const Todolist = ({ title, checked }) => {
  return (
    <div>
      <div className="todo-list">
        <p className="todo-list-tit">
          [{title} : {todos.lengths}개]
        </p>
        <ul className="todo-list-ul">
          {todos &&
            todos.map((todo) => {
              if (checked === todo.complete) {
                return (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                  />
                )
              } else {
                return null
              }
            })}
        </ul>
      </div>
    </div>
  )
}

export default Todolist
