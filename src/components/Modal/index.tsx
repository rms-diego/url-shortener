import Image from 'next/image';
import styles from './styles.module.scss';
import { useModal } from '@/hook/useModal';
import { supabase } from '@/utils/supabase';

type Props = {
  isOpen: boolean;
  toggleOpen(): void;
  title: 'Login' | 'Cadastrar';
};

export function Modal({ isOpen, toggleOpen, title }: Props) {
  const {
    handleEmailChange,
    handleNameChange,
    handlePasswordChange,
    handleSubmitForm,
    email,
    name,
    password,
  } = useModal({ toggleOpen, title });

  async function handleSignIn() {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
    });

    toggleOpen();
  }

  const buttonText =
    title === 'Cadastrar' ? 'Cadastrar com o github' : 'Login com o github';

  return (
    <>
      {isOpen && (
        <div className={styles.backgroundModal}>
          <form className={styles.formContainer} onSubmit={handleSubmitForm}>
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

            {title === 'Cadastrar' && (
              <label>
                Nome
                <input
                  type="text"
                  placeholder="Adicione seu link aqui"
                  onChange={handleNameChange}
                  value={name}
                  required
                  minLength={3}
                />
              </label>
            )}

            <label>
              Email
              <input
                type="email"
                placeholder="Adicione seu link aqui"
                onChange={handleEmailChange}
                value={email}
                required
              />
            </label>

            <label>
              Senha
              <input
                type="password"
                placeholder="Adicione seu link aqui"
                onChange={handlePasswordChange}
                value={password}
                minLength={8}
                required
              />
            </label>

            <button type="submit">{title}</button>
            <button className={styles.githubButton} onClick={handleSignIn}>
              {buttonText}
              <Image src="/assets/github.svg" alt="" width={20} height={20} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
