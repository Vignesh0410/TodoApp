import { TodoRepo } from "../repository/TodoRepo";
import { RedisCache } from "../cache/RedisCache";
import { EventEmitter } from "events";

export class TodoEvents extends EventEmitter {
  private todoRepo = new TodoRepo();
  private cacheService = new RedisCache();
  constructor() {
    super();
    this.on("todoAdded", async () => {
      const todos = await this.todoRepo.getAllTodos();
      await this.cacheService.set("todos", todos);
      console.log("Cache Refreshed");
    });
  }
}
