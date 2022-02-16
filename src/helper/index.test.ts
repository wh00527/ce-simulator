import { 
  CellGrid, 
  CellState,
  countAliveNeighbors, 
  generateNextGen,
  _wrapNumberInRange
} from '.'

const toCell = (str: string): CellState => (str !== ' ' ? 'alive' : 'dead')

// define all test frames
const testFrame1: Readonly<CellGrid> = [ 
  [' ',' ',' ',' ',' ',' '], 
  [' ',' ','X',' ',' ',' '], 
  [' ',' ',' ','X',' ',' '], 
  [' ','X','X','X',' ',' '], 
  [' ',' ',' ',' ',' ',' '], 
  [' ',' ',' ',' ',' ',' ']
].map(row => row.map(toCell)) 

const testFrame2: Readonly<CellGrid> = [ 
  [' ',' ',' ',' ',' ',' '], 
  [' ',' ',' ',' ',' ',' '], 
  [' ','X',' ','X',' ',' '], 
  [' ',' ','X','X',' ',' '], 
  [' ',' ','X',' ',' ',' '], 
  [' ',' ',' ',' ',' ',' ']
].map(row => row.map(toCell)) 

const testFrame3: Readonly<CellGrid> = [ 
  [' ',' ',' ',' ',' ',' '], 
  [' ',' ',' ',' ',' ',' '], 
  [' ',' ',' ','X',' ',' '], 
  [' ','X',' ','X',' ',' '], 
  [' ',' ','X','X',' ',' '], 
  [' ',' ',' ',' ',' ',' '] 
].map(row => row.map(toCell)) 

const testFrame4: Readonly<CellGrid> = [ 
  [' ',' ',' ',' ',' ',' '], 
  [' ',' ',' ',' ',' ',' '], 
  [' ',' ','X',' ',' ',' '], 
  [' ',' ',' ','X','X',' '], 
  [' ',' ','X','X',' ',' '], 
  [' ',' ',' ',' ',' ',' '] 
].map(row => row.map(toCell)) 

const testFrame5: Readonly<CellGrid> = [ 
  [' ',' ',' ',' ',' ',' '], 
  [' ',' ',' ',' ',' ',' '], 
  [' ',' ',' ','X',' ',' '], 
  [' ',' ',' ',' ','X',' '], 
  [' ',' ','X','X','X',' '], 
  [' ',' ',' ',' ',' ',' '] 
].map(row => row.map(toCell)) 

test('countAliveNeighbors on testFrame1', () => {
  const expectedNumNeighbors: number[][] = [ 
    [0,1,1,1,0,0], 
    [0,1,1,2,1,0], 
    [1,3,5,3,2,0], 
    [1,1,3,2,2,0], 
    [1,2,3,2,1,0], 
    [0,0,0,0,0,0] 
  ]

  const col = 2
  const row = 4
  expect(expectedNumNeighbors[row][col]).toBe(3)

  const result = testFrame1.map((row, y) =>
    row.map((cell, x) =>
      countAliveNeighbors(x, y, testFrame1)
    )
  )
  console.log('output: ', result)

  expect(result).toStrictEqual(expectedNumNeighbors)
})

test('generateNextGen', () => {
  expect(generateNextGen(testFrame1)).toStrictEqual(testFrame2)
  expect(generateNextGen(testFrame2)).toStrictEqual(testFrame3)
  expect(generateNextGen(testFrame3)).toStrictEqual(testFrame4)
  expect(generateNextGen(testFrame4)).toStrictEqual(testFrame5)
})

test('_wrapNumberInRange', () => {
  expect(_wrapNumberInRange(-1, 0, 5)).toBe(5)
  expect(_wrapNumberInRange(0, 0, 5)).toBe(0)
  expect(_wrapNumberInRange(1, 0, 5)).toBe(1)
  expect(_wrapNumberInRange(2, 0, 5)).toBe(2)
  expect(_wrapNumberInRange(3, 0, 5)).toBe(3)
  expect(_wrapNumberInRange(4, 0, 5)).toBe(4)
  expect(_wrapNumberInRange(5, 0, 5)).toBe(5)
  expect(_wrapNumberInRange(6, 0, 5)).toBe(0)
})
