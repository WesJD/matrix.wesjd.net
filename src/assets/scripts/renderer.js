class Renderer {
    constructor(element) {
        this.calculator = Desmos.GraphingCalculator(element, {
            keypad: false,
            expressions: false,
        })
    }

    render() {
        this.calculator.setBlank()
        this.calculator.setExpression({
            type: "expression",
            latex: "(x_1, y_1)",
            showLabel: true
        })
        this.calculator.setExpression({
            type: "table",
            columns: [
                {
                    latex: "x_1",
                    values: this.points.map(point => `${point[0]}`),
                    lines: true
                },
                {
                    latex: "y_1",
                    values: this.points.map(point => `${point[1]}`),
                    lines: true
                },
            ]
        })
    }
}