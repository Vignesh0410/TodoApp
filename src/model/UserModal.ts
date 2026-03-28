import mongoose, { Document, Schema } from "mongoose";

interface IUser extends Document {
  userName: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const userModel = mongoose.model<IUser>("users", userSchema);

export default userModel;
