const express = require("express");
const connectDB = require("./config/db");

const app = express();

// Database Connection
connectDB();

app.get("/", (req, res) => {
  return res.send("API Running!");
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
