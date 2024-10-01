import { Html, Head, Main, NextScript } from "next/document";
import { useAmp } from "next/amp"; // Import the AMP detection function

export default function Document(ctx) {
  const { pageProps } = ctx.__NEXT_DATA__.props || {};
  const isAmp = pageProps?.isAmp || false; // Determine if it's an AMP page

  console.log("AMP mode:", isAmp); // For debugging purposes

  return (
    <Html>
      <Head> </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
