import { useStore } from '../../context/store';

import Board from '../game/Board';

const Game = () => {
  const { test } = useStore(globalState => globalState.test);
  console.log(test);
  return (
    <div>
      Game
      <Board player="white" />
    </div>
  );
};

export default Game;