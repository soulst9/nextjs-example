import { AuthProvider } from "../contexts/AuthContext";
import { EnterpriseProvider } from "../contexts/EnterpriseContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { useState } from "react";
import Layout from "../components/Layout";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());

  // 페이지별 레이아웃을 사용하거나, 기본 Layout을 사용
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <EnterpriseProvider>
          {getLayout(<Component {...pageProps} />)}
        </EnterpriseProvider>
      </AuthProvider>
      {process.env.APP_ENV === "local" && <ReactQueryDevtools />}
    </QueryClientProvider>
  );
}

export default MyApp;
