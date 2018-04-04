const app = require('express')()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const next = require('next')
const axios = require('axios')

const port = process.PORT || 3000
const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const nextHandler = nextApp.getRequestHandler()

const user = 'foreignn_'

io.on('connection', socket => {
    console.log('Client connected!')

    sendUserInfo(socket)

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

// Get Twitch info //////////////////////////////////////////////

const sendUserInfo = socket => {
    axios.get(`https://api.twitch.tv/kraken/users?login=${user}`, {
        headers: {
            'Accept': 'application/vnd.twitchtv.v5+json',
            'Client-ID': 'adgzf6h5sfi46r8cysqslij09y34u0',
        }
    })
    .then(res1 => {
        const userId = res1.data.users[0]._id
        axios.get(`https://api.twitch.tv/helix/users/follows?to_id=${userId}`, {
            headers: {
                'Client-ID': 'adgzf6h5sfi46r8cysqslij09y34u0',
            }
        })
        .then(res2 => {
            socket.emit('user info', {
                id: userId,
                name: user,
                followers: res2.data.total,
            })
        })
    })
}