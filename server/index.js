import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sendmail from "./routes/contact-routes.js";
import security from "./routes/security-routes..js";

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

app.use(express.json());

app.use("/api/sendmail", sendmail);
app.use("/api/security", security);


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
