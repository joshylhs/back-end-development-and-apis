import express from "express";
import helmet from "helmet";
import router from "./routes/auth.js";
import adminRouter from "./routes/admin.js";

const PORT = process.env.PORT;
const app = express();
app.use(express.json());
app.use('/api/admin', adminRouter);

app.use(helmet());
app.use('/api/auth', router);
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 'error': err.message });
});

app.get("/", (req, res) => {
  res.json({ message: "Auth API is running" });
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});