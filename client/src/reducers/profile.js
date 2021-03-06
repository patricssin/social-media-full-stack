const initState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {}
}

export default function(state = initState, action) {
  const {type, payload} = action

  switch (type) {
    case 'GET_PROFILE':
    case 'UPDATE_PROFILE':
      return {
        ...state,
        profile: payload,
        loading: false
      }
    case 'PROFILE_ERROR':
      return {
        ...state,
        error: payload,
        loading: false,
        profile: null,
      }
    case 'GET_PROFILES':
      return {
        ...state,
        profiles: payload,
        loading: false
      }
    case 'GET_REPOS':
      return {
        ...state,
        repos: [...payload],
        loading: false
      }
    case 'CLEAR_PROFILE':
      return {
        ...state,
        profile: null,
        loading: true,
        repos: []
      }
  
    default:
      return state
  }
}