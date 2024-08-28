import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
}

const userSchema: Schema<IUser> = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
