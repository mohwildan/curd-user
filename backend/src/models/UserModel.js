import mongoose, { model } from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
  },
  jenisKelamin: {
    type: String,
    required: true,
  },
  createAt: {
    type: Date,
    default: () => Date.now(),
  },
  updateAt: {
    type: Date,
    default: () => Date.now(),
  },
  refresh_token: {
    type: String,
  },
});

const UserModel = model("User", userSchema);
export default UserModel;
