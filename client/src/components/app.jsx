import React from 'react'
import Footer from './footer.jsx'
import AddTodo from '../containers/addtodo.jsx'
import VisibleTodoList from '../containers/visibletodolist.jsx'

const App = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
)

export default App
