const ctx = document.getElementById('canvas').getContext('2d')

// console.log('CANVAS: ', ctx)

canvas.width = 400
canvas.height = 400

// ctx.fillStyle = 'red'
// ctx.fillRect(190, 190, 20, 20)

// ctx.fillRect(10, 10, 100, 16)
// ctx.fillRect(10, 30, 16, 150)

class Logo {
    constructor(context, config) {
        this.width = context.canvas.width
        this.height = context.canvas.height
        this.ctx = context
        this.config = config
        this.defaultColor = 'yellow'
        this.indentCoef = 22 / 16
        this.currentOffset = { x: 0, y: 0 }
    }

    _debug(params) {
        console.log('DEBUG: ', { ...params })
    }

    render(dx = 0, dy = 0, color) {
        this._debug({ ...this, params: { diff: { dx, dy, renderColor: color } } })

        const { horizontal: hl, vertical: vl, thickness: th } = this.config
        const {indentCoef: coef, width: wd, height: hg} = this

        this._setOffset(dx, dy)
        const { x, y } = this.currentOffset
        
        const vert1PosX = (wd / 2) - (hl / 2) - (th * coef) - th
        const vert2PosX = (wd / 2) + (hl / 2) + (th * coef)
        const horizPosX = (wd / 2) - (hl / 2)

        const vert1PosY = (hg / 2) - (vl / 2) + (th * coef)
        const vert2PosY = (hg / 2) - (vl / 2) + (th * coef)
        const horixPosY = (hg / 2) - (vl / 2) - th

        this._clear()
        this._setColor(color)
        this._createLine(vert1PosX + x, vert1PosY + y, th, vl)
        this._createLine(vert2PosX + x, vert2PosY + y, th, vl)
        this._createLine(horizPosX + x, horixPosY + y, hl, th)
    }

    _setOffset(dx, dy) {
        this.currentOffset.x += dx
        this.currentOffset.y += dy        
    }

    _createLine(x, y, width, height) {
        this.ctx.fillRect(x, y, width, height)
    }

    _clear() {
        this.ctx.clearRect(0, 0, this.width, this.height)
    }

    _setColor(color) {
        this.ctx.fillStyle = color || this.config.color || this.defaultColor
    }
}

const logoConfig = {
    vertical: 150,
    horizontal: 100,
    thickness: 16,
    color: 'white',
}
const logo = new Logo(ctx, logoConfig)

const STEP = 25;

// logo._clear()
logo.render(0, 0)
// logo._clear()
// logo._createLine(10, 30, 16, 150)
// logo._setColor('red')

document.addEventListener('keyup', function({ code }) {
    console.log('EVENT: ', { code })

    const { dx, dy } = function(code = '') {
        if(code === 'ArrowUp') return { dx: 0, dy: -STEP }
        if(code === 'ArrowDown') return { dx: 0, dy: STEP }
        if(code === 'ArrowLeft') return { dx: -STEP, dy: 0 }
        if(code === 'ArrowRight') return { dx: STEP, dy: 0 }

        return { dx: 0, dy: 0 }
    }(code)

    // logo.render(dx, dy, 'red')

    ctx.translate(dx, dy)
    logo._clear()
    logo._setColor('red')
})
