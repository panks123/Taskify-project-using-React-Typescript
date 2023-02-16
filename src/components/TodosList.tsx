import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import { Todo } from '../types/model'
import TododCard from './TodoCard'

import './TodosList.css'

type TodosListProps = {
  todos: Todo[]
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
  completedTodos: Todo[]
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const TodosList = ({ todos, setTodos, completedTodos, setCompletedTodos }: TodosListProps) => {
  return (

    <div className="container">
      {/* Create a droppable zone */}
      <Droppable droppableId='TodosListActive'>
        {
          (provided, snapshot) => (
            // Active tasks
            
            <div className={`todos active ${snapshot.isDraggingOver ? 'dragactive': ''}`} ref={provided.innerRef} {...provided.droppableProps}>
              <span className='todos__heading'>Active tasks</span>
              {
                todos.length === 0 ? <div className='message'>No tasks in this list</div> :

                todos.map((todo, index) => <TododCard 
                index = {index}
                todo={todo} 
                key={todo.id} 
                todos={todos} 
                setTodos={setTodos} />)
              }

              {provided.placeholder}
            </div>
          )
        }

      </Droppable>

      {/* Create another droppable zone for completed tasks */}
      <Droppable droppableId='TodosListCompleted'>
        {
          (provided, snapshot) => (
            // Completed
            <div className={`todos complete ${snapshot.isDraggingOver ? 'dragcomplete': ''}`} ref={provided.innerRef} {...provided.droppableProps}>
              <span className='todos__heading'>Completed tasks</span>
              {
                completedTodos.length === 0 ? <div className='message'>No tasks in this list</div> :

                completedTodos.map((todo, index) => <TododCard 
                index = {index}
                todo={todo} 
                key={todo.id} 
                todos={todos} 
                setTodos={setCompletedTodos}
                flagComplete = {true} />)
              }

              {/* Below line will place an empty place(the placeholder) while we are dragging */}
              {provided.placeholder} 
            </div>
          )
        }

      </Droppable>
    </div>
  )
}

export default TodosList



