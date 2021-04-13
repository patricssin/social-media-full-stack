import axios from 'axios'
import {setAlert} from './alert'

import * as types from './types'

// get cur user's profiles
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get('api/profile/me')

    dispatch({
      type: types.GET_PROFILE,
      payload: res.data,
    })
  } catch (error) {
    dispatch({
      type: types.PROFILE_ERROR,
      payload: {msg: error.response.statusText, status: error.response.status}
    })
  }
}

// get all user's profiles
export const getAllProfiles = () => async (dispatch) => {
  dispatch({type: types.CLEAR_PROFILE})
  try {
    const res = await axios.get('api/profile')

    dispatch({
      type: types.GET_PROFILES,
      payload: res.data,
    })
  } catch (error) {
    dispatch({
      type: types.PROFILE_ERROR,
      payload: {msg: error.response.statusText, status: error.response.status}
    })
  }
}

// get all user's profiles
export const getProfileById = userId => async (dispatch) => {
  dispatch({type: types.CLEAR_PROFILE})
  try {
    const res = await axios.get(`api/profile/user/${userId}`)

    dispatch({
      type: types.GET_PROFILE,
      payload: res.data,
    })
  } catch (error) {
    dispatch({
      type: types.PROFILE_ERROR,
      payload: {msg: error.response.statusText, status: error.response.status}
    })
  }
}

// get github repo
export const getGithubRepo = userName => async (dispatch) => {
  dispatch({type: types.CLEAR_PROFILE})
  try {
    const res = await axios.get(`api/profile/github/${userName}`)

    dispatch({
      type: types.GET_REPOS,
      payload: res.data,
    })
  } catch (error) {
    dispatch({
      type: types.PROFILE_ERROR,
      payload: {msg: error.response.statusText, status: error.response.status}
    })
  }
}

// create or update profile
export const createProfile = (formData, history, edit = false) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type' : 'application/json'
      }
    }
    const res = axios.post('/api/profile',formData, config)

    dispatch({
      type: types.GET_PROFILE,
      payload: res.data,
    })
    dispatch(setAlert(edit ? 'Profile updated' : 'Profile created', 'success'))

    // redirect by history
    if (!edit) {
      history.push('/dashboard')
    }
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((err) => {
        dispatch(setAlert(err.msg, 'danger'));
      });
    }

    dispatch({
      type: types.PROFILE_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    })
  }
}

// add experiencee
export const addExperience = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type' : 'application/json'
      }
    }
    const res = axios.put('/api/profile/experience',formData, config)

    dispatch({
      type: types.UPDATE_PROFILE,
      payload: res.data,
    })
    dispatch(setAlert('Experience added.', 'success'))

    // redirect by history
    history.push('/dashboard')
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((err) => {
        dispatch(setAlert(err.msg, 'danger'));
      });
    }

    dispatch({
      type: types.PROFILE_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    })
  }
}

// add education
export const addEducation = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type' : 'application/json'
      }
    }
    const res = axios.put('/api/profile/education',formData, config)

    dispatch({
      type: types.UPDATE_PROFILE,
      payload: res.data,
    })
    dispatch(setAlert('Education added.', 'success'))

    // redirect by history
    history.push('/dashboard')
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((err) => {
        dispatch(setAlert(err.msg, 'danger'));
      });
    }

    dispatch({
      type: types.PROFILE_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    })
  }
}

// delete experience
export const deleteExperience = id => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/experience/${id}`)
    dispatch({
      type: types.UPDATE_PROFILE,
      payload: res.data,
    })
    dispatch(setAlert('Experience delete.', 'success'))
  } catch (err) {
    dispatch({
      type: types.PROFILE_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    })
  }
}

// delete education
export const deleteEducation = id => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/education/${id}`)
    dispatch({
      type: types.UPDATE_PROFILE,
      payload: res.data,
    })
    dispatch(setAlert('Education delete.', 'success'))
  } catch (err) {
    dispatch({
      type: types.PROFILE_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    })
  }
}

// delete account
export const deleteAccount = () => async (dispatch) => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    try {
      const res = await axios.delete('/api/profile')
      dispatch({type: types.CLEAR_PROFILE})
      dispatch({type: types.ACCOUNT_DELETED})
      dispatch(setAlert('Your account has been permanently deleted.'))
    } catch (err) {
      dispatch({
        type: types.PROFILE_ERROR,
        payload: {msg: err.response.statusText, status: err.response.status}
      })
    }
  }
}