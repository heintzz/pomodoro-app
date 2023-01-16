function tokenReducer(state = '', action) {
  switch (action.type) {
    case 'INSERT_TOKEN':
      return { ...state, accessToken: action.payload }
    default:
      return state
  }
}

export default tokenReducer
