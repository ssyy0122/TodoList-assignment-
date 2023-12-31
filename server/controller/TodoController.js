const db = require("../models");
const TodoService = require("../services/TodoService");

const Todo = require("../models").Todo;

class TodoController {
    todoService = new TodoService();
    //todo생성
    createTodo = async (req, res) => {
        const { content } = req.body;

        try {
            const createTodoData = await this.todoService.createTodos(content);
            console.log(createTodoData)
            res.status(201).json({ data: { id: createTodoData.id, content: createTodoData.content,} });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Todo 생성 실패' });
        }
    }
    
    //todo 모두조회
    findAllTodo = async (req, res, next) => {
        try {
            const todos = await this.todoService.findAllTodo();
            res.status(200).json({ data: todos });
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Todo 조회 실패' });
        }
    }
    //todo 수정
    updateTodo = async (req, res, next) => {
   
        const  content =  req.body.content;
        const { id } = req.params;
        try{
            const updateTodo = await this.todoService.updateTodo(id, updateData);
            res.status(200).json({ data: updateTodo });
        } catch (error){
            res.status(500).json({ error: '수정 실패' });
        }
    }
    // todo 삭제
    deleteTodo = async (req, res, next) => {
        const { id } = req.params;
        try {
            await this.todoService.deleteTodo(id);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: '삭제 실패' });
        }
    };
    //todo 모두 삭제
    async deleteAllTodos(req, res) {
        try {
          const deletedRows = await this.todoRepository.deleteAllTodos();
          res.json({ message: `${deletedRows}개의 할일 삭제됨` });
        } catch (error) {
          console.log(error);
          res.status(500).json({ error: '할일 삭제 실패' });
        }
      }
    // todo status
    updateTodoStatus = async (req, res, next) => {
        const { id } = req.params;
        const { completed } = req.body;
    
        try {
          const updatedTodo = await this.todoService.updateTodoStatus(id, completed);
          res.status(200).json({ data: updatedTodo });
        } catch (error) {
          res.status(500).json({ error: '업데이트 실패' });
        }
      };
      //todo 검색
      searchTodos = async (req, res, next) => {
        const { completed, fromDate, toDate } = req.query;
    
        try {
          const todos = await this.todoService.searchTodos(completed, fromDate, toDate);
          res.status(200).json({ data: todos });
        } catch (error) {
          res.status(500).json({ error: '검색 실패' });
        }
      };
      ///todo 완료 상태 변경
      completeTodo = async (req, res, next) => {
        const { id } = req.params;

        try {
            const completedTodo = await this.todoService.completeTodoWithDependencies(id);

            res.status(200).json({ data: completedTodo });
        } catch (error) {
            res.status(500).json({ error: 'Todo 완료 상태 변경 실패' });
        }
    }
}

 module.exports = TodoController;