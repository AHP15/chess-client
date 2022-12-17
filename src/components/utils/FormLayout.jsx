import styles from '../../styles/utils/FormLayout.module.css';

const FormLayout = ({children}) => {
  return (
    <form className={styles.form}>
      {children}
    </form>
  );
};

export default FormLayout;