import axios from 'axios'
import {setAlert} from './alert'

import * as types from './types'

// get cur user's profiles
export const getCurrentProfile = () => async (dispacth) => {
  try {
    const res = await axios.get('api/profile/me')

    dispacth({
      type: types.GET_PROFILE,
      payload: res.data,
    })
  } catch (error) {
    dispacth({
      type: types.PROFILE_ERROR,
      payload: {msg: error.response.statusText, status: error.response.status}
    })
  }
}