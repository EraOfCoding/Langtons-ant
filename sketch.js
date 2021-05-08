function create2DArray(cols, rows) {
    let arr = new Array(cols)
    for (let i = 0; i < cols; i++) {
        arr[i] = new Array(rows)
    }

    return arr
}


let cols
let rows
let grid
let resolution = 10

let state = 0

let prevX
let prevY

let x
let y

function setup() {
    createCanvas(1500, 690)

    cols = width / resolution
    rows = width / resolution

    grid = create2DArray(cols, rows)

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = 0
        }
    }

    x = 10
    y = 10
}

function draw() {
    background('#fff')

    if (grid[x][y] == 0) {
        grid[x][y] = 1
        switch (state) {
            case 0:
                state = 1
                x += 1
                break
            case 1:
                state = 2
                y += 1
                break
            case 2:
                state = 3
                x -= 1
                break
            case 3:
                state = 0
                y -= 1
                break
        }
    }
    else {
        grid[x][y] = 0
        prevX = x
        prevY = y

        switch (state) {
            case 0:
                state = 3
                x -= 1
                break
            case 1:
                state = 0
                y -= 1
                break
            case 2:
                state = 1
                x += 1
                break
            case 3:
                state = 2
                y += 1
                break
        }
    }
    if (x >= cols) x = 0
    if (y >= rows) y = 0
    if (x < 0) x = cols - 1
    if (y < 0) y = rows - 1

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let recx = i * resolution
            let recy = j * resolution

            if (grid[i][j] == 1) {
                fill(0)
                stroke(255)
                rect(recx, recy, resolution, resolution)
            }
            else if (i == prevX && j == prevY) {
                fill(255)
                rect(recx, recy, resolution, resolution)
            }
        }
    }
}