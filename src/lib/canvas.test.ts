import { 
  _gotoNextGen,
  _clear,
  _reset,
  _toggleCell
} from "./canvas"

import NonEmptyStack from '../helper/NonEmptyStack'
import { CellGrid, CellState, createEmptyGrid } from '../helper'

/** helper function to convert string cell representation into Cell type */
const toCell = (str: string): CellState => (str !== ' ' ? 'alive' : 'dead')

const testFrame1: CellGrid = [ 
//  0   1   2   3   4   5
  [' ',' ',' ',' ',' ',' '], // 0
  [' ',' ','X',' ',' ',' '], // 1
  [' ',' ',' ','X',' ',' '], // 2
  [' ','X','X','X',' ',' '], // 3
  [' ',' ',' ',' ',' ',' '], // 4
  [' ',' ',' ',' ',' ',' ']  // 5
].map(row => row.map(toCell)) 

const testFrame2: CellGrid = [ 
//  0   1   2   3   4   5
  [' ',' ',' ',' ',' ',' '], // 0
  [' ',' ',' ',' ',' ',' '], // 1
  [' ','X',' ','X',' ',' '], // 2
  [' ',' ','X','X',' ',' '], // 3
  [' ',' ','X',' ',' ',' '], // 4
  [' ',' ',' ',' ',' ',' ']  // 5
].map(row => row.map(toCell)) 

test("_gotoNextGen adds the next generation to the top of the stack", () => {
  const stack = new NonEmptyStack<CellGrid>([testFrame1])
  const nextState = _gotoNextGen(stack, false)
  expect(nextState.top()).toStrictEqual(testFrame2)
})

test("_gotoNextGen does not change the state if the next-gen is no different from the last gen", () => {
  const emptyBoard = createEmptyGrid(6,6)
  const stack = new NonEmptyStack<CellGrid>([emptyBoard])
  const nextState = _gotoNextGen(stack, false)
  expect(nextState.top()).toStrictEqual(emptyBoard)
})

test("_reset returns the game board to the user's configuration", () => {
  let stack = new NonEmptyStack<CellGrid>([testFrame1, testFrame2])
  stack = _gotoNextGen(stack, false)
  stack = _gotoNextGen(stack, false)
  stack = _gotoNextGen(stack, false)
  stack = _gotoNextGen(stack, false)
  expect(stack.top()).not.toStrictEqual(testFrame1)
  stack = _reset(stack)
  expect(stack.top()).toStrictEqual(testFrame1)
})

test("_clear makes a new board (no history) with all cells dead", () => {
  let stack = new NonEmptyStack<CellGrid>([testFrame1, testFrame2])
  stack = _clear(stack)
  expect(stack.top()).toStrictEqual(createEmptyGrid(6,6))
})

