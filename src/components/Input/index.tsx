import { ChangeEvent } from "react";
import styles from "./styles.module.scss";

type InputProps = {
  inputLabel: string;
  inputPlaceholder: string;
  handleInputChange: ({ target }: ChangeEvent<HTMLInputElement>) => void;
  urlValue: string;
};

export function Input({
  inputLabel,
  inputPlaceholder,
  handleInputChange,
  urlValue,
}: InputProps) {
  return (
    <label className={styles.labelContainer}>
      {inputLabel}
      <input
        type="text"
        placeholder={inputPlaceholder}
        onChange={handleInputChange}
        value={urlValue}
      />
    </label>
  );
}
