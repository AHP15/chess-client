import { useCallback, useState } from "react";
import matrix from "../../gameLogic/board";
import initialPieces from "../../gameLogic/initialPieces";
import Square from "./Square";

import styles from '../../styles/game/Board.module.css';

const Board = ({player}) => {
  const [game, setGame] = useState({
    player,
    pieces: initialPieces,
    possibleSquares: [],
    selectedPiece: null,
    king: player === "white"? initialPieces.KGE1:initialPieces.KGD8, //white or black king depend on the player prop
    incheck: false, //is king in check
    positionsToFilled: [] // if king si in ckeck which square should be filled
  });

  //when the user click on a square that has a piece:
  //set the selectedPiece of the game state
  const handleChangeSelectedPiece = useCallback((newPiece) => setGame(prev => ({
    ...prev,
    selectedPiece: newPiece, // get newPiece from event handler inside Square.js
  })), []);

  //After the user click on a square that has a piece:
  //set the possibleSquares for the newPiece of the game state
  const handleChangePossibleSquares = useCallback((squares) => setGame(prev => ({
    ...prev,
    possibleSquares: squares, // get squares from event handler inside Square.js
  })), []);

  //This function will be invoked:
  //after the user shoused a possible square in Square.js
  const handleChangePieces = useCallback((newPieces) => setGame(prev => ({
    ...prev,
    pieces: newPieces,
    possibleSquares: [], //reset possibleSquares
    selectedPiece: null, //reset selectedPiece
  })), []);

  return (
    <div className={styles.board}>
      {
        matrix.map(row => row.map(square => (
          <Square
            key={square.name}
            square={square}
            game={game}
            setSelectedPiece={handleChangeSelectedPiece}
            setPossibleSquares={handleChangePossibleSquares}
            setPieces={handleChangePieces}
          />
        )))
      }
    </div>
  );
};

export default Board;