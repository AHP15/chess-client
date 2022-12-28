import styles from '../../styles/utils/FriendCard.module.css';

import remove from '../../assets/remove.png';

import { removeFriend } from '../../api/user';
import { useStore } from '../../context/store';
import { useState } from 'react';

const FriendCard = ({ friend }) => {
  const [loading, setLoading] = useState(false);

  const { user } = useStore('user');
  const { correctToken, set } = useStore('correctToken');

  const handleRemove = () => {
    setLoading(true);
    const token = correctToken.callback(localStorage.getItem('token'));
    removeFriend(token, friend._id).then((res) => {
      if(res.success) {
        set({
          user: {
            info: {
              ...user.info,
              friends: user.info.friends.filter(ele => ele._id !== friend._id)
            },
            userPending: false,
          }
        });
      } else {
        set({
          alertMessage: {
            type: 'error',
            message: res.error,
          }
        })
      }
      setLoading(false);
    });
  };

  return (
    <div className={styles[loading? 'removing_friend' : 'friend']}>
      <p>{friend.email}</p>
      
      <div className={styles.friend_actions}>
        <button className="btn" disabled={friend.status === 'offline'}>
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