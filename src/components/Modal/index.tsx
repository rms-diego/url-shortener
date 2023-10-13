import styles from './styles.module.scss';

type Props = {
  isOpen: boolean;
  toggleOpen(): void;
  title: string;
};

export function Modal({ isOpen, toggleOpen, title }: Props) {
  return (
    <>
      {isOpen && (
        <div className={styles.backgroundModal}>
          <form className={styles.formContainer}>
            <section className={styles.headerFormContainer}>
              <h2>{title}</h2>
              <button
                type="button"
                onClick={toggleOpen}
                className={styles.exitButton}
              >
                X
              </button>
            </section>

            <label htmlFor="">
              Email
              <input type="email" placeholder="Adicione seu link aqui" />
            </label>

            <label htmlFor="">
              Password
              <input type="password" placeholder="Adicione seu link aqui" />
            </label>

            <button type="button">{title}</button>
          </form>
        </div>
      )}
    </>
  );
}
