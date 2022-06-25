import express from "express";
import connectDB from "./config/db";

import userRouter from "./routes/api/users";
import authRouter from "./routes/api/auth";
import postsRouter from "./routes/api/posts";
import profileRouter from "./routes/api/profile";

const app = express();

// Database Connection
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) => {
  return res.send("API Running!");
});

// Define Routes

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/posts", postsRouter);
app.use("/api/profile", profileRouter);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
