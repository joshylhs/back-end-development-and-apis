import express from "express";
import cors from "cors";
import path from 'path';

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static("public"));

app.get("/", (_req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// Do not change code above this line
app.get('/api/:date', (req, res) => {
    let { date } = req.params;
    let parsedDate;

    if (/^\d+$/.test(date)) {
        parsedDate = new Date(parseInt(date));
    } else {
        parsedDate = new Date(date);
    }

    if (parsedDate.toString() === 'Invalid Date') {
        return res.json({ error: 'Invalid Date' });
    }

    res.json({
        unix: parsedDate.getTime(),
        utc: parsedDate.toUTCString()
    });
});

app.get('/api', (req, res) => {
    const now = new Date();
    res.json({
        unix: now.getTime(),
        utc: now.toUTCString()
    });
});
// Do not change code below this line

const PORT = 8000;
const listener = app.listen(PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
