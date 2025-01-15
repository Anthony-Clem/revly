import { loginSchema, registerSchema } from "../lib/schemas";
import UserModel from "../models/user.model";
import { catchErrors } from "../utils/catchErrors";
import { setCookie } from "../utils/cookie";
import { generateToken } from "../utils/jwt";

export const register = catchErrors(async (req, res) => {
  const { email, password } = registerSchema.parse(req.body);

  const existingUser = await UserModel.exists({ email });
  if (existingUser) {
    return res.status(409).json({
      message: "Email already in use",
    });
  }

  const user = await UserModel.create({
    email,
    password,
  });

  const token = generateToken(user.id);
  setCookie({ token, res });

  return res.status(201).json({
    message: "User created successfully",
  });
});

export const login = catchErrors(async (req, res) => {
  const { email, password } = loginSchema.parse(req.body);

  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }

  const isMatching = await user.comparePasswords(password);
  if (!isMatching) {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }

  const token = generateToken(user.id);
  setCookie({ token, res });

  return res.status(200).json({
    message: "Logged in successfully",
  });
});

export const logout = catchErrors(async (req, res) => {
  res.clearCookie("jwt");

  res.status(200).json({ message: "Logged out successfully" });
});
