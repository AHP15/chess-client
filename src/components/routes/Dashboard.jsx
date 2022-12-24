import { useStore } from '../../context/store';
import styles from '../../styles/routes/Dashboard.module.css';

const Dashboard = () => {
  const { user } = useStore('user');
  return (
    <div>
      <div className={styles.games}></div>
      <div className={styles.friends}>
        {JSON.stringify(user)}
      </div>
    </div>
  );
}

export default Dashboard;