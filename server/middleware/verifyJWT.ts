import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface UserPayload {
  id: number;
  email: string;
  admin: boolean;
}

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}

const verifyJWT = (requireAdmin: boolean = false) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as UserPayload;
      req.user = decoded;

      // Jeśli funkcja jest wywołana z requireAdmin ustawionym na true, sprawdź czy użytkownik jest adminem
      if (requireAdmin && !req.user.admin) {
        return res.status(403).json({ message: "Access forbidden: admin required" });
      }

      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: "Unauthorized" });
    }
  };
};

export default verifyJWT;
