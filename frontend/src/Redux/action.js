import * as types from "./actionTypes";
import axios from "axios";

// const base_url = `http://localhost:8080`;
const base_url = `https://cointab-backend-api.onrender.com`;

export const getUsers = (params) => (dispatch) => {
  dispatch({ type: types.GET_USERS_REQUEST });
  return axios
    .get(`${base_url}/users`, params)
    .then((res) => {
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
    .delete(`${base_url}/users/delete`)
    .then((res) => {
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
