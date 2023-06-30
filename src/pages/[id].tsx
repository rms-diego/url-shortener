import { client } from "@/services/apiClient";
import { useRouter } from "next/router";
import { useEffect } from "react";

import styles from "@/styles/pages/home/styles.module.scss";

export default function RedirectPage() {
  const { asPath: urlId } = useRouter();

  useEffect(() => {
    const getUrlById = async () => {
      const { data } = await client.get(`/url${urlId}`);

      const includesHttp = data.baseUrl.includes(["https://", "http://"]);

      if (!includesHttp) {
        return (window.location.href = `https://${data.baseUrl}`);
      }

      return (window.location.href = data.baseUrl);
    };

    getUrlById();
  }, [urlId]);

  return <main className={styles.mainContainer} />;
}
