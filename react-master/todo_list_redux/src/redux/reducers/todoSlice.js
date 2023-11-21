import { createSlice } from '@reduxjs/toolkit'

// createSlice() : state, reducer 함수를 관리하는 함수
// - state 초기화
// - state를 변경하는 함수 정의 -> reducer

export const todoSlice = createSlice({
  name: 'todo',
  initialState: {
    todos: [],
  },
  reducers: {
    // state = todos / action = todoinput으로부터 넘겨받은 값을 받아 줌
    addTodo: (state, action) => {
      console.log(action)
      // 전체코드를 기존 배열을 복사한 뒤 action값을 뒤에 붙여 새로이 대입
      state.todos = state.todos.concat(action.payload)
    },
    checkChangeTodo: (state, action) => {
      state.todos = state.todos.map((item) => ({
        ...item,
        complete: item.id === action.payload.id ? !item.complete : item.complete,
      }))
    },
    textChangeTodo: (state, action) => {
      state.todos = state.todos.map((item) => ({
        ...item,
        text: item.id === action.payload.id ? action.payload.text : item.text,
      }))
    },
    deleteChangeTodo: (state, action) => {
      state.todos = state.todos.filter((item)=> item.id !== action.payload.id )
    },
  },
})

// conponenet 접근
export const TodoReducerActions = todoSlice.actions

// store 접근
export default todoSlice.reducer
