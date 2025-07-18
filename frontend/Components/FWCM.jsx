import React, { useState, useEffect } from 'react';
import '../Assets/css/fwcm.css';

const colors = ['plain', 'yellow', 'red'];

const buttonData = [
  { label: 'top left', row: 0, col: 0 },
  { label: 'front', row: 0, col: 1 },
  { label: 'top right', row: 0, col: 2 },
  { label: 'mid left', row: 1, col: 0 },
  { label: 'mid', row: 1, col: 1 },
  { label: 'mid right', row: 1, col: 2 },
  { label: 'lower left', row: 2, col: 0 },
  { label: 'lower', row: 2, col: 1 },
  { label: 'lower right', row: 2, col: 2 },
];

const ColorGrid = () => {
  const [colorIndices, setColorIndices] = useState(
    Array(buttonData.length).fill(0)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndices(
        buttonData.map(() => Math.floor(Math.random() * colors.length))
      );
    }, 1000); // Change every 1 second

    return () => clearInterval(interval);
  }, []);

  // Group buttons into rows
  const rows = [[], [], []];
  buttonData.forEach((btn, i) => {
    const colorClass = colors[colorIndices[i]];
    rows[btn.row].push(
      <button key={i} className={`button ${colorClass}`}>
        {btn.label}
      </button>
    );
  });

  return (
    <div style={{ display: 'inline-block' }}>
      {rows.map((row, i) => (
        <div key={i} style={{ display: 'flex' }}>
          {row}
        </div>
      ))}
    </div>
  );
};

export default ColorGrid;
