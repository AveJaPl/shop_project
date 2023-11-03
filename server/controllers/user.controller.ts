import { Response, Request } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

const getUserData = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        if (!userId) return res.status(401).json({ message: "Unauthorized" });

        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            }, select: {
                email: true,
                name: true,
                id: true,
            },
        });

        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json({ user });


    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}


export { getUserData };