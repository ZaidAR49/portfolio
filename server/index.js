import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sendmail from "./routes/contact-routes.js";
import security from "./routes/security-routes..js";
import user from "./routes/user-routes.js";
import cloud from "./routes/cloud-routes.js";
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// Configure CORS to accept requests from any frontend - completely permissive
app.use(cors({
  origin: '*',
  methods: '*',
  allowedHeaders: '*',
  exposedHeaders: '*',
  credentials: false
}));

app.use(express.json({ limit: '50mb' }));

app.use("/api/sendmail", sendmail);
app.use("/api/security", security);
app.use("/api/user", user);
app.use("/api/cloud", cloud);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
