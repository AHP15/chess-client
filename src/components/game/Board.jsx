import { useCallback, useEffect, useState } from "react";
import matrix from "../../gameLogic/board";
import initialPieces from "../../gameLogic/initialPieces";
import Square from "./Square";

import styles from '../../styles/game/Board.module.css';

import useSocket from '../../hooks/useSocket';
import { useStore } from "../../context/store";

const Board = ({ player }) => {
  const [game, setGame] = useState({
    player,
    pieces: initialPieces,
    possibleSquares: [],
    selectedPiece: null,
    king: player === "white"? initialPieces.KGE1:initialPieces.KGD8, //white or black king depend on the player prop
    incheck: false, //is king in check
    positionsToFilled: [] // if king si in ckeck which square should be filled
  });

  const socket = useSocket();
  const { gameInfo } = useStore('gameInfo');

  useEffect(() => {
    if (!socket) return;
    socket.on('move-received', (newPieces) => {
      setGame(prev => ({
        ...prev,
        pieces: newPieces,
      }));
    });
  }, [socket]);

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
  //after the user choosed a possible square in Square.js
  const handleChangePieces = useCallback((newPieces) => {
    setGame(prev => ({
      ...prev,
      pieces: newPieces,
      possibleSquares: [], //reset possibleSquares
      selectedPiece: null, //reset selectedPiece
    }));
    socket.emit('move-sent', {
      newPieces,
      email: gameInfo.player.opponent,
    });
  }, []);

  return (
    <div className={styles[player === 'black' ? 'rotate_board' : 'board']}>
      {
        matrix.map(row => row.map(square => (
          <Square
            key={square.name}
            square={square}
            game={game}
            setSelectedPiece={handleChangeSelectedPiece}
            setPossibleSquares={handleChangePossibleSquares}
            setPieces={handleChangePieces}
            rotate={player === 'black'}
          />
        )))
      }
    </div>
  );
};

export default Board;