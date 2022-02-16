import React from 'react'
import styles from './Grid.module.css'
import CellDisplay from './Cell'

import { CellGrid } from '../helper';

interface CellGridDisplayProps {
  grid: Readonly<CellGrid>,
  onClickCell: (x: number, y: number) => void
}

const CellGridDisplay: React.FC<CellGridDisplayProps> = ({
  grid,  
  onClickCell: onCellClick
}: CellGridDisplayProps) => {
  return (
    <div className={styles.container}>
      {grid.map((row, y) =>        
        <div className={styles.row} key={y}>
          {row.map((cell, x) => 
            <CellDisplay 
              cell={cell}
              onClick={() => onCellClick(x, y)}
              key={x}
            />
          )}
        </div>
      )}
    </div>
  )
}

export default CellGridDisplay;