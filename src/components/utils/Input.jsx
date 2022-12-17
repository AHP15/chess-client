import styles from '../../styles/utils/Input.module.css';

const Input = ({label, attrs}) => {
  return (
    <div className={styles.input}>
      <label>{label}</label>
      <input {...attrs} />
    </div>
  )
};

export default Input;