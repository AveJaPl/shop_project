import express from "express";
import authRoutes from "./routes/auth.routes";
import profileRoutes from "./routes/profile.routes";
import productRoutes from "./routes/product.routes";
import cors from "cors";
const app = express();
const PORT = 4000;
import * as dotenv from "dotenv";

dotenv.config();

app.use(express.json());
app.use(cors())

app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);
app.use("/produts", productRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
