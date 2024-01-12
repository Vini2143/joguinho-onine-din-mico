
export class Player {

    constructor(color) {

        let colors = [
            '#FF0000',
            '#FFFF00',
            '#0097FF',
            '#C0C0C0',
            '#0CFF00'
        ]

        this.x = 55
        this.y = 55
        this.velocity = [0, 0]
        this.color = color ? color : colors[Math.floor(Math.random() * 5)]

        setInterval(() => {
                    
            this.x += this.velocity[0]
            this.y += this.velocity[1]

        }, 25)
    }
}

export class Game {

    constructor() {
        //variaveis

        this.objects = {}

    }


    //funções

    moveObject(id, dir) {
        let vel = 2
        this.objects[id].velocity = [dir[0]*vel, dir[1]*vel]
    }
    
    addPlayer(id, color = false) {

        this.objects[id] = new Player(color)

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
