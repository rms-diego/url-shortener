import { supabase } from '@/utils/supabase';
import { useEffect, useState } from 'react';

export function useControlModal() {
  const [openLoginModal, setOpenLoginModal] = useState<boolean>(false);
  const [openRegisterModal, setOpenRegisterModal] = useState<boolean>(false);
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>('');

  // verifica se quando o componente monta o usuário está logado
  useEffect(() => {
    const handleLogin = async () => {
      await isLoggedByGithub();

      const token = localStorage.getItem('token');

      if (token) {
        const name = localStorage.getItem('user');
        setIsLogged(true);
        setUserName(name!);
      }
    };

    handleLogin();
  }, []);

  // verifica se quando o usuário abriu o modal se cadastrou o fez o login
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      const name = localStorage.getItem('user');
      setIsLogged(true);
      setUserName(name!);
    }
  }, [openLoginModal, openRegisterModal]);

  function toggleOpenLoginModal() {
    setOpenLoginModal((prevState) => !prevState);
  }

  function toggleOpenRegister() {
    setOpenRegisterModal((prevState) => !prevState);
  }

  async function isLoggedByGithub() {
    const { data } = await supabase.auth.getUser();

    if (!data.user) return;

    localStorage.setItem('user', data.user.user_metadata.name);

    setUserName(data.user.user_metadata.name);
    setIsLogged(true);
  }

  async function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLogged(false);
    await supabase.auth.signOut();
  }
  return {
    openLoginModal,
    toggleOpenLoginModal,
    openRegisterModal,
    toggleOpenRegister,
    isLogged,
    setIsLogged,
    userName,
    handleLogout,
  };
}
