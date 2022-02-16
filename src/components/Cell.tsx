import React from 'react'
import classNames from 'classnames'
import { CellState } from '../helper'
import styles from './Cell.module.css'

interface CellDisplayProps {
  cell: CellState,
  onClick: () => void,  
}

const CellDisplay: React.FC<CellDisplayProps> = ({ 
  cell, 
  onClick,  
}: CellDisplayProps) =>
    <div 
      className={classNames(styles.container, styles[cell])} 
      onClick={onClick}
    ></div>

export default CellDisplay;