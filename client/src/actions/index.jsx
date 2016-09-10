import fetch from 'isomorphic-fetch';

let nextTodoId = 0
export const addTodo = (text) => {
  return {
    type: 'ADD_TODO',
    id: nextTodoId++,
    text
  }
}

export const deleteTodo = (id) => {
    return {
        type: 'DELETE_TODO',
        id: id
    }
}

export const clearTodo = () => {
    return {
        type: 'CLEAR_TODO'
    }
}

export const requestTodos = () => {
    return {
        type: 'REQUEST_TODOS'
    }
}

export const receiveTodos = (json) => {
    return {
        type: 'RECEIVE_TODOS',
        todos: json,
        receivedAt: Date.now()
    }
}

export const getTodos = () => {
    return dispatch => {
        dispatch(requestTodos()),
        fetch(`/api/v1/todos/`)
            .then(req => req.json())
            .then(json => dispatch(receiveTodos(json)));
  }
}


export const setVisibilityFilter = (filter) => {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter
  }
}

export const toggleTodo = (id) => {
  return {
    type: 'TOGGLE_TODO',
    id
  }
}
