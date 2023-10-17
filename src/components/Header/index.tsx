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
    isLogged,
    setIsLogged,
  } = useModal();

  function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLogged(false);
  }

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
                Bem vindo <span>{localStorage.getItem('user')}</span>
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
