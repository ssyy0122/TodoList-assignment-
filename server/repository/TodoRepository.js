const { Todos } = require('../models');

class TodoRepository {
      createTodo = async (id, content, createdAt, updatedAt, completed) => {
        const createTodoData = await Todos.create({ id, content, createdAt, updatedAt, completed });
        return createTodoData;
    }



    findAllTodo = async () => {
        const todos = await Todos.findAll();
        
        return todos;
    }

    updateTodo = async (id, updateData) => {
        const [updateTodo] = await Todos.update(updateData, {
          where: { id },
          returning: true,
        });
        return updateTodo
    }
    
    deleteTodo = async (id) => {
        const deleteTodo = await Todos.destroy({
          where: { id },
        });
        return deleteTodo;
      }
}
module.exports = TodoRepository;