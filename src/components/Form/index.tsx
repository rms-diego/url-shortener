import styles from './styles.module.scss';

export function Form() {
  return (
    <form className={styles.formContainer}>
      <input type="text" placeholder="Adicione seu link aqui" />
      <button>Encurtar</button>
    </form>
  );
}
