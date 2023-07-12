import { configureStore } from "@reduxjs/toolkit";

// 초기 상태
const initialState = {
  props: {},
};

// 액션 타입 정의
const SET_PROPS = "SET_PROPS";

// 액션 생성자 함수
export const setProps = (props) => ({
  type: SET_PROPS,
  payload: props,
});

// 리듀서 함수
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PROPS:
      return {
        ...state,
        props: action.payload,
      };
    default:
      return state;
  }
};

// Redux store 생성
const store = configureStore({
  reducer,
});

export default store;
