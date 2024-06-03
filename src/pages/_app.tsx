import type { AppProps } from "next/app";
import { useReducer } from "react";
import { StoreContext, StoreProvider, storeReducer } from "../store";
import "../styles/tailwind.css";

export default function MyApp({ Component, pageProps }: AppProps) {
	return (
		<StoreProvider>
			<Component {...pageProps} />
		</StoreProvider>
	);
}
