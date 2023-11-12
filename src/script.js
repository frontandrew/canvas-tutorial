const canvas = document.getElementById('canvas')
const canvasContext = canvas.getContext('2d')

// console.log('CANVAS: ', canvasContext)

canvas.width = 400
canvas.height = 400

// canvasContext.fillStyle = 'red'
// canvasContext.fillRect(190, 190, 20, 20)

// canvasContext.fillRect(10, 10, 100, 16)
// canvasContext.fillRect(10, 30, 16, 150)

class Logo {
    constructor(context, config) {
        this.width = context.canvas.width
        this.height = context.canvas.height
        this.ctx = context
        this.config = config
        this.defaultColor = 'yellow'
        this.indentCoef = 22 / 16
    }

    __debug(params) {
        console.log('DEBUG: ', { ...params })
    }

    render(dx = 0, dy = 0, color) {
        this.__debug({ ...this, diff: { dx, dy, color } })
        
        const { horizontal: hl, vertical: vl, thickness: th } = this.config
        const {indentCoef: coef, width: wd, height: hg} = this
        
        const vert1PosX = (wd / 2) - (hl / 2) - (th * coef) - th
        const vert2PosX = (wd / 2) + (hl / 2) + (th * coef)
        const horizPosX = (wd / 2) - (hl / 2)

        const vert1PosY = (hg / 2) - (vl / 2) + (th * coef)
        const vert2PosY = (hg / 2) - (vl / 2) + (th * coef)
        const horixPosY = (hg / 2) - (vl / 2) - th

        this.__setColor(color)
        this.__createLine(vert1PosX + dx, vert1PosY + dy, th, vl)
        this.__createLine(vert2PosX + dx, vert2PosY + dy, th, vl)
        this.__createLine(horizPosX + dx, horixPosY + dy, hl, th)
    }

    __createLine(x, y, width, height) {
        this.ctx.fillRect(x, y, width, height)
    }

    __clear() {
        this.ctx.clearRect(0, 0, this.width, this.height)
    }

    __setColor(color) {
        this.ctx.fillStyle = color || this.config.color || this.defaultColor
    }
}

const logoConfig = {
    vertical: 150,
    horizontal: 100,
    thickness: 16,
    color: 'white',
}
const logo = new Logo(canvasContext, logoConfig)

// logo.__clear()
// logo.__setColor()
// logo.__createLine(10, 30, 16, 150)
logo.render(-150, -20)
