import express from "express";
import cors from "cors";
import { serve } from "inngest/express";
import { clerkMiddleware } from "@clerk/express";

import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import { inngest, functions } from "./lib/inngest.js";

import chatRoutes from "./routes/chatRoutes.js";
import sessionRoutes from "./routes/sessionRoute.js";
import executionRoutes from "./routes/executionRoutes.js";

const app = express();

// Middleware
// app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));// Ensure ENV.CLIENT_URL is your Frontend URL
app.use(cors({
  origin: "http://localhost:5173", // Replace with your frontend URL
  credentials: true
}));
app.use(express.json()); 
app.use(clerkMiddleware());
console.log("CLIENT_URL =", ENV.CLIENT_URL); 

// API Routes
app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/chat", chatRoutes);
app.use("/api/sessions", sessionRoutes);

app.use("/api", executionRoutes);
app.get("/check-python", (req, res) => {
  exec("python3 --version", (err, stdout, stderr) => {
    res.json({ stdout, stderr });
  });
});

// Simple health check
app.get("/", (req, res) => {
  res.send("TalentIQ API is running...");
});


const startServer = async () => {
  try {
    await connectDB();
    const port = ENV.PORT || 3000;
    app.listen(port, () => console.log(`API Server running on port: ${port}`));
  } catch (error) {
    console.error("💥 Error:", error);
    process.exit(1);
  }
};

startServer();