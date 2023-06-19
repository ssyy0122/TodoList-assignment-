const { Todo } = require('../models');

class TodoRepository {
  createTodo = async (id,content, createdAt, updatedAt, completed) => {
    try {
      const createTodoData = await Todo.create({
        id: id,
        content: content,
        createdAt: createdAt,
        updatedAt: updatedAt,
        completed: completed,
      });
      return createTodoData;
    } catch (error) {
      console.log(error)
      throw new Error('Todo 생성 실패');
    }
  }

    findAllTodo = async () => {
        const todos = await Todo.findAll({});
        
        return todos;
    }
    async updateTodo(id, todo) {
      try {
        const updatedTodo = await this.todoModel.update(todo, { where: { id } });
        return updatedTodo;
      } catch (error) {
        console.log(error);
        throw new Error('Failed to update todo');
      }
    }

    async findById(id) {
      try {
        const todo = await Todo.findByPk(id);
        return todo;
      } catch (error) {
        throw new Error('Failed to find todo');
      }
    }
  
    async save(todo) {
      try {
        const updatedTodo = await todo.save();
        return updatedTodo;
      } catch (error) {
        throw new Error('Failed to save todo');
      }
  }
    
    deleteTodo = async (id) => {
      const deleteTodo = await Todo.destroy({
        where: { id: id },
      });
        return deleteTodo;
      }
      async deleteAllTodos() {
        try {
          const deletedRows = await Todo.destroy({
            where: {}, // 
          });
          return deletedRows;
        } catch (error) {
          console.log(error);
          throw new Error('모든 할일 삭제 실패');
        }
      }
}
module.exports = TodoRepository;