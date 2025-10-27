import { Head, Font } from "@react-email/components";
import * as React from "react";

export const KulipalHead = () => {
  return (
    <Head>
      <Font
        fontFamily="DM Sans"
        fallbackFontFamily="Verdana"
        webFont={{
          url: "https://fonts.googleapis.com/css2?family=DM+Sans:opsz@9..40&display=swap",
          format: "woff2",
        }}
        fontWeight={400}
        fontStyle="normal"
      />
    </Head>
  );
};
