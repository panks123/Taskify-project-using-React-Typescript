import React, { useEffect, useRef, useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import { Todo } from '../types/model'

import './TodoCard.css'

type TodoCardProps = {
  index: number // index prop is aded to recognize which todo is being dragged
  todo: Todo
  todos: Todo[]
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
  flagComplete?: boolean
}
const TododCard = ({ index, todo, todos, setTodos, flagComplete}: TodoCardProps) => {

  /* Edit functionality of a todo */
  const [edit, setEdit] = useState<boolean>(false) // this state keeps track of whether the editing mode for a todo is turned on or off

  const [todoContent, setTodoContent] = useState(todo.todo) // this one is to keep the content of the todo while editing the todo

  const handleTodoInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoContent(e.target.value)
  }

  const handleUpdateTodo = (e: React.FormEvent, id: number) => {
    e.preventDefault()

    setTodos((todos) => {
      return todos.map((todo) => {
        return todo.id === id ? { ...todo, todo: todoContent } : todo
      })
    })
    // after updating the todo - set the edit mode to OFF
    setEdit((edit) => !edit)
  }

  const inputRef = useRef<HTMLInputElement>(null)

  // to focus automatically when edit button is clicked
  useEffect(() => {
    inputRef.current?.focus()
  }, [edit])

  const handleDelete = (id: number) => {
    setTodos((todos) => todos.filter((todo) => {
      return todo.id !== id
    }))
  }

  return (
    // make it draggable
    <Draggable draggableId={todo.id.toString()} index={index}>
      {
        (provided, snapshot) => {
          return (
            <form
              className={`todo-card ${snapshot.isDragging ? "drag" : ''}`}
              onSubmit={(e) => handleUpdateTodo(e, todo.id)}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}>
              {
                // if edit mode is On then display an input box 
                edit ? (
                  <>
                    <input ref={inputRef} type='text' value={todoContent} onChange={handleTodoInputChange} className='todo-card__text' />
                    <input type='submit' value='update' className='btn-update' />
                  </>
                ) :
                  (
                    // else display the todo in normal mode
                    <span className="todo-card__text"> {todo.todo} </span>
                  )
              }

              <div>
                {
                  !flagComplete ? <span className="icon" onClick={() => {
                    if (!edit && !todo.isDone) {
                      setEdit((edit) => !edit)
                    }
                  }}>
                    <AiOutlineEdit />
                  </span>: <></>
                }
                

                <span className="icon" onClick={() => handleDelete(todo.id)}>
                  <AiOutlineDelete />
                </span>
              </div>
            </form>
          )
        }
      }

    </Draggable>
  )
}

export default TododCard
