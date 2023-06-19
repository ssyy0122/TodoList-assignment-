const { UUID } = require('sequelize');
const TodoRepository = require('../repository/TodoRepository.js');
const { all } = require('../router/TodoRouter.js');
const e = require('express');

class TodoService {
    TodoRepository = new TodoRepository();

    createTodos = async (content) => { 
      if (!content) {
        throw new Error('Todo content is required');
      }
    
            const id = 0;
            const createdAt = new Date();
            const updatedAt = createdAt;
            const completed = false;

      const createdTodo = await this.TodoRepository.createTodo(id,content, createdAt, updatedAt, completed)

      return createdTodo;
  }

    findAllTodo = async () => {
        const alltodo = await this.TodoRepository.findAllTodo();

        alltodo.sort((a, b) => {
            return b.createAt - a.createAt;
        })
        return alltodo.map(createTodoData => {
            return{
                id: createTodoData.id,
                content: createTodoData.content,
                createAt: createTodoData.createAt,
                updateAt: createTodoData.updateAt,
                completed: createTodoData.completed,
                status: createTodoData.completed ? 'Completed' : 'Incomplete',
            }
        });
    };

    updateTodo = async (id, content) => {
      try {
        const todo = await this.TodoRepository.findById(id);
        if (!todo) {
          throw new Error('todo가 없습니다');
        }
    
        todo.content = content;
        todo.updatedAt = new Date();
    
        const updatedTodo = await this.todoRepository.save(todo);
        return updatedTodo;
      } catch (error) {
        console.log(error);
        throw new Error('Todo 업데이트 실패');
      }
    }

    deleteTodo = async (id) => {
        const deleteTodo = await this.TodoRepository.deleteTodo(id);
        if(!deleteTodo) {
            throw new Error('삭제 실패');
        }
    };

    updateTodoStatus = async (id, completed) => {
        const todo = await Todo.findByPk(id);
        if (!todo) {
          throw new Error('Todo not found');
        }
    
        todo.completed = completed;
        await todo.save();
    
        return todo;
      };

      searchTodos = async (completed, fromDate, toDate) => {
        const whereClause = {};
        
        if (completed !== undefined) {
          whereClause.completed = completed;
        }
    
        if (fromDate && toDate) {
          whereClause.createAt = {
            [Op.between]: [fromDate, toDate],
          };
        }
    
        const todos = await Todo.findAll({
          where: whereClause,
        });
    
        return todos;
      };
      completeTodo = async (todoId) => {
        const todo = await this.todoRepository.findById(todoId);
        const dependencies = await this.todoRepository.findDependencies(todoId);
      
        for (const dependencyId of dependencies) {
          const dependency = await this.todoRepository.findById(dependencyId);
          if (!dependency.completed) {
            throw new Error(`Cannot complete Todo ${todoId}. Dependency Todo ${dependencyId} is not completed.`);
          }
        }
      
        const completedTodo = await this.todoRepository.completeTodoById(todoId);
        return completedTodo;
      };
  }

module.exports = TodoService;