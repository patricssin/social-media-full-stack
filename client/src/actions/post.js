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
// remove likes
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
// delete post
export const deletePost = postId => async (dispatch) => {
  try {
    const res = await api.put(`/posts/unlike/${postId}`)

    dispatch({
      type: types.DELETE_POST,
      payload: postId,
    })

    dispatch(setAlert('Post removed.', 'success'))
  } catch (error) {
    dispatch({
      type: types.PROFILE_ERROR,
      payload: {msg: error.response.statusText, status: error.response.status}
    })
  }
}
// add post
export const addPost = formData => async (dispatch) => {
  try {
    const res = await api.post('/posts', formData)

    dispatch({
      type: types.ADD_POST,
      payload: res.data,
    })

    dispatch(setAlert('Post created.', 'success'))
  } catch (error) {
    dispatch({
      type: types.PROFILE_ERROR,
      payload: {msg: error.response.statusText, status: error.response.status}
    })
  }
}
// get post
export const getPost = id => async (dispatch) => {
  try {
    const res = await api.get(`/posts/${id}`)

    dispatch({
      type: types.GET_POST,
      payload: res.data,
    })
  } catch (error) {
    dispatch({
      type: types.PROFILE_ERROR,
      payload: {msg: error.response.statusText, status: error.response.status}
    })
  }
}
// add comment
export const addComment = (postId, formData) => async (dispatch) => {
  try {
    const res = await api.post(`/posts/comment/${postId}`, formData)

    dispatch({
      type: types.ADD_COMMENT,
      payload: res.data,
    })

    dispatch(setAlert('Comment added.', 'success'))
  } catch (error) {
    dispatch({
      type: types.PROFILE_ERROR,
      payload: {msg: error.response.statusText, status: error.response.status}
    })
  }
}
// delete comment
export const deleteComment = (postId, commentId) => async (dispatch) => {
  try {
    const res = await api.delete(`/posts/comment/${postId}/${commentId}`)

    dispatch({
      type: types.DELETE_COMMENT,
      payload: commentId,
    })

    dispatch(setAlert('Comment deleted.', 'success'))
  } catch (error) {
    dispatch({
      type: types.PROFILE_ERROR,
      payload: {msg: error.response.statusText, status: error.response.status}
    })
  }
}