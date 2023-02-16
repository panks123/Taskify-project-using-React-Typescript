import { useRef } from 'react'
import './InputField.css'

type InputFieldProps = {
  todo: string
  setTodo: React.Dispatch<React.SetStateAction<string>>
  handleAdd: (e: React.FormEvent) => void
}

const InputField = ({ todo, setTodo, handleAdd }: InputFieldProps) => {

  const inputRef = useRef<HTMLInputElement>(null)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value)
  }

  return (
    <form className='input' onSubmit={(e: React.FormEvent) => {
      handleAdd(e)
      inputRef.current?.blur() // On submitting the form it will remove the focus from the input element
    }
    }>
      <input type='text' placeholder='Enter a task' className='input__box' value={todo} onChange={handleChange} ref={inputRef}/>
      <button type='submit' className='input__submit'>Go</button>
    </form>
  )
}

export default InputField
