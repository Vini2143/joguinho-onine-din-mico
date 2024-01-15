export class Vector {

    constructor(x = 0, y = 0) {
        if (typeof(x) == 'object') {

            this.x = x.x
            this.y = x.y
        } else {

            this.x = x
            this.y = y
        }
    }



    getMod() {

        return Math.sqrt( this.x ** 2 + this.y ** 2 )
    }

    normalize() {

        const mod = this.getMod()

        if (mod) {

            return new Vector(this.x / mod, this.y / mod)
        } else {

            return this
        }
    }

    scalarMult(val) {

        this.x = this.x * val
        this.y = this.y * val

        return this
    }

    sum(vector) {

        this.x += vector.x
        this.y += vector.y

        return this
    }

}


export class Player {

    constructor(color) {

        const colors = [
            '#FF0000',
            '#FFFF00',
            '#0097FF',
            '#C0C0C0',
            '#0CFF00'
        ]

        this.position = new Vector({ x: 55, y: 55 })
        this.velocity = new Vector()
        this.color = color ? color : colors[Math.floor(Math.random() * 5)]

        setInterval(() => {

            this.position.sum(this.velocity)
            
            this.position.x = Math.max(this.position.x, 5)
            this.position.y = Math.max(this.position.y, 5)
            this.position.x = Math.min(this.position.x, 595)
            this.position.y = Math.min(this.position.y, 395)

        }, 25)        
    }
}

export class Game {

    constructor() {

        this.objects = {}
    }


    moveObject(id, dir) {
        const object = this.objects[id]
        const direction = new Vector(dir)

        object.velocity = direction.scalarMult(3)
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
            
            const player = this.objects[id]
            const position = player.position

            context.beginPath();
            context.arc(position.x, position.y, 5, 0, 2 * Math.PI)
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
