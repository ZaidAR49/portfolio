import express from 'express';
import cors from 'cors';
const app = express();
const port = 3000;
app.use(cors()); 
app.use(express.json());
app.post('/api/contact', (req, res) => {
  res.json({ message: 'Hello World!' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
