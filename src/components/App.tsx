import React from 'react';
import useCellCanvas from '../lib/canvas'
import CellGridDisplay from './Grid'
import { createEmptyGrid } from '../helper';
import styles from './App.module.css';

const App: React.FC = () => {
  //TODO: MAKE x,y into config file
  const { 
    cellGrid,
    gotoNextGen,
    reset, 
    clear, 
    toggleCell     
  } = useCellCanvas(createEmptyGrid(10,10))

  return (
    <div className={styles.App}>

      <div className={styles.controls}>
        <div className={styles.button}>
          <button onClick={gotoNextGen}>Next Generation</button>
        </div>        

        <div className={styles.button}>
          <button onClick={reset}>Reset</button>
        </div>

        <div className={styles.button}>
          <button onClick={clear}>Clear</button>
        </div>
      </div>

      <div className={styles.content}>
        <CellGridDisplay
          grid={cellGrid}
          onClickCell={toggleCell}
        />
      </div>

    </div>
  );
}

export default App;
