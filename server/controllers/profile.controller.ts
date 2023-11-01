import express, {Request, Response} from "express";

const changeEmail = (req: Request, res: Response) => {
  res.send("Change Email");
};

const deleteAccount = (req: Request, res: Response) => {
  res.send("Delete Account");
};

const updateProfile = (req: Request, res: Response) => {
  res.send("Update Profile");
};

const updateSettings = (req: Request, res: Response) => {
  res.send("Update Settings");
};

export {
  changeEmail,
  deleteAccount,
  updateProfile,
  updateSettings
};