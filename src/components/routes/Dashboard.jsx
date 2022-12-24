import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../context/store';
import styles from '../../styles/routes/Dashboard.module.css';
import Alert from '../utils/Alert';

const Dashboard = () => {
  const { user } = useStore('user');
  const { alertMessage, clearAlert } = useStore('alertMessage');
  const navigate = useNavigate();

  useEffect(() => {
    if(!user.info) {
      navigate('/');
    }
  }, [user.info]);
  
  if (user.userPending) {
    return (
      <div className="container">
        <div className="loading">
          <div></div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className={styles.games}></div>
      <div className={styles.friends}>
        {JSON.stringify(user)}
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
  );
}

export default Dashboard;