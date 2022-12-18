import styles from '../../styles/utils/Input.module.css';

const Input = ({label, attrs, invalid}) => {
  return (
    <div className={styles[invalid ? 'invalid_input' : 'input']}>
      <label>{label}</label>
      <input {...attrs} />
      {invalid ? <p className={styles.invalid}>{invalid}</p> : null}
    </div>
  )
};

export default Input;