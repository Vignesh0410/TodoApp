import { Router } from "express";
import { TodoAppService } from "../service/TodoAppService";
import { validate } from "../Middleware/Validate";
import { createTodoSchema, updateTodoSchema } from "../schema/TodoSchema";
import { Request } from "express";
import { TodoService } from "../service/TodoService";

const route = Router();

//memory storage
// const todoService = new TodoAppService();
const todoService = new TodoService();

route.post("/", validate(createTodoSchema), async (req, res) => {
  res.send(await todoService.addTodo(req.body.title));
});

route.get("/", async (req, res) => {
  res.send(await todoService.getAllTodos());
});

route.get("/:id", async (req, res) => {
  res.send(await todoService.getOneTodo(req.params.id));
});

route.put(
  "/:id",
  validate(updateTodoSchema),
  async (req: Request<{ id: string }>, res) => {
    res.send(await todoService.updateTodo(req.params.id, req.body));
  },
);

route.delete("/:id", async (req, res) => {
  res.send(await todoService.deleteTodo(req.params.id));
});

export default route;
