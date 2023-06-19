import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import TodoItem from './TodoItem';

const TodoListBlock = styled.div`
  flex: 1;
  padding: 20px 32px;
  padding-bottom: 48px;
  overflow-y: auto;
`;

function TodoList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getTodos()
  }, [])

  const getTodos = async() => {
    try {
      const req = await fetch("http://localhost:8000/api", {
        headers: {
          'content-type': 'application/json',
        }
      })
      const result = await req.json();
      setTodos(result.data)
      console.log(result.data);
    } catch (e){
      console.log(e);
    }
  }
  return (
    <TodoListBlock>
      {todos.map((item) => (
        <TodoItem key={item.id} text={item.content} done={item.status === "Incomplete" ? false : true} />  
      ))}
    </TodoListBlock>
  );
}

export default TodoList;