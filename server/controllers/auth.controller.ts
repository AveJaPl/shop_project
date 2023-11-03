import { Response, Request } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();


const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Provide email and password." });
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined in the environment variables.');
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, admin: user.isAdmin },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
      sameSite: "lax",
      path: "/"
    })

    res.json({ message: "Login successful." });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const register = async (req: Request, res: Response) => {
  try {
    const { name, surname, email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Provide email and password." });
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res.status(400).json({ message: "Email already registered." });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        surname,
        email,
        password: hashedPassword
      }
    });

    res.status(201).json({ message: "User registered successfully.", userId: newUser.id });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};


const resetPassword = (req: Request, res: Response) => {
  res.send("Reset Password endpoint.");
};

export {
  login,
  register,
  resetPassword
};
