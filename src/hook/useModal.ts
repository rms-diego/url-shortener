import { useState } from 'react';

export function useModal() {
  const [openLoginModal, setOpenLoginModal] = useState<boolean>(false);
  const [openRegisterModal, setOpenRegisterModal] = useState<boolean>(false);

  function toggleOpenLoginModal() {
    setOpenLoginModal((prevState) => !prevState);
  }

  function toggleOpenRegister() {
    setOpenRegisterModal((prevState) => !prevState);
  }

  return {
    openLoginModal,
    toggleOpenLoginModal,
    openRegisterModal,
    toggleOpenRegister,
  };
}
