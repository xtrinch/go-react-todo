import fetch from 'isomorphic-fetch';

let nextTodoId = 0
export const addTodo = (text) => {
    return dispatch => {
      dispatch(sendTodo()),
      fetch(`/api/v1/todos/`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              title: text
          })
      })
          .then(req => req.json())
          .then(json => dispatch(receiveTodo(json)));
    }
}

export const sendTodo = () => {
    return {
        type: 'SEND_TODO'
    }
}

export const receiveTodo = (json) => {
    return {
        type: 'RECEIVE_TODO',
        todo: json
    }
}

export const deleteTodo = (id) => {
    return dispatch => {
        dispatch(sendTodo()),
        fetch(`/api/v1/todos/`+id, {
            method: 'DELETE'
        }).then(dispatch(receiveDeleteTodo(id)));
    }
}

export const receiveDeleteTodo = (id) => {
    return {
        type: 'RECEIVE_DELETE_TODO',
        id: id
    }
}

export const updateTodo = (todo) => {
    return dispatch => {
        dispatch(toggleTodo(todo)),
        fetch(`/api/v1/todos/`+todo.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(todo)
        }).then(dispatch(receiveUpdateTodo(todo)));
    }
}

export const receiveUpdateTodo = (todo) => {
    return {
        type: 'RECEIVE_UPDATE_TODO',
        todo: todo
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
        updatedAt: Date.now()
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

export const toggleTodo = (todo) => {
  return {
    type: 'TOGGLE_TODO',
    todo: todo
  }
}
