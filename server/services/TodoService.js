const TodoRepository = require('../repository/TodoRepository.js');
const { all } = require('../router/TodoRouter.js');

class TodoService {
    TodoRepository = new TodoRepository();

    createTodo = async (content) => {
      const createdAt = new Date();
      const updatedAt = createdAt;
      const id = generateId(); // 예시로 생성된 ID를 사용하는 함수입니다. 실제로는 적절한 ID 생성 방식을 사용해야 합니다.

      const createdTodo = await this.todoRepository.createTodo(id, content, createdAt, updatedAt, completed);

      return createdTodo;
  }

    findAllTodo = async () => {
        const alltodo = await this.TodoRepository.findAllTodo();

        alltodo.sort((a, b) => {
            return b.createAt - a.createAt;
        })
        return alltodo.map(todo => {
            return{
                id: createTodoData.null,
                content: createTodoData.content,
                createAt: createTodoData.createAt,
                updateAt: createTodoData.updateAt,
            }
        });
    };

    updateTodo = async (id, updateData) => {
        const todo = await this.TodoRepository.findtoById(id);
        if(!todo) {
            throw new Error('todo가 없습니다');
        }
        const updateTodo = await this.TodoRepository.updateTodo(id, updateData);

        return updateTodo;
    };

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