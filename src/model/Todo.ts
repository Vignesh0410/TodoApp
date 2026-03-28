import mongoose, { Document, Schema } from "mongoose";

interface ITodo extends Document {
  title: string;
  completed: boolean;
}

const todoSchema = new Schema<ITodo>({
  title: {
    type: String,
    required: true,
    minlength: 2,
  },
  completed: {
    type: Boolean,
  },
});

const todo = mongoose.model<ITodo>("Todo", todoSchema);

export default todo;
