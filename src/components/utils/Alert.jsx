import { useNavigate } from 'react-router-dom';

import styles from '../../styles/utils/Alert.module.css';
import close from '../../assets/close.png'
import { useStore } from '../../context/store';

const Alert = ({type, message, clear}) => {
  const { socket } = useStore('socket');
  const { challenge } = useStore('challenge');
  const navigate = useNavigate();

  const acceptChallenge = () => {
    socket.emit('accept-challenge', challenge);
    navigate('/game');
  }

  return (
    <div className={styles[type]}>
      <p>{message}</p>
      {type === 'challenge' && <button className='btn' onClick={acceptChallenge}>Accept</button>}
      <div onClick={clear} className={styles.close}>
        <div>
        <img src={close} alt="close icon" />
        </div>
      </div>
    </div>
  );
};

export default Alert;