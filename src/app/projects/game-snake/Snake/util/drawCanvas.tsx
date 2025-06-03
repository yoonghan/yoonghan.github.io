const drawSquareBoard = (
  ctx: CanvasRenderingContext2D,
  dimensionWidth: number,
  cellSize: number,
) => {
  ctx.beginPath()

  for (let x = 0; x <= dimensionWidth; x++) {
    ctx.moveTo(x * cellSize, 0)
    ctx.lineTo(x * cellSize, dimensionWidth * cellSize)
  }

  for (let y = 0; y <= dimensionWidth; y++) {
    ctx.moveTo(0, y * cellSize)
    ctx.lineTo(dimensionWidth * cellSize, y * cellSize)
  }

  ctx.stroke()
}

const drawCell = (
  ctx: CanvasRenderingContext2D,
  idx: number,
  dimensionWidth: number,
  cellSize: number,
  fillColor = "#ff0000",
) => {
  const col = idx % dimensionWidth
  const row = Math.floor(idx / dimensionWidth)

  ctx.fillStyle = fillColor

  ctx.beginPath()

  ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize)

  ctx.stroke()
}

const clearBoard = (
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
}

export { drawSquareBoard, drawCell, clearBoard }
