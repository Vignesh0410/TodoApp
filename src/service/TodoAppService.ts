import { ITodoList } from "../interface/TodoList";

export class TodoAppService {
  private todoList: Map<number, ITodoList> = new Map();
  private count = 1;

  addTodo(title: string): string {
    const data: ITodoList = {
      id: this.count,
      title,
      completed: false,
    };
    this.todoList.set(this.count, data);
    this.count++;
    return "Todo added successfully";
  }

  getAllTodos(): ITodoList[] {
    let todos: ITodoList[] = [];
    this.todoList.forEach((value) => {
      todos.push(value);
    });
    return todos;
  }

  getOneTodo(id: number): ITodoList | undefined {
    return this.todoList.get(id);
  }

  updateTodo(id: number, todo: Record<string, any>): string {
    const existing = this.todoList.get(id);
    if (existing === undefined) {
      return "Not Found";
    }
    const updationData = {
      ...existing,
      ...todo,
    };
    this.todoList.set(id, updationData);
    return "updated Successfully";
  }

  deleteTodo(id: number): string {
    if (this.todoList.get(id) === undefined) return "Not found";
    this.todoList.delete(id);
    return "TODO deleted successfully";
  }
}
