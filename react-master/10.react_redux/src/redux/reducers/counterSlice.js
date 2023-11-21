import { createSlice } from '@reduxjs/toolkit'

// createSlice() : state, reducer 함수를 관리하는 함수
// - state 초기화
// - state를 변경하는 함수 정의 -> reducer

export const counterSlice = createSlice({
  // name: reducer의 특정 이름을 정의하는 속성
  // initialState: state를 초기화하는 속성
  name: 'counter',
  initialState: {
    count: 10,
  },
  //reducers: reduce들을 관리하는 속성
  // reducer함수 정의시, 매개변수로 항상 state 정의.
  // 정의한 state는 initialState를 가르킴. 해당 객체 전체를 가르키니까
  // 여러 state를 가져올 수 있음 그 안의 객체에서 하나씩 접근

  // reducers: 컴포넌트에서 state변경 요청시 수행하는 Action기능을 정의하는 속성
  reducers: {
    increment: (state) => {
      // 원랜 ...state 등 해서 복사해서 넣구 그랬는데 redux는 바로 할 수 있음
      state.count += 1
    },
    decrement: (state) => {
      state.count -= 1
    },
    // 넘겨받은 숫자를 이용해 state를 변경하는 함수 정의하기
    // action -> {type, payload} 형태로 반환
    // type: 명령 타입 ex) 숫자를 증가해라(increment), 숫자를 감소해라(decrement)
    // payload: 외부로부터 넘겨받은 데이터를 저장하는 속성
    incrementByAmount: (state, action) => {
      console.log('counterSlice action:', action)
      //   action -> {type: 'counter/incrementByAmount', payload:{num:2}}
      state.count += action.payload.num
    },
    decrementByAmount: (state, action) => {
      console.log('counterSlice action:', action)
      //   action -> {type: 'counter/decrementByAmount', payload:{num:2}}
      state.count -= action.payload.num
    },
  },
})

// 함수를 실행할 때 액션으로 매핑하는데, "액션"에 자동으로 매핑되는 값은 reducers
// 컴포넌트에서 reducer함수를 실행할 수 있게 내보내기
// export const { increment, decrement, incrementByAmount } = counterSlice.actions
export const CountReducerActions = counterSlice.actions

// store에서 접근할 수 있도록 내보내기
export default counterSlice.reducer
