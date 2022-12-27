import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../context/store';
import styles from '../../styles/routes/Dashboard.module.css';
import Alert from '../utils/Alert';
import NavBar from '../utils/NavBar';

const Dashboard = () => {
  const { user } = useStore('user');
  const { alertMessage, clearAlert } = useStore('alertMessage');
  const navigate = useNavigate();

  useEffect(() => {
    if(!user.info) {
      navigate('/');
    }
  }, [user.info]);
  
  if (user.userPending || !user.info) {
    return (
      <div className="container">
        <div className="loading">
          <div></div>
        </div>
      </div>
    );
  }
  const { games, friends } = user.info;
  return (
    <>
      <NavBar />
      <div className={styles.dashboard}>
        <div className={styles.games}>
          <h2>{games.length > 0 ? 'Your Games' : 'No Games'}</h2>
        </div>
        <div className={styles.friends}>
          <h2>{friends.length > 0 ? 'Your Friends' : 'No Friends'}</h2>
        </div>
        {
          alertMessage.type
            ? <Alert
              type={alertMessage.type}
              message={alertMessage.message}
              clear={clearAlert}
            />
            : null
        }
      </div>
    </>
  );
}

export default Dashboard;