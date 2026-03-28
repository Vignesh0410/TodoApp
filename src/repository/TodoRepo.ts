import { ITodoList } from "../interface/TodoList";
import todo from "../model/Todo";
export class TodoRepo {
  async addTodo(data: ITodoList) {
    const result = await todo.create(data);
    return result;
  }

  async getAllTodos() {
    return await todo.find();
  }

  async getOneTodo(id: string) {
    return await todo.findById(id);
  }

  async updateTodo(id: string, data: Record<string, any>) {
    return await todo.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteTodo(id: string) {
     return await todo.findByIdAndDelete(id);
  }
}
