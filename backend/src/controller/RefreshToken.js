import jwt from "jsonwebtoken";
import UserModel from "../models/UserModel.js";

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(401);

    const user = await UserModel.find({ refresh_token: refreshToken });
    if (!user[0]) return res.sendStatus(403);

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, decoded) => {
      if (err) return res.sendStatus(404);
      const users = {
        userId: user[0]._id,
        name: user[0].name,
        email: user[0].email,
      };

      const accessToken = jwt.sign(
        { userid: users.userId, name: users.name, emai: users.email },
        process.env.ACCESS_TOKEN,
        { expiresIn: "15s" }
      );
      res.json({ accessToken });
    });
  } catch (error) {
    console.log(error);
  }
};
