import { Layout } from "@/components/Layout";
import type { AppProps } from "next/app";
import "@/styles/globals.css";
import { SSRProvider, I18nProvider } from "react-aria";
import { useRouter } from "next/router";
import { StoreProvider } from "@/store/StoreProvider";

export default function App({ Component, pageProps }: AppProps) {
  const { locale } = useRouter();
  return (
    <SSRProvider>
      <I18nProvider locale={locale}>
        <StoreProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </StoreProvider>
      </I18nProvider>
    </SSRProvider>
  );
}
