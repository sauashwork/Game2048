import React from 'react';

export default function Controls({onMove}){
  return (
    <div className="controls">
      <button onClick={()=>onMove('UP')}>Up</button>
      <button onClick={()=>onMove('LEFT')}>Left</button>
      <button onClick={()=>onMove('DOWN')}>Down</button>
      <button onClick={()=>onMove('RIGHT')}>Right</button>
    </div>
  );
}
