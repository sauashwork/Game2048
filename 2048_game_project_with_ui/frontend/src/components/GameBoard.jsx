import React from 'react';
import Tile from './Tile';

export default function GameBoard({board, newTiles, moveDir}){
  const size = board.length;
  const newSet = new Set((newTiles || []).map(([r, c]) => `${r}-${c}`));
  const dirClass = moveDir ? `move-${moveDir.toLowerCase()}` : '';
  return (
    <div className={`board ${dirClass}`} style={{gridTemplateColumns: `repeat(${size}, 1fr)`}}>
      {board.map((row, i) =>
        row.map((v, j) => (
          <Tile key={`${i}-${j}`} value={v} isNew={newSet.has(`${i}-${j}`)} />
        ))
      )}
    </div>
  );
}
