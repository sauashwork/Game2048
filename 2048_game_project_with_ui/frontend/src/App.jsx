import React, {useEffect, useState, useCallback} from 'react';
import {newGame, move, restart} from './api/gameApi';
import GameBoard from './components/GameBoard';
import Controls from './components/Controls';
import './styles.css';
import { FaUndo, FaRedo } from 'react-icons/fa'; // install react-icons if not present

export default function App(){
  const [state, setState] = useState(null);
  const [size, setSize] = useState(4);
  const [moveDir, setMoveDir] = useState(null);
  const [history, setHistory] = useState([]);
  const [future, setFuture] = useState([]);

  useEffect(()=>{ newGame(size).then(setState); }, [size]);

  useEffect(()=>{
    const handleKey = (e) => {
      const map = {ArrowUp:'UP', ArrowDown:'DOWN', ArrowLeft:'LEFT', ArrowRight:'RIGHT'};
      if(map[e.key]) { doMove(map[e.key]); }
    }
    window.addEventListener('keydown', handleKey);
    return ()=> window.removeEventListener('keydown', handleKey);
  }, [state]);

  const doMove = useCallback((dir)=>{
    setMoveDir(dir);
    setHistory(h => [...h, state]); // Save current state to history
    setFuture([]); // Clear redo stack
    move(dir).then(data => setState(data)).catch(console.error);
  }, [state]);

  const handleUndo = () => {
    if (history.length === 0) return;
    setFuture(f => [state, ...f]);
    setState(history[history.length - 1]);
    setHistory(history.slice(0, -1));
  };

  const handleRedo = () => {
    if (future.length === 0) return;
    setHistory(h => [...h, state]);
    setState(future[0]);
    setFuture(future.slice(1));
  };

  const handleRestart = ()=> restart(size).then(setState);
  const handleNewSize = (s)=> { setSize(s); newGame(s).then(setState); };

  if(!state) return <div>Loading...</div>;

  return (
    <div className="app-row">
      <div className="instructions">
        <h2>How to Play</h2>
        <ul>
          <li>Use arrow keys or buttons to move tiles.</li>
          <li>Merge tiles with the same number.</li>
          <li><strong>Any single tile that contains 2048 is a win!</strong></li>
          <li>Undo/Redo your moves anytime.</li>
        </ul>
      </div>
      <div className="app">
        <h1>2048</h1>
        <div className="header">
          <div>Score: {state.score}</div>
          <div>
            <label>Size: </label>
            <select value={size} onChange={e=>handleNewSize(parseInt(e.target.value))}>
              <option value={3}>3x3</option>
              <option value={4}>4x4</option>
              <option value={5}>5x5</option>
            </select>
            <button onClick={handleRestart}>Restart</button>
          </div>
        </div>

        <GameBoard board={state.board} newTiles={state.newTiles} moveDir={moveDir} mergedTiles={state.mergedTiles} />

        <Controls onMove={doMove} />

        {state.won && <div className="overlay">You Win!</div>}
        {state.over && <div className="overlay">Game Over</div>}
      </div>
      <div className="side-controls">
        <button className="icon-btn" onClick={handleUndo}><FaUndo /></button>
        <button className="icon-btn" onClick={handleRedo}><FaRedo /></button>
      </div>
    </div>
  );
}
