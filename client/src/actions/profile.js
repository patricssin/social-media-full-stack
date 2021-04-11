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