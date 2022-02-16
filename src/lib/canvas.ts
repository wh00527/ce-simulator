import { useState } from 'react'
import { 
  CellGrid, 
  generateNextGen, 
  generateNextGenWithWrapping,
  createEmptyGrid 
} from '../helper';
import NonEmptyStack from '../helper/NonEmptyStack'

/** 
 * Provides the game board and functions for playing the cell-simulator game
 */
const useCellCanvas = (
  initialState: CellGrid = createEmptyGrid(10,10)
) => {
  const [gridStack, setStack] = useState(new NonEmptyStack<CellGrid>([initialState]))
  const [isWrappingOn, setIsWrappingOn] = useState(false)

  return {
    cellGrid: gridStack.top(), 
    isWrappingOn,

    gotoNextGen: () => setStack(prevStack => _gotoNextGen(prevStack, isWrappingOn)),     

    /** Return to the original user configuration before next generation */
    reset: () => setStack(_reset), 

    /** Set all cells in CellGrid to dead */
    clear: () => setStack(_clear), 

    /** Switch specified cell between alive/dead */
    toggleCell: (xPos: number, yPos: number) => 
      setStack(prevStack => _toggleCell(prevStack, xPos, yPos))        
  }
}

export default useCellCanvas;

/** Private functions - exported for testing only */

export type CellGridStack = NonEmptyStack<CellGrid>

export const _gotoNextGen = (gridStack: CellGridStack, wrapAtEdge: boolean): CellGridStack => {
  const nextGen = (wrapAtEdge
    ? generateNextGenWithWrapping(gridStack.top())
    : generateNextGen(gridStack.top())
  )
  const hasBoardChanged = (
    JSON.stringify(nextGen) !== JSON.stringify(gridStack.top())
  )
  return (hasBoardChanged
    ? gridStack.push(nextGen)
    : gridStack
  )
}

export const _reset = (gridStack: CellGridStack): CellGridStack => 
  new NonEmptyStack<CellGrid>([gridStack.bottom()])

export const _clear = (gridStack: CellGridStack): CellGridStack => {
  const initial = gridStack.bottom()
  const rows = initial.length
  const columns = initial[0].length
  const grid = createEmptyGrid(rows, columns)
  return new NonEmptyStack<CellGrid>([grid])
}

export const _toggleCell = (
  gridStack: CellGridStack, 
  x: number, 
  y: number
): CellGridStack => {
  const grid = gridStack.top()
  grid[y][x] = (grid[y][x] === 'alive' ? 'dead' : 'alive')
  return new NonEmptyStack<CellGrid>([grid])
}