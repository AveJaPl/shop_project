import express, {Response, Request} from "express";

const login = (req: Request , res: Response) => {
  res.send("Login");
};

const register = (req: Request , res: Response) => {
  res.send("Register");
};

const logout = (req: Request , res: Response) => {
  res.send("Logout");
};

const resetPassword = (req: Request , res: Response) => {
  res.send("Reset Password");
};

export {
  login,
  register,
  logout,
  resetPassword
};