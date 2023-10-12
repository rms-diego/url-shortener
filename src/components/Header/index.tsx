'use client';
import Image from 'next/image';
import styles from './styles.module.scss';
import { Modal } from '../Modal';
import { useModal } from '@/hook/useModal';

export function Header() {
  const {
    openLoginModal,
    openRegisterModal,
    toggleOpenLoginModal,
    toggleOpenRegister,
  } = useModal();

  return (
    <>
      <Modal
        isOpen={openLoginModal}
        toggleOpen={toggleOpenLoginModal}
        title="Login"
      />

      <Modal
        isOpen={openRegisterModal}
        toggleOpen={toggleOpenRegister}
        title="Register"
      />

      <header className={styles.headerContainer}>
        <h1>Linkly</h1>

        <section className={styles.buttonContainer}>
          <button className={styles.loginButton} onClick={toggleOpenLoginModal}>
            Login
            <Image
              src="/assets/signIn-arrow.svg"
              height={15}
              width={15}
              alt="arrow"
            />
          </button>

          <button
            className={styles.registerButton}
            onClick={toggleOpenRegister}
          >
            Register Now
          </button>
        </section>
      </header>
    </>
  );
}
