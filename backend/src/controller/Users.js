import UserModel from "../models/UserModel.js";
import log from "../utils/logger.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUser = async (_req, res) => {
  try {
    const user = await UserModel.find();
    res.status(200).json(user);
  } catch (error) {
    log(error);
  }
};

export const createUser = async (req, res) => {
  const { name, email, password, confirmPassword, jenisKelamin } = req.body;
  if (password !== confirmPassword) {
    res.status(400).json({
      message: "password dan confirm password tidak cocok",
    });
  }
  const salt = await bcrypt.genSalt();
  const hashPasword = await bcrypt.hash(password, salt);
  try {
    const user = await UserModel.create({
      name,
      email,
      password: hashPasword,
      jenisKelamin,
    });
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = async (req, res) => {
  try {
    const user = await UserModel.find({ email: req.body.email });
    const match = await bcrypt.compare(req.body.password, user[0].password);
    if (!match) return res.status(400).json({ message: "password salah" });

    const users = {
      userId: user[0]._id,
      name: user[0].name,
      email: user[0].email,
    };

    const accessToken = jwt.sign(
      {
        userId: users.userId,
        name: users.name,
        email: users.email,
      },
      process.env.ACCESS_TOKEN,
      { expiresIn: "20s" }
    );
    const refreshToken = jwt.sign(
      {
        userId: users.userId,
        name: users.name,
        email: users.email,
      },
      process.env.REFRESH_TOKEN,
      { expiresIn: "1d" }
    );

    await UserModel.findOneAndUpdate(
      { _id: users.userId },
      { refresh_token: refreshToken }
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({ accessToken });
  } catch (error) {
    res.status(400).json({
      message: "email tidak di temukan",
    });
  }
};

export const logoutUser = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(204);

    const user = await UserModel.find({ refresh_token: refreshToken });
    if (!user[0]) return res.sendStatus(204);

    const userId = user[0]._id;

    await UserModel.findOneAndUpdate({ _id: userId }, { refresh_token: null });
    res.clearCookie("refreshToken");
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
};
