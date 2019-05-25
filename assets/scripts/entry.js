window.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("canvas")
    const gl = canvas.getContext("webgl", {
        antialias: false
    })
    if (gl) {
        const renderer = new Renderer(canvas, gl)
        const defaultPoints = renderer.points = [
            [0, 0],
            [0.05, 0],
            [0.05, 0.05],
            [0, 0.05],
            [0, 0]
        ]
        renderer.render()

        const staticmath = MathQuill.getInterface(2).StaticMath(document.getElementById("equation"))
        staticmath.config({
            handlers: {
                edit: () => {
                    const values = staticmath.innerFields.map(field => parseInt(field.latex()))
                    if (!values.some(value => isNaN(value))) {
                        const points = renderer.points = []
                        defaultPoints.forEach(point => points.push(multiply(values, point)))
                        renderer.render()
                    }
                }
            }
        })
    } else {
        document.getElementsByTagName("body")[0].innerHTML = "Your browser does not support WebGL."
    }
})

function multiply(matrix, point) {
    return [((matrix[0] * point[0]) + (matrix[1] * point[1])), ((matrix[2] * point[0]) + (matrix[3] * point[1]))]
}