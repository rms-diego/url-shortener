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
  const [name, setName] = useState<string>('');

  function handleNameChange({ target }: ChangeEvent<HTMLInputElement>) {
    setName(target.value);
  }

  function handleEmailChange({ target }: ChangeEvent<HTMLInputElement>) {
    setEmail(target.value);
  }

  function handlePasswordChange({ target }: ChangeEvent<HTMLInputElement>) {
    setPassword(target.value);
  }

  function resetInputs() {
    setEmail('');
    setPassword('');
    setName('');
  }

  async function handleSubmitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (title === 'Cadastrar') {
      const response = await client
        .post<{ token: string; name: string }>('/auth/register', {
          email: email.trim(),
          password: password.trim(),
          name: name.trim(),
        })
        .catch(() => alert('Usuário já existe'));

      resetInputs();
      toggleOpen();

      localStorage.setItem('user', response?.data.name!);
      localStorage.setItem('token', response?.data.token!);
      return;
    }

    const response = await client
      .post<{ token: string; name: string }>('/auth/login', {
        email: email.trim(),
        password: password.trim(),
      })
      .catch((error) => {
        const { data } = error.response;

        if (data.error === 'invalid password') {
          return alert('senha inválida');
        }

        return alert('usuário não existe');
      });

    resetInputs();
    toggleOpen();
    localStorage.setItem('token', response?.data.token!);
    localStorage.setItem('user', response?.data.name!);
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
          </form>
        </div>
      )}
    </>
  );
}
