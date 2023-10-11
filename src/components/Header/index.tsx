import Image from 'next/image';
import styles from './styles.module.scss';

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <h1>Linkly</h1>

      <section className={styles.buttonContainer}>
        <button className={styles.loginButton}>
          Login
          <Image
            src="/assets/signIn-arrow.svg"
            height={15}
            width={15}
            alt="arrow"
          />
        </button>

        <button className={styles.registerButton}>Register Now</button>
      </section>
    </header>
  );
}
