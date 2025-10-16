export type Tile = {
  id: string;
  value: number;
  row: number;
  col: number;
  isNew?: boolean;
  mergedFrom?: string[];
};

export type Direction = 'up' | 'down' | 'left' | 'right';

export const createEmptyBoard = (size: number): (number | null)[][] => {
  return Array(size).fill(null).map(() => Array(size).fill(null));
};

export const addRandomTile = (board: (number | null)[][], size: number): (number | null)[][] => {
  const emptyCells: [number, number][] = [];
  
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (board[i][j] === null) {
        emptyCells.push([i, j]);
      }
    }
  }
  
  if (emptyCells.length === 0) return board;
  
  const [row, col] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  const newBoard = board.map(row => [...row]);
  newBoard[row][col] = Math.random() < 0.9 ? 2 : 4;
  
  return newBoard;
};

const rotateBoard = (board: (number | null)[][]): (number | null)[][] => {
  const size = board.length;
  const rotated = createEmptyBoard(size);
  
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      rotated[j][size - 1 - i] = board[i][j];
    }
  }
  
  return rotated;
};

const reverseBoard = (board: (number | null)[][]): (number | null)[][] => {
  return board.map(row => [...row].reverse());
};

const slideLeft = (board: (number | null)[][]): { board: (number | null)[][], moved: boolean, scoreGained: number } => {
  const size = board.length;
  const newBoard = board.map(row => [...row]);
  let moved = false;
  let scoreGained = 0;
  
  for (let i = 0; i < size; i++) {
    const row = newBoard[i].filter(val => val !== null);
    const merged: number[] = [];
    
    for (let j = 0; j < row.length - 1; j++) {
      if (row[j] === row[j + 1]) {
        merged.push(row[j]! * 2);
        scoreGained += row[j]! * 2;
        j++;
      } else {
        merged.push(row[j]!);
      }
    }
    
    if (row.length > 0 && (merged.length === 0 || merged[merged.length - 1] !== row[row.length - 1])) {
      merged.push(row[row.length - 1]!);
    }
    
    const newRow = [...merged, ...Array(size - merged.length).fill(null)];
    
    if (JSON.stringify(newRow) !== JSON.stringify(newBoard[i])) {
      moved = true;
    }
    
    newBoard[i] = newRow;
  }
  
  return { board: newBoard, moved, scoreGained };
};

export const move = (board: (number | null)[][], direction: Direction): { board: (number | null)[][], moved: boolean, scoreGained: number } => {
  let workingBoard = board.map(row => [...row]);
  
  switch (direction) {
    case 'left':
      return slideLeft(workingBoard);
    case 'right':
      workingBoard = reverseBoard(workingBoard);
      const rightResult = slideLeft(workingBoard);
      return { ...rightResult, board: reverseBoard(rightResult.board) };
    case 'up':
      for (let i = 0; i < 3; i++) {
        workingBoard = rotateBoard(workingBoard);
      }
      const upResult = slideLeft(workingBoard);
      let upBoard = upResult.board;
      for (let i = 0; i < 1; i++) {
        upBoard = rotateBoard(upBoard);
      }
      return { ...upResult, board: upBoard };
    case 'down':
      workingBoard = rotateBoard(workingBoard);
      const downResult = slideLeft(workingBoard);
      let downBoard = downResult.board;
      for (let i = 0; i < 3; i++) {
        downBoard = rotateBoard(downBoard);
      }
      return { ...downResult, board: downBoard };
  }
};

export const canMove = (board: (number | null)[][], size: number): boolean => {
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (board[i][j] === null) return true;
      
      if (j < size - 1 && board[i][j] === board[i][j + 1]) return true;
      if (i < size - 1 && board[i][j] === board[i + 1][j]) return true;
    }
  }
  
  return false;
};

export const hasWon = (board: (number | null)[][], size: number): boolean => {
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (board[i][j] === 2048) return true;
    }
  }
  return false;
};
