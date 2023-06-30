import { client } from "@/services/apiClient";
import { useRouter } from "next/router";
import { useEffect } from "react";

import styles from "@/styles/pages/home/styles.module.scss";
import { urlCreatedSchema } from "@/services/apiServices/url/saveUrl";

export default function RedirectPage() {
  const { asPath: urlId } = useRouter();

  useEffect(() => {
    const getUrlById = async () => {
      const { data } = await client.get(`/url${urlId}`);

      const formatData = urlCreatedSchema.parse(data);

      const includesHttps = formatData.baseUrl.includes("https://");
      const includesHttp = formatData.baseUrl.includes("http://");

      if (!includesHttp || !includesHttps) {
        return (window.location.href = `https://${data.baseUrl}`);
      }

      return (window.location.href = data.baseUrl);
    };

    getUrlById();
  }, [urlId]);

  return <main className={styles.mainContainer} />;
}
