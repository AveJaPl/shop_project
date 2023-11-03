import { Request, Response } from "express";
const logout = (req: Request, res: Response) => {
  try {
    console.log("logout");
    res.clearCookie("token").json({ message: "Logged out" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export { logout };
