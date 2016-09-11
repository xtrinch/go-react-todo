const todo = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        title: action.text,
        completed: false
      }
    case 'TOGGLE_TODO':
      if (state.id !== action.todo.id) {
        return state
      }
      return Object.assign({}, state, {
        completed: !state.completed
      })

    default:
      return state
  }
}

const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        todo(undefined, action)
      ]
    case 'TOGGLE_TODO':
      return state.map(t =>
        todo(t, action)
      )
    case 'RECEIVE_TODO':
        return [
            ...state,
            action.todo
        ]
    case 'RECEIVE_TODOS':
        return action.todos
    case 'RECEIVE_DELETE_TODO':
        return state.filter(function(item) {
            return item.id != action.id
        })
    case 'RECEIVE_UPDATE_TODO':
        var updated_array =
            state.filter(function(item) {
                if (item.id == action.todo.id) {
                    item.completed = action.todo.completed
                }
                return true
            })
        return updated_array
    default:
      return state
  }
}

export default todos
