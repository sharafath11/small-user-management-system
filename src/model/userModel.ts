import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
}
const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, 
      lowercase: true, 
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, 
  }
);
const userModel = mongoose.model<IUser>('User', userSchema);

export default userModel;
