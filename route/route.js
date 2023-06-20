import {
  getTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todo.js";

export const appRoutes = (app) => {
  app.route("/todo").get(getTodos).post(createTodo);

  app.route("/todo/:id").get(getTodoById).put(updateTodo).delete(deleteTodo);
};
