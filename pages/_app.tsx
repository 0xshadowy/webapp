import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { WagmiConfig, configureChains, createClient, chain } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { withTRPC } from '@trpc/next';
import type { AppRouter } from '@/server/routers/_app';
import { Web3ContextProvider } from '@/contexts/web3-context';
import Layout from '@/components/layout';

const alchemyKey = process.env.ALCHEMY_KEY;

const { provider } = configureChains([chain.goerli], [alchemyProvider({ alchemyId: alchemyKey })]);

const client = createClient({
  autoConnect: true,
  provider,
});

function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={client}>
      <Web3ContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Web3ContextProvider>
    </WagmiConfig>
  );
}

export default withTRPC<AppRouter>({
  config() {
    const url = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}/api/trpc`
      : 'http://localhost:3000/api/trpc';
    return { url };
  },
  ssr: true,
})(App);
