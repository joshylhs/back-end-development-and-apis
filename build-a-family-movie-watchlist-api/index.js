import express from "express";
import helmet from "helmet";
import watchlistRoutes from "./routes/watchlist.js";
import {authenticate} from "./middleware/authenticate.js";
import * as db from "./utils/db.js";
import bcrypt from 'bcryptjs';
import { signToken } from './utils/jwt.js';
import { authorizeModification } from "./middleware/authorize.js";

const PORT = process.env.PORT;
const app = express();

app.use(helmet());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Family Movie Watchlist API");
});

app.post('/api/auth/login', async (req, res, next) => {
  // Simulate a successful login and return a JWT token
  // const token = "your-jwt-token"; // Replace with actual token generation logic
  // res.json({ token });
  
  const {username, password} = req.body;
  const user = db.findByUsername(username);

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required but missing!" });
  } 

  if (!user) {
    return res.status(401).json({ message: "Invalid username or password" });
  } else {
    const match = await bcrypt.compare(password, user.passwordHash);

    if (!match) {
      return res.status(401).json({ message: "Invalid username or password" });
    } else {
      const token = signToken(user);
      res.status(200).json({ token });
    }
  }
});


app.use("/api/watchlist", authenticate, watchlistRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
