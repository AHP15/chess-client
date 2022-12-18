import styles from '../../styles/utils/Alert.module.css';
import close from '../../assets/close.png'

const Alert = ({type, message, clear}) => {
  return (
    <div className={styles[type]}>
      <p>{message}</p>
      <div onClick={clear} className={styles.close}>
        <div>
        <img src={close} alt="close icon" />
        </div>
      </div>
    </div>
  );
};

export default Alert;