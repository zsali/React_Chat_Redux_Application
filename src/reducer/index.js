import { combineReducers } from "redux";
import * as actionTypes from "../action/types";

const initialLoginState = {
  user: {},
};

const user_login = (state = initialLoginState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return {
        ...state,
        user: action.payload,
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        user: {},
      };
    default:
      return state;
  }
};

const registerInitialState = {
  user: null,
};

const registerReducer = (state = registerInitialState, action) => {
  switch (action.type) {
    case actionTypes.REGISTER_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

const msgInitialState = {
  items: [],
};

const msgReducer = (state = msgInitialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_ITEM:
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case actionTypes.DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  user: user_login,
  regiser: registerReducer,
  msg: msgReducer,
});

export default rootReducer;
