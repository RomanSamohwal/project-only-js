const CODES = {
  A: 65,
  Z: 90
}

// eslint-disable-next-line no-unused-vars
function toCell() {
  return `
    <div class = 'cell' contenteditable></div>
  `
}

function toColumn(col) {
  return `<div class='column'> ${col} </div>`
}

function createRow(index, content) {
  return `
  <div class='row'>
    <div class='row-info'>${index ? index : ''}</div>
    <div class='row-data'>${content}</div>
  </div>`
}

function toChar(_, index) {
  return String.fromCharCode( CODES.A + index)
}

export function createTable(rowsCounts = 15) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []

  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(toColumn)
      .join('')

  rows.push(createRow(null, cols))
  for (let i = 0; i < rowsCounts; i++) {
    const cells = new Array(colsCount)
        .fill(toCell)
        .map(toCell)
        .join('')
    rows.push(createRow(i + 1, cells))
  }

  return rows.join('')
}
