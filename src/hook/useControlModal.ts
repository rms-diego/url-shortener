import { useEffect, useState } from 'react';

export function useControlModal() {
  const [openLoginModal, setOpenLoginModal] = useState<boolean>(false);
  const [openRegisterModal, setOpenRegisterModal] = useState<boolean>(false);
  const [isLogged, setIsLogged] = useState<boolean>(false);

  function toggleOpenLoginModal() {
    setOpenLoginModal((prevState) => !prevState);
  }

  function toggleOpenRegister() {
    setOpenRegisterModal((prevState) => !prevState);
  }

  // verifica se quando o componente monta o usuário está logado
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      setIsLogged(true);
    }
  }, []);

  // verifica se quando o usuário abriu o modal se cadastrou o fez o login
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      setIsLogged(true);
    }
  }, [openLoginModal, openRegisterModal]);

  return {
    openLoginModal,
    toggleOpenLoginModal,
    openRegisterModal,
    toggleOpenRegister,
    isLogged,
    setIsLogged,
  };
}
