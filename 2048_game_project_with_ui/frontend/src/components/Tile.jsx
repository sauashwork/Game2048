import React from 'react';

export default function Tile({ value, isNew, isMerged }) {
  return (
    <div className={`tile${isNew ? ' new-tile' : ''}${isMerged ? ' merge-splash' : ''}`} data-value={value}>
      <span className="tile-inner">{value > 0 ? value : ''}</span>
      {isMerged && <span className="splash"></span>}
    </div>
  );
}
