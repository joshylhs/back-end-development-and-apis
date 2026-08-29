import express from 'express';
import router from './weather.js';
import path from 'path';
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = 3000;
app.use(express.static(path.join(__dirname, "public")));



app.use('/api/weather', router);

app.get('/api/info', (req,res)=>{
    res.json({
        name:'weather service API',
        version: "1.0.0",
        endpoints: ["/api/weather/:city", "/api/greet/:name", "/api/data"],
    })
});

app.get('/', (req,res) => {
    // res.send('welcome lol')
    res.sendFile(path.join(__dirname, "public", "index.html"));});

app.get('/api/status', (req,res)=>{
    res.status(200).json({status:'ok'})
});

app.get('/docs', (req,res)=>{
    res.redirect('/api/info')
})

app.get('/api/greet/:name', (req,res)=>{
    const name = req.params.name;
    res.json({name})
})

app.route('/api/data')
    .get((req, res) => {
        res.status(200).json({ message: 'GET request' });
    })
    .post((req, res) => {
        res.status(201).json({message:'POST request'})
    })

app.listen(PORT, ()=>{})