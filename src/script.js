const logoConfig = {
    width: 400,
    height: 400,
    vertical: 150,
    horizontal: 100,
    thickness: 16,
    color: 'white',
}

class Logo {
    constructor(config) {
        this.config = config
        this.defaultColor = 'yellow'
        this.indentCoef = 22 / 16
        this.ctx = null
        this.element = null
    }

    init() {
        const { width: wd, height: hg  } = this.config

        this.element = document.createElement('canvas');
        this.ctx = this.element.getContext('2d');
        this.element.height = hg
        this.element.width = wd

        this._render()

        return this.element
    }

    _render() {
        const { horizontal: hl, vertical: vl, thickness: th, width: wd, height: hg  } = this.config
        const { indentCoef: coef } = this

        const vert1PosX = (wd / 2) - (hl / 2) - (th * coef) - th
        const vert2PosX = (wd / 2) + (hl / 2) + (th * coef)
        const horizPosX = (wd / 2) - (hl / 2)

        const vert1PosY = (hg / 2) - (vl / 2) + (th * coef)
        const vert2PosY = (hg / 2) - (vl / 2) + (th * coef)
        const horixPosY = (hg / 2) - (vl / 2) - th

        this._clear()
        this._createLine(vert1PosX, vert1PosY, th, vl)
        this._createLine(vert2PosX, vert2PosY, th, vl)
        this._createLine(horizPosX, horixPosY, hl, th)
        this._setColor()
    }

    _createLine(x, y, width, height) {
        this.ctx.rect(x, y, width, height)
    }

    _clear() {
        this.ctx.clearRect(0, 0, this.width, this.height)
    }

    _setColor() {
        this.ctx.fillStyle = this.config.color || this.defaultColor
        this.ctx.fill()
    }
}

class Renderer {
    constructor(config) {
        this.config = config
        this.element = null
        this.ctx = null
        this.matrix = null
        this.pattern = null
    }

    init() {
        this.element = document.getElementById(this.config.id)
        this.ctx = this.element.getContext('2d')

        this.element.width = 400
        this.element.height = 400

        this.matrix = new DOMMatrix()
        this.pattern = this.ctx.createPattern(this.config.animate, 'repeat')
        this.pattern.setTransform(this.matrix)
        
        const { dx, dy } = this._calcDirrection()
        this._render(dx, dy)
    }

    _calcDirrection(event) {
        const code = event?.code ?? null
        const { step } = this.config

        if(code === 'ArrowUp') return { dx: 0, dy: -step }
        if(code === 'ArrowDown') return { dx: 0, dy: step }
        if(code === 'ArrowLeft') return { dx: -step, dy: 0 }
        if(code === 'ArrowRight') return { dx: step, dy: 0 }

        return { dx: 0, dy: 0 }
    }

    _render(dx, dy) {
        this._clear()
        this.matrix.translateSelf(dx, dy);
        this.pattern.setTransform(this.matrix);

        this.ctx.fillStyle = this.pattern
        this.ctx.fillRect(0, 0, this.element.width, this.element.height)
    }

    _clear() {
        this.ctx.clearRect(0, 0, this.element.width, this.element.height)
    }

    animate(event) {
        const { dx, dy } = this._calcDirrection(event)
        this._render(dx, dy)
    }

}

const logo = new Logo(logoConfig)
const animatedElement = logo.init()

const rendererConf = {
    id: 'canvas',
    animate: animatedElement,
    step: 25,
}

const renderer = new Renderer(rendererConf)
renderer.init()

document.addEventListener('keyup', (e) => renderer.animate(e))

/////////////////////////////////////////////////////////////

// const canvas = document.getElementById('canvas');
// const ctx = canvas.getContext('2d');

// canvas.width = 400
// canvas.height = 400

// const pattern = ctx.createPattern(animatedElement, 'repeat');
// const matrix = new DOMMatrix();

// pattern.setTransform(matrix);
// ctx.fillStyle = pattern;
// ctx.fillRect(0, 0, canvas.width, canvas.height);

// document.addEventListener('keyup', function({ code }) {
//     console.log('EVENT: ', { code })

//     const { dx, dy } = function(code = '') {
//         if(code === 'ArrowUp') return { dx: 0, dy: -STEP }
//         if(code === 'ArrowDown') return { dx: 0, dy: STEP }
//         if(code === 'ArrowLeft') return { dx: -STEP, dy: 0 }
//         if(code === 'ArrowRight') return { dx: STEP, dy: 0 }
//     }(code)

//     logo.render(dx, dy)
// })

// function loop() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
    
//     matrix.translateSelf(0.5, 1);
//     pattern.setTransform(matrix);
    
//     ctx.fillStyle = pattern;
//     ctx.fillRect(0, 0, canvas.width, canvas.height);
//     requestAnimationFrame(loop);
//   }

//   requestAnimationFrame(loop);