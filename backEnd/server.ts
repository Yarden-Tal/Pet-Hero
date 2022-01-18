// Setup
require("dotenv").config();
import express, { Request, Response } from "express";
import cors from "cors";
import connectDb from "./database/connection";
const bodyParser = require("body-parser");
const path = require("path");

// Variables
const app = express();
const PORT: string | 8000 = process.env.PORT || 8000;

// Global middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
import authRoutes from "./api/routes/authRoutes";
import usersRoutes from "./api/routes/usersRoutes";
import petsRoutes from "./api/routes/petsRoutes";

app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/pets", petsRoutes);
app.use("/", express.static(path.join(__dirname, "build")));
app.use("/images", express.static(path.join("images")));

// Connect to db and start server
const startServer = async (): Promise<void> => {
  if (await connectDb()) {
    app.listen(PORT, () =>
      console.log(`Server listening on http://localhost:${PORT}...`)
    );
  } else console.log("Error connecting to database");
};

startServer();
