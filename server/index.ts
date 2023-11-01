import express from "express";
import authRoutes from "./routes/auth.routes";
import profileRoutes from "./routes/profile.routes";
import productRoutes from "./routes/product.routes";
const app = express();
const PORT = 4000;

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);
app.use("/produts", productRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
