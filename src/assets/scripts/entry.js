window.addEventListener("DOMContentLoaded", () => {
    const renderer = new Renderer(document.getElementById("calculator"))
    const defaultPoints = renderer.points = [
        [0, 0],
        [1, 0],
        [1, 1],
        [0, 1],
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
})

function multiply(matrix, point) {
    return [((matrix[0] * point[0]) + (matrix[1] * point[1])), ((matrix[2] * point[0]) + (matrix[3] * point[1]))]
}