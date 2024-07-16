import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";

import type { AppProps } from "next/app";
import { createTheme, MantineProvider } from "@mantine/core";
import { Inter } from "next/font/google";

export const inter = Inter({ subsets: ["latin"] });

const theme = createTheme({
  fontFamily: `${inter.style.fontFamily}, sans-serif`,
  headings: { fontFamily: `${inter.style.fontFamily}, sans-serif` },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider theme={theme}>
      <Component {...pageProps} />
    </MantineProvider>
  );
}
