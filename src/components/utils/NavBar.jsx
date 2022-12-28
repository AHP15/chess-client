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

  const handleModel = () => {
    set({
      formModel: {
        show: true,
        of: 'game',
      }
    });
  }

  return (
    <nav className={styles.navbar}>
      <Link to="/dashboard">
        <Logo />
      </Link>


      <ul className={styles.options}>
        <li>
          <Link to="/profile" className="btn">
          Profile
          </Link>
        </li>
        <li>
          <button className="btn" onClick={handleModel}>New Game</button>
        </li>
        <li>
          <button className="btn" onClick={handleClick}>
            {loading ? 'Signing Out...' : 'SignOut'}
          </button>
        </li>
      </ul>
    </nav>
  );
};
export default NavBar;