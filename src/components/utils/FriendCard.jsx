import styles from '../../styles/utils/FriendCard.module.css';

import remove from '../../assets/remove.png';

import { useStore } from '../../context/store';
import { useState } from 'react';
import { removeFriend } from '../../context/storeSetters';

const FriendCard = ({ friend }) => {
  const [loading, setLoading] = useState(false);

  const { user, set } = useStore('user');


  const handleRemove = () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    removeFriend(friend._id, token, set, user).then(() => setLoading(false));
  };

  const handleClick = () => {
    set({
      friendChellenged: friend.email,
      formModel: {
        show: true,
        of: 'game',
      }
    });
  };

  return (
    <div className={styles[loading? 'removing_friend' : 'friend']}>
      <p>{friend.email}</p>
      
      <div className={styles.friend_actions}>
        <button onClick={handleClick} className="btn" disabled={friend.status === 'offline'}>
          Challenge
        </button>
      <p
        title={friend.status}
        className={styles[friend.status === 'online' ? 'online' : 'offline']}
      ></p>

      <button className={styles.remove} onClick={handleRemove}>
        <img src={remove} alt="delete friend" />
      </button>
      </div>
    </div>
  );
};
export default FriendCard;