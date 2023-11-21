import React, { useState } from 'react'
import TodoInput from '../components/TodoInput'
import TodoList from '../components/TodoList'

const TodoHome = () => {
  return (
    <div>
      <div className="todo-container">
        <h1 className="todo-list">ToDo List</h1>
        <TodoInput />
        {/* checkList는 todos에서 complete값을 받아서 이걸 filter로 거른 다음에 true/false 로 나눠서 하면 됨 */}
        <TodoList title="해야할 일" checked={false} />
        <TodoList title="완료한 일" checked={true} />
      </div>
    </div>
  )
}

export default TodoHome
