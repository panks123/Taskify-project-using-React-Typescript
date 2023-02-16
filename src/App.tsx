import { useState } from 'react';
import './App.css';
import InputField from './components/InputField';
import TodosList from './components/TodosList';
import { DragDropContext, DropResult} from 'react-beautiful-dnd'
import { Todo } from './types/model';

const  App: React.FC = ()=> { // React.FC is for Functional Component, this type is Provided by React

  const [todo, setTodo] = useState("")

  const [todos, setTodos] = useState<Todo[]>([])
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([])

  const handleAddTodo = (e: React.FormEvent)=>{
    e.preventDefault()
    
    if(todo)
      setTodos((todos)=> [...todos, { id: Date.now(), todo, isDone: false}])

    setTodo("")
  }

  // This function will be executed whenever drag event is completed i.e. whenever dragging and dropping of todos is completed
  const handleOnDragEnd = (result: DropResult)=>{

    const { source, destination } = result // source is draggableId from where we are dragging the todo and 
                                          // destination is the draggableId to which we are dropping the todo

    // check for valid destination

    // If we are dropping somewhere which is not a droppable zone Or
    // Or if we are dropping in the same place
    if((!destination) || (destination.droppableId === source.droppableId && destination.index === source.index)) return // do nothing

    // else

    let add; // this variable will keep the todo being dragged
    let active = todos
    let complete = completedTodos
    // check the source droppableId - if it is from the TodosListActive - 
    // then we need to remove from active list and move it to completed list
    if(source.droppableId === 'TodosListActive')
    {
      add = active[source.index] // extract the exact todo from the active todos
      // then remove the todo from the active list
      active.splice(source.index, 1) // remove one todo at source.index
    }
    // if it is from the TodosListCompleted
    else
    {
      add = complete[source.index] // extract the exact todo from the completed todos
      // then remove the todo from the completed list
      complete.splice(source.index, 1) // remove one todo at source.index
    }

    // now check the destination
    // If the destination is 'TodosListActive'
    if(destination.droppableId === 'TodosListActive')
    {
        // we have to add the todo stored in 'add' variable to completed list
        active.splice(destination.index, 0, add)
    }
     // If the destination is 'TodosListCompleted'
     else{
        complete.splice(destination.index, 0, add)
     }

     // after maniplutating the temporary variables 'active' and 'complete'

     // Finally we'll  set the states
     setCompletedTodos(complete)
     setTodos(active)
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div className="App">
        <span className='heading'>Taskify</span>
        <InputField todo={todo} setTodo = {setTodo} handleAdd = {handleAddTodo}/>
        <TodosList todos={todos} setTodos = {setTodos} completedTodos = {completedTodos} setCompletedTodos = {setCompletedTodos}/>
    </div>
    </DragDropContext>
  );
}

export default App;
