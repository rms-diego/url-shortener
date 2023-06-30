import styles from "./styles.module.scss";

import { UrlCreatedType } from "@/services/apiServices/url/saveUrl";
import Link from "next/link";

import { FaWindowClose } from "react-icons/fa";

interface ModalProps {
  urlCreated: UrlCreatedType;
  toggleOpenAndCloseModal: () => void;
}

export function Modal({ urlCreated, toggleOpenAndCloseModal }: ModalProps) {
  const domain = window.location.href;

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalContentContainer}>
        <FaWindowClose size={25} onClick={() => toggleOpenAndCloseModal()} />

        <div className={styles.content}>
          <h2>Url encurtada: {`${domain}${urlCreated.id}`}</h2>

          <Link
            href={`http://${urlCreated.baseUrl}`}
            className={styles.redirectButtonContainer}
            target="_blank"
          >
            <button>Ir para o link </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
