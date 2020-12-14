import * as types from './types';
import axios from 'axios';

import { setAlert } from '../actions/alert';

// register user
export const register = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ name, email, password });
  try {
    const res = await axios.post('/api/users', body, config);

    dispatch({
      type: types.REGISTER_SUCCESS,
      payload: res.data,
    });
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
