import jwt from "jsonwebtoken";

interface UserPayload {
  id: number;
  email: string;
  admin: boolean;
}

const verifyJWTForWebSocket = (
  token: string,
  requireAdmin: boolean = false
) => {
  const decoded = jwt.verify(
    token,
    process.env.JWT_SECRET as string
  ) as UserPayload;
  if (requireAdmin && !decoded.admin) {
    throw new Error("Access forbidden: admin required");
  }

  return decoded;
};

export default verifyJWTForWebSocket;
