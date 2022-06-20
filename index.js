const express = require('express');
const path = require('path')
const app = express();
const port = 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.render('page')
})

var midPort = app.listen(port, () => {
    console.log('On port 3000')
})

const io = require('socket.io').listen(midPort);

io.sockets.on('connection', function(socket) {
    
    socket.on('join', (data) => {
        let counter = Object.keys(io.sockets.connected).length
        io.sockets.emit('join', data, counter)
    })

    socket.on('send', function(data) {
        io.sockets.emit('message', data)
    })

    socket.on('disconnect', (data) => {
        let counter = Object.keys(io.sockets.connected).length
        io.sockets.emit('message', data, counter)
    })   
})



