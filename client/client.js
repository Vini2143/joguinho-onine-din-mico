//imports

import { Game, Vector } from '../game.js'
import { emitEvent, receiveEvent } from '../functions.js'


//variáveis

const ws = new WebSocket('ws://localhost:8080');

const canvas = document.getElementById('renderer')
const context = canvas.getContext('2d')

const game = new Game()

const player = {}

//execução

ws.onerror = function (error) { 
  	console.log(error) 
}

ws.onopen = function () {

	ws.send(emitEvent('test', 'anything'))


}

ws.onmessage = function (message) {

  	receiveEvent(message.data, 'start', (id, objects) => {

		player.id = id
    	game.objects = objects
	})
	
	receiveEvent(message.data, 'add', (id, color) => {

		if (player.id == id) {

			player.color = color
			game.addPlayer(id, '#00FBFF')
		} else {

			game.addPlayer(id, color)
		}
	})

	receiveEvent(message.data, 'remove', id => {
		game.removePlayer(id)
	})

	receiveEvent(message.data, 'move', (id, command) => {

		game.moveObject(id, command)
	})
  
}


let keys = {
	w : 0,
	a : 0,
	s : 0,
	d : 0
}

function update() {

	const direction = new Vector(keys['d'] - keys['a'], keys['s'] - keys['w'])

	ws.send(emitEvent('move', direction.normalize()))
}


document.addEventListener('keydown', (event) => {

	keys[event.key] = 1
	update()
})

document.addEventListener('keyup', (event) => {

	keys[event.key] = 0
	update()
})

game.render(context)