class Renderer {
    constructor(canvas, gl) {
        this.canvas = canvas
        this.gl = gl

        this.createShaders()
        this.createProgram()
        this.setupViewport()
        this.gl.lineWidth(5)
    }

    render(mode = this.gl.LINE_STRIP) {
        const buffer = this.gl.createBuffer()
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer)

        const positions = []
        this.points.forEach(point => {
            positions.push(point[0])
            positions.push(point[1])
        })
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(positions), this.gl.STATIC_DRAW)

        this.clear()

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer)
        const positionAttributeLocation = this.gl.getAttribLocation(this.program, "a_position")
        this.gl.enableVertexAttribArray(positionAttributeLocation)
        this.gl.vertexAttribPointer(
            positionAttributeLocation,
            2, //components per iteration
            this.gl.FLOAT, //say its floats
            false, //dont normalize
            0, //stride equally
            0, //no offset
        )

        this.gl.drawArrays(
            mode,
            0, //no offset
            this.points.length
        )
    }

    clear() {
        this.gl.clearColor(0, 0, 0, 0)
        this.gl.clear(this.gl.COLOR_BUFFER_BIT)
    }

    setupViewport() {
        this.gl.canvas.height = this.gl.canvas.clientHeight
        this.gl.canvas.width = this.gl.canvas.clientWidth
        this.gl.viewport(0, 0, this.gl.canvas.clientWidth, this.gl.canvas.clientHeight)
    }

    createProgram() {
        this.program = this.gl.createProgram()
        this.gl.attachShader(this.program, this.shaders.vertex)
        this.gl.attachShader(this.program, this.shaders.fragment)
        this.gl.linkProgram(this.program)
        if (this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS)) {
            this.gl.useProgram(this.program)
        } else {
            console.log(this.gl.getProgramLogInfo(this.program))
            this.gl.deleteProgram(this.program)
            throw new Error("Couldn't create program ")
        }

    }

    createShaders() {
        this.shaders = {
            vertex: this.createShader(
                this.gl.VERTEX_SHADER,
                `
                attribute vec4 a_position;
                void main() {
                  gl_Position = a_position;
                }
                `
            ),
            fragment: this.createShader(
                this.gl.FRAGMENT_SHADER,
                `
                precision mediump float;
                void main() {
                  gl_FragColor = vec4(1, 0, 0.5, 1);
                }
                `
            )
        }
    }

    createShader(type, source) {
        const shader = this.gl.createShader(type)
        this.gl.shaderSource(shader, source)
        this.gl.compileShader(shader)
        if (this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
            return shader
        } else {
            console.log(this.gl.getShaderInfoLog(shader))
            this.gl.deleteShader(shader)
            throw new Error("Couldn't create shader!")
        }
    }
}