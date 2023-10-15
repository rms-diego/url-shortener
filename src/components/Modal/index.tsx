import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { client } from '@/utils/client';

type Props = {
  isOpen: boolean;
  toggleOpen(): void;
  title: 'Login' | 'Cadastrar';
};

export function Modal({ isOpen, toggleOpen, title }: Props) {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  function handleEmailChange({ target }: ChangeEvent<HTMLInputElement>) {
    setEmail(target.value);
  }

  function handlePasswordChange({ target }: ChangeEvent<HTMLInputElement>) {
    setPassword(target.value);
  }

  async function handleSubmitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (title === 'Cadastrar') {
      const response = await client
        .post('/auth/register', { email, password })
        .catch(() => alert('Usuário já existe'));

      setEmail('');
      setPassword('');
      toggleOpen();
      // localStorage.setItem('', r)
      return;
    }

    const data = await client
      .post('/auth/login', { email, password })
      .catch((error) => {
        const { data } = error.response;

        if (data.error === 'invalid password') {
          return alert('senha inválida');
        }

        return alert('usuário não existe');
      });

    console.log(data);
    setEmail('');
    setPassword('');
    toggleOpen();

    return;
  }

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

            <label htmlFor="">
              Email
              <input
                type="email"
                placeholder="Adicione seu link aqui"
                onChange={handleEmailChange}
                value={email}
                required
              />
            </label>

            <label htmlFor="">
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
          </form>
        </div>
      )}
    </>
  );
}
