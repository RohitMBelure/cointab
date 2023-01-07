import * as types from "./actionTypes";
import axios from "axios";

export const getUsers = (params) => (dispatch) => {
  dispatch({ type: types.GET_USERS_REQUEST });
  return axios
    .get(`http://localhost:8080/users`, params)
    .then((res) => {
      // console.log(res.data);
      return dispatch({
        type: types.GET_USERS_SUCCESS,
        payload: res.data.data,
        message: res.data.message,
        count: res.data.count,
        totalPages: res.data.totalPages,
        currentPage: res.data.currentPage,
      });
    })
    .catch((err) => {
      return dispatch({ type: types.GET_USERS_FAILURE, payload: err });
    });
};

export const deleteUsers = () => (dispatch) => {
  dispatch({ type: types.DELETE_USERS_REQUEST });
  return axios
    .delete("http://localhost:8080/users/delete")
    .then((res) => {
      // console.log(res.data);
      return dispatch({
        type: types.DELETE_USERS_SUCCESS,
        payload: res.data.data,
        message: res.data.message,
      });
    })
    .catch((err) => {
      return dispatch({ type: types.DELETE_USERS_FAILURE, payload: err });
    });
};
