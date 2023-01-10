import isEmail from 'validator/lib/isEmail';

import { useStore } from '../../context/store';
import styles from '../../styles/utils/Model.module.css';
import FormLayout from './FormLayout';
import Input from './Input';

import { useState } from 'react';
import Pending from './Pending';
import { useNavigate } from 'react-router-dom';
import { addFriend } from '../../context/storeSetters';
import GameInfo from './GameInfo';
import useSocket from '../../hooks/useSocket';

const Model = ({ of }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [invalid, setInvalid] = useState(null);

  const { user, set } = useStore('user');
  const { challenge } = useStore('challenge');
  const socket = useSocket();

  const navigate = useNavigate();

  const handleClose = () => set({
    formModel: {
      show: false,
      of: null,
    }
  });

  const handleChange = (e) => {
    setEmail(e.target.value);
    setInvalid(null);
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !isEmail(email)) {
      setInvalid("Invalid email");
      return;
    }
    setLoading(true);

    if (of === 'game') {
      const challengeInfo = {
        by: {
          email: user.info.email,
          playAs: challenge.by.playAs,
        },
        to: {
          email: email,
          playAs: challenge.to.playAs,
        },
        accepted: false,
        time: challenge.time,
      };
      set({
        challenge: challengeInfo
      });
      socket.emit('challenge-sent', challengeInfo);
      localStorage.setItem('challenge', JSON.stringify(challengeInfo));
      return navigate('/game');
    }
    const token = localStorage.getItem('token');
    addFriend(email, token, set, user).then(() => {
      setLoading(false);
      setEmail('');
    });
  };

  if(loading) {
    return (
      <div className={styles.model}>
        <Pending />
      </div>
    );
  }
  return (
    <div className={styles.model}>
      <FormLayout>
        <div onClick={handleClose} className={styles.close}>
          <div className={styles.bar}></div>
        </div>
        <h3>New {of}</h3>
        <Input
          label="email"
          invalid={invalid ? invalid : null}
          attrs={{
            type: 'email',
            placeholder: 'User email',
            name: 'email',
            value: email,
            onChange: handleChange,
          }}
        />
        {of === 'game' && email && <GameInfo />}
        <Input
          label={null}
          attrs={{
            type: 'submit',
            name: 'submit',
            value: 'submit',
            onClick: handleSubmit
          }}
        />
      </FormLayout>
    </div>
  );
}

export default Model;