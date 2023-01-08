import { useStore } from '../../context/store';
import useRestrictedEffect from '../../hooks/useRestrictedEffect';
import useSocket from '../../hooks/useSocket';

import Board from '../game/Board';
import NavBar from '../utils/NavBar';
import Pending from '../utils/Pending';

import loading from '../../assets/loading.gif';
import styles from '../../styles/routes/Game.module.css';

const Game = () => {
  useRestrictedEffect();
  const socket = useSocket();
  const { user } = useStore('user');
  const { challenge } = useStore('challenge');

  if (user.userPending || !user.info) {
    return <Pending />;
  }

  if (challenge.by) {
    return (
      <div className={styles.wait}>
        <img src={loading} alt="waiting for challenge to be accepted" />
        <p>Waiting for challenge to be accepted</p>
      </div>
    );
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