import "./App.css";
import { useState, useEffect } from "react";
import BlueCandy from "./assets/blue-candy.png";
import YellowCandy from "./assets/yellow-candy.png";
import OrangeCandy from "./assets/orange-candy.png";
import PurpleCandy from "./assets/purple-candy.png";
import GreenCandy from "./assets/green-candy.png";
import RedCandy from "./assets/red-candy.png";
import blank from "./assets/blank.png";
import ScoreBoard from "./components/ScoreBoard";
import Footer from "./components/Footer";
const grid = 8;

const colors = [
  RedCandy,
  BlueCandy,
  GreenCandy,
  YellowCandy,
  OrangeCandy,
  PurpleCandy,
];

const App = () => {
  //state for current board arrangements
  const [currentColorArrangement, setCurrentColorArrangement] = useState([]);

  const [squareBeingDragged, setSquareBeingDragged] = useState(null);
  const [squareBeingReplaced, setSquareBeingReplaced] = useState(null);
  const [currentScore, setCurrentScore] = useState(0);
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
    for (let i = 0; i <= 39; i++) {
      const columnOfFour = [i, i + grid, i + grid * 2, i + grid * 3];
      const decidingColor = currentColorArrangement[i];

      if (
        columnOfFour.every(
          (square) => currentColorArrangement[square] === decidingColor
        )
      ) {
        columnOfFour.forEach((square) => {
          currentColorArrangement[square] = blank;
        });
        setCurrentScore(currentScore + 4);
        return true;
      }
    }
  };
  const checkForColumnOfThree = () => {
    for (let i = 0; i <= 47; i++) {
      const columnOfThree = [i, i + grid, i + grid * 2];
      const decidedColor = currentColorArrangement[i];
      const isBlank = currentColorArrangement[i] === blank;

      if (
        columnOfThree.every(
          (square) =>
            currentColorArrangement[square] === decidedColor && !isBlank
        )
      ) {
        // setScoreDisplay((score) => score + 3);
        columnOfThree.forEach(
          (square) => (currentColorArrangement[square] = blank)
        );
        setCurrentScore(currentScore + 3);
        return true;
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
          currentColorArrangement[square] = blank;
        });
        setCurrentScore(currentScore + 3);
        return true;
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
          currentColorArrangement[square] = blank;
        });
        setCurrentScore(currentScore + 4);
        return true;
      }
    }
  };

  const moveIntoSquareBelow = () => {
    for (let i = 0; i < 64 - grid; i++) {
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];

      const isFirstRow = firstRow.includes(i);

      if (isFirstRow && currentColorArrangement[i] === blank) {
        currentColorArrangement[i] =
          colors[Math.floor(Math.random() * colors.length)];
      }

      if (currentColorArrangement[i + grid] === blank) {
        currentColorArrangement[i + grid] = currentColorArrangement[i];
        currentColorArrangement[i] = blank;
      }
    }
  };

  const dragStart = (e) => {
    // console.log("Drag START");

    setSquareBeingDragged(e.target);
  };
  const dragDrop = (e) => {
    console.log("Drag DROP");
    e.preventDefault();

    setSquareBeingReplaced(e.target);
  };
  const dragEnd = () => {
    const squareBeingDraggedId = parseInt(
      squareBeingDragged.getAttribute("data-id")
    );
    const squareBeingReplacedId = parseInt(
      squareBeingReplaced.getAttribute("data-id")
    );

    currentColorArrangement[squareBeingReplacedId] =
      squareBeingDragged.getAttribute("src");
    currentColorArrangement[squareBeingDraggedId] =
      squareBeingReplaced.getAttribute("src");

    const validMoves = [
      squareBeingDraggedId - 1,
      squareBeingDraggedId - grid,
      squareBeingDraggedId + 1,
      squareBeingDraggedId + grid,
    ];

    const validMove = validMoves.includes(squareBeingReplacedId);
    if (validMove) {
      const isAColumnOfFour = checkForColumnOfFour();
      const isARowOfFour = checkForRowOfFour();
      const isAColumnOfThree = checkForColumnOfThree();
      const isARowOfThree = checkForRowOfThree();
      if (
        squareBeingReplacedId &&
        validMove &&
        (isARowOfThree || isARowOfFour || isAColumnOfFour || isAColumnOfThree)
      ) {
        setSquareBeingDragged(null);
        setSquareBeingReplaced(null);
      } else {
        currentColorArrangement[squareBeingReplacedId] =
          squareBeingReplaced.getAttribute("src");
        currentColorArrangement[squareBeingDraggedId] =
          squareBeingDragged.getAttribute("src");
        setCurrentColorArrangement([...currentColorArrangement]);
      }
    } else {
      currentColorArrangement[squareBeingReplacedId] =
        squareBeingReplaced.getAttribute("src");
      currentColorArrangement[squareBeingDraggedId] =
        squareBeingDragged.getAttribute("src");
      setCurrentColorArrangement([...currentColorArrangement]);
    }

    // const isAColumnOfFour = checkForColumnOfFour();
    // const isARowOfFour = checkForRowOfFour();
    // const isAColumnOfThree = checkForColumnOfThree();
    // const isARowOfThree = checkForRowOfThree();

    // console.log(
    //   "move",
    //   squareBeingReplacedId,
    //   validMoves.includes(squareBeingReplacedId)
    // );
    // console.log("moves", validMoves);
    // console.log(isAColumnOfFour, isARowOfFour, isAColumnOfThree, isARowOfThree);
    // console.log(
    //   "condition",
    //   squareBeingReplacedId &&
    //     validMove &&
    //     (isARowOfThree || isARowOfFour || isAColumnOfFour || isAColumnOfThree)
    // );
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
  return (
    <div className="app">
      <h1>React Candy Crush </h1>
      <div className="game">
        {currentColorArrangement.map((currentColor, index) => (
          <img
            src={currentColor}
            key={index}
            draggable={true}
            data-id={index}
            onDragStart={dragStart}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => e.preventDefault()}
            onDragLeave={(e) => e.preventDefault()}
            onDrop={dragDrop}
            onDragEnd={dragEnd}
          />
        ))}
      </div>

      <Footer currentScore={currentScore} />
    </div>
  );
};
export default App;
