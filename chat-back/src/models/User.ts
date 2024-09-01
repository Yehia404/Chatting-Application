import mongoose, { Document, Schema } from 'mongoose';
import validator from 'validator';

interface IUser extends Document {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  online: boolean;
}

const userSchema: Schema<IUser> = new Schema({
  firstname: {
    type: String,
    required: true,
    minlength: 2,
    validate: {
      validator: function (v: string) {
        return /^[a-zA-Z]+$/.test(v);
      },
      message: 'Firstname should only contain letters and be at least 2 characters long',
    },
  },
  lastname: {
    type: String,
    required: true,
    minlength: 2,
    validate: {
      validator: function (v: string) {
        return /^[a-zA-Z]+$/.test(v);
      },
      message: 'Lastname should only contain letters and be at least 2 characters long',
    },
  },
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 2,
    validate: {
      validator: function (v: string) {
        return /^[a-zA-Z0-9_\s]+$/.test(v);
      },
      message: 'Username should only contain alphanumeric characters and spaces and be at least 2 characters long',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v: string) {
        return validator.isEmail(v);
      },
      message: 'Invalid email format',
    },
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (v: string) {
        return validator.isStrongPassword(v, { minLength: 8, minLowercase: 0, minUppercase: 0, minNumbers: 0, minSymbols: 0 });
      },
      message: 'Password must be at least 8 characters long',
    },
  },
  online: { type: Boolean, default: false },
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
