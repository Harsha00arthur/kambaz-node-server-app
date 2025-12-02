import express from 'express';
import Hello from "./Hello.js";
import Lab5 from "./Lab5/index.js";
import cors from "cors";
import db from "./Kambaz/Database/index.js";
import UserRoutes from "./Kambaz/Users/routes.js";
import CourseRoutes from "./Kambaz/Courses/routes.js";
import AssignmentsDao from "./Kambaz/Assignments/dao.js";
import AssignmentRoutes from "./Kambaz/Assignments/routes.js";
import EnrollmentsDao from "./Kambaz/Enrollments/dao.js";
import EnrollmentRoutes from "./Kambaz/Enrollments/routes.js";
import ModulesRoutes from "./Kambaz/Modules/routes.js";
import mongoose from "mongoose";

import "dotenv/config";
import session from "express-session";


const CONNECTION_STRING = process.env.DATABASE_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kambaz"
mongoose.connect(CONNECTION_STRING);
const app = express();



app.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:3000",
      "https://kambaz-next-js-mocha.vercel.app"
    ],
  })
);


const isProduction = process.env.NODE_ENV === "production";

app.set("trust proxy", 1); // Required for secure cookies on Render

app.use(
  session({
    secret: process.env.SESSION_SECRET || "kambaz",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: isProduction,                    // true on Render
      httpOnly: true,
      sameSite: isProduction ? "none" : "lax", // "none" for cross-site cookies
    },
  })
);

// -----------------------------------------------------
app.use(express.json());

// Routes
UserRoutes(app, db);
CourseRoutes(app, db);
ModulesRoutes(app, db);

const assignmentsDao = AssignmentsDao(db);
AssignmentRoutes(app, assignmentsDao);

const enrollmentsDao = EnrollmentsDao(db);
EnrollmentRoutes(app, enrollmentsDao);

Lab5(app);
Hello(app);

// Server
app.listen(process.env.PORT || 4000, () => {
  console.log("Server running...");
});
