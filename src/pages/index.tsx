import { ChangeEvent, FormEvent, useState } from "react";
import { Input } from "@/components/Input";

import styles from "@/styles/pages/home/styles.module.scss";
import { UrlCreatedType, saveUrl } from "@/services/apiServices/url/saveUrl";
import { Modal } from "@/components/Modal";

export default function Home() {
  const [url, setUrl] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [urlCreated, setUrlCreated] = useState<UrlCreatedType>();

  const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    return setUrl(target.value);
  };

  const handleSubmitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = await saveUrl(url);

    setUrl("");
    setUrlCreated(data);
    return setShowModal(true);
  };

  const toggleOpenAndCloseModal = () => {
    return setShowModal(false);
  };

  return (
    <>
      {showModal ? (
        <Modal
          urlCreated={urlCreated!}
          toggleOpenAndCloseModal={toggleOpenAndCloseModal}
        />
      ) : (
        <></>
      )}

      <main className={styles.mainContainer}>
        <div className={styles.content}>
          <h1>Encurtador de url</h1>

          <form onSubmit={handleSubmitForm}>
            <Input
              inputLabel="Digite uma url"
              inputPlaceholder="youtube.com"
              handleInputChange={handleInputChange}
              urlValue={url}
            />
            <button className={styles.buttonSubmit} type="submit">
              Encurtar
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
