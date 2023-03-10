import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exists." });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid Credentials." });
    const token = jwt.sign(
      {
        name: existingUser.name,
        email: existingUser.email,
        id: existingUser._id,
      },
      "test",
      { expiresIn: "2h" }
    );
    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const signUp = async (req, res) => {
  const { email, firstName, lastName, password, confirmPassword } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(404).json({ message: "User already exists." });
    if (password !== confirmPassword)
      return res.status(400).json({ message: "Passwords don't match." });
    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });
    const token = jwt.sign(
      { name: result.name, email: result.email, id: result._id },
      "test",
      {
        expiresIn: "2h",
      }
    );
    return res.status(200).json({ result, token });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong." });
  }
};
