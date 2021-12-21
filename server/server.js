const expressApp = require('express')();
const httpServer = require('http').createServer(expressApp)
const io = require('socket.io')(httpServer, {
    cors: { origin: true }
})

app.use(express.static(path.join(__dirname, '/ui/build')));

const port = process.env.PORT || 5000;

io.on('connection', (socket) => {
    console.log('user online')
    socket.on('image-data', (data) => {
        socket.broadcast.emit('image-data', data)
    })
})

httpServer.listen(port, () => {
    console.log('Server running at', port)
})
