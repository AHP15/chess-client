import { useStore } from '../../context/store';
import useRestrictedEffect from '../../hooks/useRestrictedEffect';

import Board from '../game/Board';
import NavBar from '../utils/NavBar';
import Pending from '../utils/Pending';

import loading from '../../assets/loading.gif';
import styles from '../../styles/routes/Game.module.css';
import { useEffect } from 'react';
import useSocket from '../../hooks/useSocket';

const Game = () => {
  useRestrictedEffect();
  const { user } = useStore('user');
  const { challenge } = useStore('challenge');
  const { gameInfo } = useStore('gameInfo');
  const socket = useSocket();

  useEffect(() => {
    if(challenge && socket && challenge.by.email === user.info.email) {
      socket.emit('challenge-sent', challenge);
    }
  }, [challenge]);

  if (user.userPending || !user.info) {
    return <Pending />;
  }

  if (challenge.by.email) {
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
      <div className={styles.game}>
        Game
        <Board player={gameInfo.player} />
      </div>
    </>
  );
};

export default Game;