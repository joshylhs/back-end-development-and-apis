import {inputCleaner, inputValidator, router} from './middleware.js';
import express from 'express';

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Mounting/using the userRoutes router for /users path
app.use("/", router);
app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
