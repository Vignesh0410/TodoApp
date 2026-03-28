import { EventEmitter } from "events";
export class CustomLogger extends EventEmitter {
  info(msg: string) {
    this.emit("info", msg);
  }

  warn(msg: string) {
    this.emit("warn", msg);
  }

  error(msg: string) {
     this.emit("error",msg);
  }

}
