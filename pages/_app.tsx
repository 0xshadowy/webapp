import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { withTRPC } from '@trpc/next'
import type { AppRouter } from './api/trpc/[trpc]'

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default withTRPC<AppRouter>({
	config() {
		const url = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}/api/trpc`
      : 'http://localhost:3000/api/trpc';
		return { url }
	},
	ssr: true
})(App);

