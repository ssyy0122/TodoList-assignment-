const TodoController = require("../controller/TodoController.js");
const express = require('express');
const router = express.Router();


const todoController = new TodoController();

//생성
router.post('/',todoController.createTodo);
//조회
router.get('/',todoController.findAllTodo);
//수정
router.put('/:id', todoController.updateTodo);
//삭제
router.delete('/:id', todoController.deleteTodo);
//모두 삭제
router.delete('/', todoController.deleteAllTodos);
//검색
router.get('/search', todoController.searchTodos);
//완료 상태
router.put('/status/:id', todoController.updateTodoStatus);
//todo 참조 후 완료/미완료
router.put('complete/:id', todoController.completeTodo);




module.exports = router;