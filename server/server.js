//imports 

import WebSocket, { WebSocketServer} from 'ws'

import { Game } from '../game.js'
import { emitEvent, receiveEvent } from '../functions.js'


//variáveis

const ws = new WebSocketServer({ port: 8080 })

const game = new Game()

//execução

let lastId = 0

ws.on('connection', (socket) => {

    lastId++
    socket.id = 'p'+ lastId

    console.log(`a user with id '${socket.id}' was connected`)

    socket.send(emitEvent('start', socket.id, game.objects))

    let player = game.addPlayer(socket.id)
    sendToAll(ws, emitEvent('add', socket.id, player.color))

    

    socket.on('message', message => {
        

        receiveEvent(message, 'move', direction => {

            game.moveObject(socket.id, direction)
            sendToAll(ws, emitEvent('move', socket.id, direction))
        })
    })

    socket.on('close', () => {
        game.removePlayer(socket.id)
        sendToAll(ws, emitEvent('remove', socket.id))
        console.log(`a user with id '${socket.id}' was disconnected`)
    })
})


function sendToAll(server, data) {
   
    server.clients.forEach( client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(data);
        }
    })
}

