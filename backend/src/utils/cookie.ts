import { Response } from "express";
import { NODE_ENV } from "../config/env";

type setCookieProps = {
  token: string;
  res: Response;
};

export const setCookie = ({ token, res }: setCookieProps) => {
  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: NODE_ENV !== "development",
  });
};
