import api from '../utils/api';
import {setAlert} from './alert'

import * as types from './types'

export const getPosts = () => async (dispatch) => {
  try {
    const res = await api.get('/posts')

    dispatch({
      type: types.GET_POSTS,
      payload: res.data,
    })
  } catch (error) {
    dispatch({
      type: types.PROFILE_ERROR,
      payload: {msg: error.response.statusText, status: error.response.status}
    })
  }
}