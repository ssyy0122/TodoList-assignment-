import './App.css';
import styled, { createGlobalStyle } from "styled-components";
import TodoTemplate from "./components/TodoTemplate";
import TodoHead from "./components/TodoHead";
import TodoList from './components/TodoList';
import TodoCreate from './components/TodoCreate';
import { TodoProvider } from './components/TodoContext';



const GlobalStyle = createGlobalStyle`
  body {
    background: #e9ecef;
  }
`;

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function App() {
  return (
    <Wrapper>
      <TodoProvider>
        <GlobalStyle />
        <TodoTemplate>
          <TodoHead />
          <TodoList/>
          <TodoCreate/>
        </TodoTemplate>
      </TodoProvider>
    </Wrapper>
  );
}

export default App;