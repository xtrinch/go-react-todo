import React, { PropTypes } from 'react'
import Todo from './todo.jsx'

class TodoList extends React.Component {
    render() {
        const { todos, onTodoClick } = this.props
        console.log(this.props)
        /*this.props.todos = [
            {
                "title": "test",
                "id": 1,
                "completed": false
            }
        ]*/
        return (
            <ul>
              {todos.map(todo =>
                <Todo
                  key={todo.id}
                  {...todo}
                  onClick={() => onTodoClick(todo.id)}
                />
              )}
            </ul>
        );
    }
}

/*const TodoList = ({ todos, onTodoClick }) => (
  <ul>
    {todos.map(todo =>
      <Todo
        key={todo.id}
        {...todo}
        onClick={() => onTodoClick(todo.id)}
      />
    )}
  </ul>
)*/

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired).isRequired,
  onTodoClick: PropTypes.func.isRequired
}

export default TodoList
