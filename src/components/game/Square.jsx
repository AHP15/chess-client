import { memo } from 'react';

import SUBMIT_MOVE from '../../gameLogic/submitMove';
import CALCULATE_POSSIBLE_MOVES_FOR_A_PIECE from '../../gameLogic/possibleSquares';

import styles from '../../styles/game/Board.module.css';

const getPiece = (piecesObj, square) => {
  /*
    *This code loop throughout all pieces in a game state
    *if a piece with the same coordinates (x, y) of the current square
    *is found the set it the piece state (of this current square)
  */
  for (let [k, v] of Object.entries(piecesObj)) {
    if (v.x === square.x && v.y === square.y) {
      return {
        publicName: k,
        info: v,
      };
    }
  }
  return null;
}

const isPossibleSquare = (possibleSquares, square) => {
  for (let squarePosition of possibleSquares) {
    if (squarePosition?.x === square.x && squarePosition?.y === square.y) {
      return true;
    };
  }
  return false;
}

const Square = (props) => {
  const { square, game, setSelectedPiece, setPossibleSquares, setPieces, rotate } = props;

  const piece = getPiece(game.pieces, square);
  const possibleSquare = isPossibleSquare(game.possibleSquares, square);

  /*
    *When the player click in a square we have 2 cases:
    *a-click on an empty square
      a.1- a and a piece is selected and possibleSquares is not empty (from previeus click)
      a.2- a and a.1 and the current square is a possible square
    *b-click on a square that has a piece
      b.1- b and piece is a player piece (they have the same color)
      b.2- b and piece isn't a player piece (opponent piece) and a piece is selected and       possibleSquares is empty (No possible move from previeus click)
      b.3- b and piece isn't a player piece (opponent piece) and a piece is selected and       possibleSquares is NOT empty (from previeus click)
  */

  const handleClick = () => {
    let calculatePossiblesquares = [];
    let calculateNewPieces = {};
    let alreadySelectedPiece = game.selectedPiece && game.possibleSquares;
    let squareContainsPieceOfPlayer = piece?.info?.color === game.player;

    //this function reset the selectedPiece and possiblesquares from
    //the game state
    const clear = () => {
      setSelectedPiece(null);
      setPossibleSquares([]);
    }

    // case a:
    if (!piece) {
      // a.1
      if (alreadySelectedPiece && !possibleSquare) return clear();
      // a.2
      if (alreadySelectedPiece && possibleSquare) {
        calculateNewPieces = SUBMIT_MOVE(game.pieces, game.selectedPiece, square);
        //I don't need to clear the selectedPiece and possibleSquares.
        //the setPieces function will do that look at Board.js
        setPieces(calculateNewPieces);
        return;
      }
    }
    // case b:
    else {
      // b.1
      if (squareContainsPieceOfPlayer) {
        calculatePossiblesquares = CALCULATE_POSSIBLE_MOVES_FOR_A_PIECE(
          game.pieces,
          piece,
          game.king
        );

        setSelectedPiece(piece);
        return setPossibleSquares(calculatePossiblesquares);
      }
      // b.2
      if (!squareContainsPieceOfPlayer && alreadySelectedPiece && !possibleSquare) {
        return clear();
      }

      if (!squareContainsPieceOfPlayer && alreadySelectedPiece && possibleSquare) {
        calculateNewPieces = SUBMIT_MOVE(game.pieces, game.selectedPiece, square);
        setPieces(calculateNewPieces);
        return;
      }
    }
  
  };

  return (
    <div
      onClick={handleClick}
      className={styles[rotate ? 'rotate_square' : 'square']}
      style={{ backgroundColor: square.background }}
    >
      {piece?.info?.name}
      {possibleSquare ? (<div style={{
        backgroundColor: "green",
        width: "20px",
        height: "20px",
        borderRadius: "50%",
      }}></div>) : null}
    </div>
  );
};

export default memo(Square);
