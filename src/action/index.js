import * as actionTypes from "./types";

export const login = (userInfo) => {
  return {
    type: actionTypes.LOGIN,
    payload: userInfo,
  };
};

export const logout = () => {
  return {
    type: actionTypes.LOGOUT,
  };
};

export const registerUser = (userData) => {
  return {
    type: actionTypes.REGISTER_USER,
    payload: userData,
  };
};

export const addItem = (item) => {
  return {
    type: actionTypes.ADD_ITEM,
    payload: item,
  };
};

export const deleteItem = (itemId) => {
  return {
    type: actionTypes.DELETE_ITEM,
    payload: itemId,
  };
};
