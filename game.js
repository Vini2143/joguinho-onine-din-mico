

export class Game {

    constructor() {
        //variaveis

        this.objects = {}

        this.movements = {
            w : object => { 
                object.y = Math.max(object.y - 10, 5)
            },
            a : object => { 
                object.x = Math.max(object.x - 10, 5)
            },
            s : object => { 
                object.y = Math.min(object.y + 10, 395)
            },
            d : object => { 
                object.x = Math.min(object.x + 10, 595) 
            } 

        }
    }


    //funções

    moveObject(id, command) {
        let moveFunction = this.movements[command]
        
        if (moveFunction) {

            moveFunction(this.objects[id])
        }
    }

    addPlayer(id, color = false) {

        let colors = [
            '#FF0000',
            '#FFFF00',
            '#0097FF',
            '#C0C0C0',
            '#0CFF00'
        ]

        this.objects[id] = { 
            x : 55, 
            y : 55,
            color: color ? color : colors[Math.floor(Math.random() * 5)]
        }

        return this.objects[id]
        
    }

    removePlayer(id) {
        delete this.objects[id]
    }

    

    
    render(context) {

        context.clearRect(0, 0, 600, 400);

        for (let id in this.objects) {
            
            let player = this.objects[id]

            context.beginPath();
            context.arc(player.x, player.y, 5, 0, 2 * Math.PI)
            context.fillStyle = player.color
            context.strokeStyle = 'black'
            context.fill()
            context.stroke()
        }

        requestAnimationFrame( () => {
            this.render(context)
        })
    }
}
