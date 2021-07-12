const initState = {
  posts: [],
  post: null,
  loading: true,
  error: {}
}

export default function(state = initState, action) {
  const {type, payload} = action

  switch (type) {
    case 'GET_POSTS':
      return {
        ...state,
        posts: payload,
        loading: false
      }
  
    default:
      return state
  }
}