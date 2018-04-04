const app = require('express')()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const next = require('next')
const axios = require('axios')
const socketIOClient = require('socket.io-client')

const port = process.PORT || 3000
const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const nextHandler = nextApp.getRequestHandler()

const user = 'foreignn_'

// Socket IO ////////////////////////////////////////////////////

io.on('connection', socket => {
    console.log('Client connected!')

    sendUserInfo(socket)

    socket.on('disconnect', () => console.log('Client disconnected!'))
})

// Stream Labs //////////////////////////////////////////////////

const socket_token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbiI6IjFCMUIyNTAwMzQxMUU4QTVGQUY3IiwicmVhZF9vbmx5Ijp0cnVlLCJwcmV2ZW50X21hc3RlciI6dHJ1ZSwidHdpdGNoX2lkIjoiMTc4MDUyODk0IiwieW91dHViZV9pZCI6IlVDREtCSEtHMjAxOFFqU0E5NEFOV3VvQSJ9.mT866tduARULOTKu0fQC76tNUx4Yx2vCyfyRRALm7rU'
const slSocket = socketIOClient(`https://sockets.streamlabs.com?token=${socket_token}`, { transports: ['websocket'] })

slSocket.on('event', eventData => {
    if (!eventData.for && eventData.type === 'donation') {
        console.log(eventData.message)
    }
    if (eventData.for === 'twitch_account') {
        switch (eventData.type) {
            case 'follow':

                console.log(`Received new follow event:\n${JSON.stringify(eventData)}`)
                
                if (eventData.message[0].isTest) {
                    io.emit('new follow', {
                        total: 1,
                        recentFollower: {display_name: 'test1'}
                    })
                } else {
                    let msgLength = eventData.message.length
                    getTwitchUserById(eventData.message[msgLength - 1].id, user => {
                        io.emit('new follow', {
                            total: msgLength,
                            recentFollower: user
                        })
                    })
                }
                break

            default:
                console.log(eventData.message)
        }
    }
})

// Next.js //////////////////////////////////////////////////////

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
    // Get user
    axios.get(`https://api.twitch.tv/kraken/users?login=${user}`, {
        headers: {
            'Accept': 'application/vnd.twitchtv.v5+json',
            'Client-ID': 'adgzf6h5sfi46r8cysqslij09y34u0',
        }
    })
    .then(res1 => {
        // Get user followers
        const userId = res1.data.users[0]._id
        axios.get(`https://api.twitch.tv/helix/users/follows?to_id=${userId}`, {
            headers: {
                'Client-ID': 'adgzf6h5sfi46r8cysqslij09y34u0',
            }
        })
        .then(res2 => {

            // Get recent follower
            const recentUserId = res2.data.data[0].from_id
            axios.get(`https://api.twitch.tv/kraken/users/${recentUserId}`, {
                headers: {
                    'Accept': 'application/vnd.twitchtv.v5+json',
                    'Client-ID': 'adgzf6h5sfi46r8cysqslij09y34u0',
                }
            })
            .then(res3 => {
                socket.emit('user info', {
                    id: userId,
                    name: user,
                    followers: res2.data.total,
                    recentFollower: {
                        id: recentUserId,
                        display_name: res3.data.display_name,
                    }
                })
            })
        })
    })
}

const getTwitchUserById = (userId, cb) => {
    axios.get(`https://api.twitch.tv/kraken/users/${userId}`, {
        headers: {
            'Accept': 'application/vnd.twitchtv.v5+json',
            'Client-ID': 'adgzf6h5sfi46r8cysqslij09y34u0',
        }
    })
    .then(res3 => {
        cb(res3.data)
    })
}

