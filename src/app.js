import express from "express";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import exoplanetRoutes from "./routes/exoplanets.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true, // Access-Control-Allow-Credentials: true
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api", exoplanetRoutes);

export default app;
