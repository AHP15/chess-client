import { Link } from "react-router-dom";
import { useState } from "react";

import styles from '../../styles/utils/NavBar.module.css';

import Logo from "./Logo";
import { useStore } from "../../context/store";
import { signOut } from "../../api/user";


const NavBar = () => {

  const [loading, setLoading] = useState(false);
  const { correctToken, set } = useStore('correctToken');

  const handleClick = async () => {
    setLoading(true);
    const { callback } = correctToken;
    const token = callback(localStorage.getItem('token'));

    signOut(token).then(res => {
      if (!res.success) {
        set({
          alertMessage: {
            type: 'error',
            message: res.error,
          }
        });
        return;
      };

      localStorage.removeItem('token');
      set({
        user: {
          info: null,
          userPending: false,
        }
      });
      setLoading(false);
    });
  };

  return (
    <nav className={styles.navbar}>
      <Link to="/dashboard">
        <Logo />
      </Link>

      <Link to="/profile">
        Profile
      </Link>
      <button onClick={handleClick}>{loading ? 'Signing Out...' : 'SignOut'}</button>
    </nav>
  );
};
export default NavBar;