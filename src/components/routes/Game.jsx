import { useStore } from '../../context/store';

const Game = () => {
  const { test } = useStore(globalState => globalState.test);
  console.log(test);
  return (
    <div>Game</div>
  );
};

export default Game;