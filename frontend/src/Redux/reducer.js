import * as types from "./actionTypes";

const initialState = {
  usersData: [],
  count: 0,
  totalPages: 0,
  currentPage: 1,
  isLoading: false,
  isError: false,
};

export const reducer = (state = initialState, action) => {
  const { type, payload, count, totalPages, currentPage } = action;
  switch (type) {
    case types.GET_USERS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case types.GET_USERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        usersData: payload,
        count: count,
        totalPages: totalPages,
        currentPage: currentPage,
      };
    case types.GET_USERS_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case types.DELETE_USERS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case types.DELETE_USERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        usersData: payload,
      };
    case types.DELETE_USERS_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      return state;
  }
};
