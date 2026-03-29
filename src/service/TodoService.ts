import { RedisCache } from "../cache/RedisCache";
import { TodoEvents } from "../events/TodoEvents";
import { ITodoList } from "../interface/TodoList";
import { TodoRepo } from "../repository/TodoRepo";

export class TodoService {
  private todoRepo = new TodoRepo();
  private cacheService = new RedisCache();
  private todoEvents = new TodoEvents();

  async addTodo(title: string): Promise<ITodoList> {
    const data: ITodoList = {
      title,
      completed: false,
    };
    const result = await this.todoRepo.addTodo(data);
    this.todoEvents.emit("todoAdded");
    return result;
  }

  async getAllTodos(): Promise<ITodoList[]> {
    const cacheData = await this.cacheService.get("todos");
    if (cacheData) {
      return JSON.parse(cacheData);
    }
    const todos = await this.todoRepo.getAllTodos();
    await this.cacheService.set("todos", todos);
    return todos;
  }

  async getOneTodo(id: string): Promise<ITodoList | null> {
    return await this.todoRepo.getOneTodo(id);
  }

  async updateTodo(
    id: string,
    todo: Record<string, any>,
  ): Promise<ITodoList | null> {
    const result = await this.todoRepo.updateTodo(id, todo);
    this.todoEvents.emit("todoAdded");
    return result;
  }

  async deleteTodo(id: string): Promise<ITodoList | null> {
    const result = await this.todoRepo.deleteTodo(id);
    this.todoEvents.emit("todoAdded");
    return result;
  }
}
