const path = require('path');
const express = require('express');
const expressApp = express();
const httpServer = require('http').createServer(expressApp);
const io = require('socket.io')(httpServer, {
  cors: { origin: true },
});

const fs = require('fs');
const parser = require('iptv-playlist-parser');

const playlist = fs.readFileSync(path.join(__dirname, './channel.m3u'), {
  encoding: 'utf-8',
});
const result = parser.parse(playlist);

fs.writeFileSync('res.json', JSON.stringify(result));

const port = process.env.PORT || 5000;

io.on('connection', (socket) => {
  console.log('user online');
  socket.on('image-data', (data) => {
    socket.broadcast.emit('image-data', data);
  });
});

console.log('server env', process.env.NODE_ENV);
expressApp.use(express.static(path.join(__dirname, '../ui/build')));
expressApp.get('*', function (req, res) {
  console.log('response received');
  res.sendFile(path.join(__dirname, '../ui/build', 'index.html'));
});

httpServer.listen(port, () => {
  console.log('Server running at', port);
});
