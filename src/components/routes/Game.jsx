import { useStore } from '../../context/store';
import useSocket from '../../hooks/useSocket';

import Board from '../game/Board';
import NavBar from '../utils/NavBar';
import Pending from '../utils/Pending';

const Game = () => {
  const socket = useSocket();
  const { user } = useStore('user');

  if (user.userPending || !user.info) {
    return <Pending />;
  }
  return (
    <>
      <NavBar />
      <div>
        Game
        <Board player="white" />
      </div>
    </>
  );
};

export default Game;