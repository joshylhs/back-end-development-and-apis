import http from 'http';
import fs from 'fs';
import { WebSocketServer } from 'ws';

const PORT = 3001;
const server = http.createServer((req, res) => {
    // fs.readFile('./public/index.html');
    
    const files = {
        "/": { 
            path: "./public/index.html", 
            contentType: "text/html" 
        },
        "/index.html": { 
            path: "./public/index.html", 
            contentType: "text/html" 
        },
        "/script.js": {
            path: "./public/script.js",
            contentType: "text/javascript",
        },
    };

    const file = files[req.url];

    if (!file) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Not found");
        return;
    }

    fs.readFile(file.path, (err, data) => {
        if (err) {
            res.writeHead(500);
            res.end("Error loading page");
            return;
        }

        res.writeHead(200, { "Content-Type": file.contentType });
        res.end(data);
    });
});

const wss = new WebSocketServer({ server });

wss.on("connection", (socket, req) => {
    console.log(`Client connected`);

    const username = new URL(req.url, "http://localhost").searchParams.get(
        "username",
    );
    
    console.log(`${username} connected`);

    wss.clients.forEach((client) => {
        if (client.readyState === client.OPEN) {
            client.send(JSON.stringify({ "type": "system", "text": `${username} joined` }, null, 2));
        }
    });
    
    socket.on("message", (message) => {
        wss.clients.forEach((client) => {
            if (client.readyState === client.OPEN) {
                const { username, text } = JSON.parse(message);
                client.send(JSON.stringify({ "type": "chat", username, text }, null, 2));
            }
        });
    });

    socket.on('close', () => {
        wss.clients.forEach((client) => {
            if (client.readyState === client.OPEN) {
                client.send(JSON.stringify({ type: 'system', text: `${username} left` }, null, 2));
            }
    })
  });

});

server.listen(PORT, () => {
    console.log("Chat server running at http://localhost:3001");
});