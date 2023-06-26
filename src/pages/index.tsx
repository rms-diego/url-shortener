import { ChangeEvent, useState } from "react";
import { Input } from "@/components/Input";
import styles from "@/styles/pages/home/styles.module.scss";

export default function Home() {
  const [url, setUrl] = useState<string>("");

  const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    return setUrl(target.value);
  };

  return (
    <main className={styles.mainContainer}>
      <div className={styles.content}>
        <h1>Encurtador de url</h1>

        <form>
          <Input
            inputLabel="Digite uma url"
            inputPlaceholder="youtube.com"
            handleInputChange={handleInputChange}
            urlValue={url}
          />
          <button className={styles.buttonSubmit}>Encurtar</button>
        </form>
      </div>
    </main>
  );
}
