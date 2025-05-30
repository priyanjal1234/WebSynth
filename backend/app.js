const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require('cookie-parser')
require("dotenv").config();
const db = require('./config/db')

db()

// Routes
const userRouter = require('./routes/userRouter')
const aiRouter = require('./routes/aiRouter')


// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser())


app.use("/api/users",userRouter)

app.use("/api/ai",aiRouter)


const port = 3000;
app.listen(port, function () {
  console.log(`Server is running on port ${port}`);
});
