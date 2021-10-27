import "./App.css";
import { useState, useEffect } from "react";

const grid = 8;

const colors = ["red", "blue", "green", "yellow", "orange", "purple"];

const App = () => {
  //state for current board arrangements
  const [currentColorArrangement, setCurrentColorArrangement] = useState([]);

  // function for creating board
  const createBoard = () => {
    const randomColorArrangement = [];
    for (let i = 0; i < 64; i++) {
      let randomColor = colors[Math.floor(Math.random() * colors.length)];
      randomColorArrangement.push(randomColor);
    }
    setCurrentColorArrangement(randomColorArrangement);
  };

  const checkForColumnOfFour = () => {
    for (let i = 0; i < 39; i++) {
      const columnOfFour = [i, i + grid, i + grid * 2, i + grid * 3];
      const decidingColor = currentColorArrangement[i];

      if (
        columnOfFour.every(
          (square) => currentColorArrangement[square] === decidingColor
        )
      ) {
        columnOfFour.forEach((square) => {
          currentColorArrangement[square] = "";
        });
      }
    }
  };
  const checkForColumnOfThree = () => {
    for (let i = 0; i < 47; i++) {
      const columnOfThree = [i, i + grid, i + grid * 2];
      const decidingColor = currentColorArrangement[i];

      if (
        columnOfThree.every(
          (square) => currentColorArrangement[square] === decidingColor
        )
      ) {
        columnOfThree.forEach((square) => {
          currentColorArrangement[square] = "";
        });
      }
    }
  };

  const checkForRowOfThree = () => {
    for (let i = 0; i < grid * grid; i++) {
      const rowOfThree = [i, i + 1, i + 2];
      const decidingColor = currentColorArrangement[i];

      const notValid = [
        6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64,
      ];

      if (notValid.includes(i)) continue;

      if (
        rowOfThree.every(
          (square) => currentColorArrangement[square] === decidingColor
        )
      ) {
        rowOfThree.forEach((square) => {
          currentColorArrangement[square] = "";
        });
      }
    }
  };
  const checkForRowOfFour = () => {
    for (let i = 0; i < grid * grid; i++) {
      const rowOfFour = [i, i + 1, i + 2];
      const decidingColor = currentColorArrangement[i];

      const notValid = [
        5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53,
        54, 55, 62, 63, 64,
      ];

      if (notValid.includes(i)) continue;

      if (
        rowOfFour.every(
          (square) => currentColorArrangement[square] === decidingColor
        )
      ) {
        rowOfFour.forEach((square) => {
          currentColorArrangement[square] = "";
        });
      }
    }
  };

  const moveIntoSquareBelow = () => {
    for (let i = 0; i < 64; i++) {
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];

      const isFirstRow = firstRow.includes(i);

      if (isFirstRow && currentColorArrangement[i] === "") {
        currentColorArrangement[i] =
          colors[Math.floor(Math.random() * colors.length)];
      }

      if (currentColorArrangement[i + grid] === "") {
        currentColorArrangement[i + grid] = currentColorArrangement[i];
        currentColorArrangement[i] = "";
      }
    }
  };

  // create the board when app loaded.
  useEffect(() => {
    createBoard();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      checkForColumnOfFour();
      checkForColumnOfThree();
      checkForRowOfFour();
      checkForRowOfThree();
      moveIntoSquareBelow();
      setCurrentColorArrangement([...currentColorArrangement]);
    }, 100);
    return () => clearInterval(timer);
  }, [
    checkForColumnOfThree,
    checkForColumnOfFour,
    checkForRowOfThree,
    checkForRowOfFour,
    moveIntoSquareBelow,
    currentColorArrangement,
  ]);
  console.log(currentColorArrangement);
  return (
    <div className="app">
      <div className="game">
        {currentColorArrangement.map((currentColor, index) => (
          <img
            style={{ backgroundColor: currentColor }}
            key={index}
            draggable={true}
            data-id={index}
            onDragStart={}
            onDragOver={e=>e.preventDefault()}
            onDragEnter={e=>e.preventDefault()}
            onDragLeave={e=>e.preventDefault()}
            onDrag={}
            onDragEnd={}
          />
        ))}
      </div>
    </div>
  );
};
export default App;
