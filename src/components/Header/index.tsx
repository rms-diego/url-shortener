'use client';
import Image from 'next/image';
import styles from './styles.module.scss';
import { Modal } from '../Modal';
import { useControlModal } from '@/hook/useControlModal';

export function Header() {
  const {
    openLoginModal,
    openRegisterModal,
    isLogged,
    toggleOpenLoginModal,
    toggleOpenRegister,
    handleLogout,
    userName,
  } = useControlModal();

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
        title="Cadastrar"
      />
      <header className={styles.headerContainer}>
        <h1>Linkly</h1>

        <section className={styles.buttonContainer}>
          {isLogged ? (
            <>
              <h2 className={styles.welcomeMessage}>
                Bem vindo <span>{userName}</span>
              </h2>
              <button className={styles.logoutButton} onClick={handleLogout}>
                Sair da conta
              </button>
            </>
          ) : (
            <>
              <button
                className={styles.loginButton}
                onClick={toggleOpenLoginModal}
              >
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
                Cadastrar
              </button>
            </>
          )}
        </section>
      </header>
    </>
  );
}
