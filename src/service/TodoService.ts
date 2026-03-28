import { ITodoList } from "../interface/TodoList";
import { TodoRepo } from "../repository/TodoRepo";

export class TodoService {
  private todoRepo = new TodoRepo();
  async addTodo(title: string): Promise<ITodoList> {
    const data: ITodoList = {
      title,
      completed: false,
    };
    return await this.todoRepo.addTodo(data);
  }

  async getAllTodos(): Promise<ITodoList[]> {
    return await this.todoRepo.getAllTodos();
  }

  async getOneTodo(id: string): Promise<ITodoList | null> {
    return await this.todoRepo.getOneTodo(id);
  }

  async updateTodo(
    id: string,
    todo: Record<string, any>,
  ): Promise<ITodoList | null> {
    return await this.todoRepo.updateTodo(id, todo);
  }

  async deleteTodo(id: string): Promise<ITodoList | null> {
    return await this.todoRepo.deleteTodo(id);
  }
}
