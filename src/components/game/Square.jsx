import { memo } from 'react';

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
  const {square, game, setSelectedPiece, setPossibleSquares, setPieces} = props;


  const piece = getPiece(game.pieces, square);
  const possibleSquare = isPossibleSquare(game.possibleSquares, square);

  return (
    <div></div>
  );
};

export default memo(Square);
