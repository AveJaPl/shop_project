import express from "express";
import authRoutes from "./routes/auth.routes";
import profileRoutes from "./routes/profile.routes";
import productRoutes from "./routes/product.routes";
import userRoutes from "./routes/user.routes";
import categoryRoutes from './routes/category.routes'
import cartRoutes from './routes/cart.routes'
import cors from "cors";
const PORT = 4000;
import * as dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { initializeWebsocket } from "./websockets/cart.websocket";
import { createServer } from "http";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());


const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionsSuccessStatus: 200,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};
app.use(cors(corsOptions))

app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);
app.use("/products", productRoutes);
app.use("/user", userRoutes);
app.use("/category", categoryRoutes);
app.use("/cart", cartRoutes);


const server = createServer(app);

initializeWebsocket(server);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
