import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sendmail from "./routes/contact-routes.js";
import security from "./routes/security-routes..js";
import user from "./routes/user-routes.js";
import cloud from "./routes/cloud-routes.js";
import experience from "./routes/experience-routes.js";
import project from "./routes/project-routes.js";
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

app.use(express.json({ limit: '200mb' }));

// Error handling middleware for JSON parsing
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    console.error('Bad JSON:', err.message);
    return res.status(400).json({ error: 'Invalid JSON payload' });
  }
  if (err.type === 'entity.too.large') {
    console.error('Payload too large:', err.message);
    return res.status(413).json({ error: 'Payload too large' });
  }
  next();
});

app.use("/api/sendmail", sendmail);
app.use("/api/security", security);
app.use("/api/user", user);
app.use("/api/cloud", cloud);
app.use("/api/experience", experience);
app.use("/api/project", project);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
