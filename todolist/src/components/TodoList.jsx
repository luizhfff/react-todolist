import React, { useState } from 'react'

const compare = (a, b) => {
  if (a.id < b.id) {
    return 1;
  }
  if (a.id > b.id) {
    return -1;
  }
  return 0;
}

const TodoList = () => {
  const [list, setList] = useState([])
  const [userInput, setUserInput] = useState('')
  const [isEdit, setIsEdit] = useState(false)
  const [tempElemEdit, setTempElemEdit] = useState()

  const addToTheList = () => {
    let tempList = list
    let newElement = {
      id: Date.now(),
      text: userInput
    }
    tempList.push(newElement)
    setList(tempList)
    setUserInput('')
  }

  const removeFromTheList = (id) => {
    let tempList = list.filter(element => element.id !== id)
    setList(tempList)
  }

  const loadEdit = (id) => {
    setIsEdit(true)
    let index = list.findIndex(element=> element.id === id)
    setTempElemEdit({
      id: list[index].id,
      text: list[index].text,
      index
    })
    setUserInput(list[index].text)
  }

  const pushEdit = () => {
    let tempList = list
    tempList[tempElemEdit.index] = {
      id: Date.now(),
      text: userInput
    }
    setList(tempList)
    setIsEdit(false)
    setUserInput('')
  }

  const cancelEdit = () => {
    setIsEdit(false)
    setUserInput('')
  }

  const displayAdd = () => {
    return (
      <>
        <h1>Add</h1>
        <div>
          <input value={userInput} type='text' onChange={(e) => setUserInput(e.target.value)} />
          <button onClick={() => addToTheList()}>Add</button>
        </div>
      </>
    )
  }

  const displayEdit = () => {
    return (
      <>
        <h1>Edit</h1>
        <div>
          <input value={userInput} type='text' onChange={(e) => setUserInput(e.target.value)} />
          <button onClick={() => pushEdit()}>Edit</button>
          <button onClick={() => cancelEdit()}>Cancel</button>
        </div>
      </>
    )
  }

  return (
    <>
      {isEdit ? displayEdit() : displayAdd()}
      <h1>To Do List</h1>
      <div>
        {
          list && list.sort(compare).map((element, index) => (
            <div key={index}>{`${element.text}`} <button onClick={() => loadEdit(element.id)}>Edit</button><button onClick={() => removeFromTheList(element.id)}>Delete</button></div>
          ))
        }
      </div>
    </>
  )
}

export default TodoList