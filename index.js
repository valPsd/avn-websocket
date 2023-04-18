const express = require('express');
const app = express();
const http = require('http');
const WebSocket = require('ws');
const port = 6060;
const server = http.createServer(app);
const wss = new WebSocket.Server({ server })
// const wss = new WebSocket.Server({ port: 6060 }, () => {
//     console.log('server started');
// });

app.get('/', (req, res) => {
    res.write('<h1>Server is listening on port 6060!</h1>')
    res.end()
})

wss.on('connection', (ws) => {
    console.log('client connected');

    ws.on('message', (data) => {
        const message = JSON.parse(data);
        console.log(message);
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(message));
            }
        })
    })

    ws.on("close", () => {
        console.log("the client has Disconnected");
    });

    ws.onerror = function () {
        console.log("Some Error occurred")
    }
})

// wss.on('listening', () => {
//     console.log('server is listening on port 6060.');
// })

server.listen(port, function() {
    console.log(`Server is listening on ${port}!`)
  })