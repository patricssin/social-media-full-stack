import * as types from './types';
import api from '../utils/api';
import { setAlert } from '../actions/alert';
import setAuthToken from '../utils/setAuthToken';

// load user
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await api.get('/auth');

    dispatch({
      type: types.USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: types.AUTH_ERROR,
    });
  }
};

// register user
export const register = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ name, email, password });
  try {
    const res = await api.post('/users', body, config);

    dispatch({
      type: types.REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((err) => {
        dispatch(setAlert(err.msg, 'danger'));
      });
    }
    dispatch({
      type: types.REGISTER_FAIL,
    });
  }
};

// login user
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ email, password });
  try {
    const res = await api.post('/auth', body, config);

    dispatch({
      type: types.LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((err) => {
        dispatch(setAlert(err.msg, 'danger'));
      });
    }
    dispatch({
      type: types.LOGIN_FAIL,
    });
  }
};

// logout / Clear profile
export const logout = () => (dispatch) => {
  dispatch({
    type: types.CLEAR_PROFILE,
  });
  dispatch({
    type: types.LOGOUT,
  });
};
