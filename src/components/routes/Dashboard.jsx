import { useStore } from '../../context/store';
import styles from '../../styles/routes/Dashboard.module.css';
import Alert from '../utils/Alert';
import NavBar from '../utils/NavBar';
import Pending from '../utils/Pending';
import useRestrictedEffect from '../../hooks/useRestrictedEffect';
import Model from '../utils/Model';
import FriendCard from '../utils/FriendCard';

const Dashboard = () => {

  useRestrictedEffect();
  const { user, set } = useStore('user');
  const { alertMessage, clearAlert } = useStore('alertMessage');
  const { formModel } = useStore('formModel');

  const handleModel = (of) => {
    set({
      formModel: {
        show: true,
        of,
      }
    });
  };

  if (user.userPending || !user.info) {
    return <Pending />;
  }
  const { games, friends } = user.info;
  return (
    <>
      <NavBar />
      <div className={styles.dashboard}>

        <div className={styles.games}>
          <div className={styles.head}>
            <h2>{games.length > 0 ? 'Your Games' : 'No Games'}</h2>
            <button className="btn" onClick={() =>handleModel('game')}>New Game</button>
          </div>
        </div>

        <div className={styles.friends}>
          <div className={styles.head}>
            <h2>{friends.length > 0 ? 'Your Friends' : 'No Friends'}</h2>
            <button className="btn" onClick={() =>handleModel('friend')}>New Friend</button>
          </div>

          {
            friends.map((friend) => (
              <FriendCard key={friend + Math.random()} friend={friend} />
            ))
          }
        </div>

        {formModel.show && <Model of={formModel.of} />}
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