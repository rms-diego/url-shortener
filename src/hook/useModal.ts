import { client } from '@/utils/client';
import { ChangeEvent, FormEvent, useState } from 'react';

type Type = {
  toggleOpen: () => void;
  title: string;
};

export function useModal({ toggleOpen, title }: Type) {
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

  async function handleRegister() {
    try {
      const response = await client.post<{ token: string; name: string }>(
        '/auth/register',
        {
          email: email.trim(),
          password: password.trim(),
          name: name.trim(),
        }
      );

      localStorage.setItem('user', response?.data.name!);
      localStorage.setItem('token', response?.data.token!);
    } catch (error) {
      alert('Usuário já existe');
    }

    resetInputs();
    toggleOpen();
  }

  async function handleSubmitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (title === 'Cadastrar') return handleRegister();

    try {
      const response = await client.post<{ token: string; name: string }>(
        '/auth/login',
        {
          email: email.trim(),
          password: password.trim(),
        }
      );

      localStorage.setItem('token', response?.data.token!);
      localStorage.setItem('user', response?.data.name!);
    } catch (error) {
      const { data } = error.response!;

      resetInputs();
      toggleOpen();

      if (data.error === 'invalid password') {
        return alert('senha inválida');
      }

      return alert('usuário não existe');
    }

    resetInputs();
    toggleOpen();
    return;
  }

  return {
    handleNameChange,
    handleEmailChange,
    handlePasswordChange,
    handleSubmitForm,
    email,
    name,
    password,
  };
}
