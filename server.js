const app = require('express')()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const next = require('next')

const port = process.PORT || 3000
const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const nextHandler = nextApp.getRequestHandler()

io.on('connection', socket => {
    console.log('Client connected!')

    socket.on('disconnect', () => console.log('Client disconnected!'))
})

nextApp.prepare().then(() => {
    
    // app.get('/sendMsg', (req, res) => {
    //     io.emit('req', { msg: 'hey comp' })
    //     res.json({ reply: 'OK' })
    // })

    app.get('*', (req, res) => {
        return nextHandler(req, res)
    })

    server.listen(port, err => {
        if (err) throw err
        console.log(`> Ready on http://localhost:${port}`)
    })
})