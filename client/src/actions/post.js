import api from '../utils/api';
import {setAlert} from './alert'

import * as types from './types'
// get all posts
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
// add likes
export const addLikes = postId => async (dispatch) => {
  try {
    const res = await api.put(`/posts/like/${postId}`)

    dispatch({
      type: types.UPDATE_LIKES,
      payload: {id: postId, likes: res.data},
    })
  } catch (error) {
    dispatch({
      type: types.PROFILE_ERROR,
      payload: {msg: error.response.statusText, status: error.response.status}
    })
  }
}
// removelikes
export const removeLikes = postId => async (dispatch) => {
  try {
    const res = await api.put(`/posts/unlike/${postId}`)

    dispatch({
      type: types.UPDATE_LIKES,
      payload: {id: postId, likes: res.data},
    })
  } catch (error) {
    dispatch({
      type: types.PROFILE_ERROR,
      payload: {msg: error.response.statusText, status: error.response.status}
    })
  }
}