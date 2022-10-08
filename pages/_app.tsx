import "../src/styles/globals.css";
import { AppProps } from "next/app";
import "@rainbow-me/rainbowkit/styles.css";
import {
  Wallet,
  connectorsForWallets,
  RainbowKitProvider,
  Chain,
} from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { MagicConnector } from "@everipedia/wagmi-magic-connector";

export const rainbowMagicConnector = (chains: Chain[]): Wallet => ({
  id: "magic",
  name: "Magic",
  iconUrl: "https://svgshare.com/i/iJK.svg",
  iconBackground: "#fff",
  // TODO: fix any
  createConnector: (): any => {
    if (!process.env.NEXT_PUBLIC_MAGIC_LINK_API_KEY?.length) {
      console.error(
        `Can't access required scope vars: process.env.NEXT_PUBLIC_MAGIC_LINK_API_KEY: ${process.env.NEXT_PUBLIC_MAGIC_LINK_API_KEY}`
      );
    }
    const connector = new MagicConnector({
      chains,
      options: {
        apiKey: process.env.NEXT_PUBLIC_MAGIC_LINK_API_KEY!,
        // customLogo: '/',
        // oauthOptions: {
        //   providers: ["google", "twitter", "discord"],
        // },
        // additionalMagicOptions: {
        // testMode: process.env.NODE_ENV === "development",
        // },
        //...Other options (check out full API below)
      },
    });
    return {
      connector,
    };
  },
});

const { chains, provider, webSocketProvider } = configureChains(
  [chain.polygon],
  [alchemyProvider({ apiKey: process.env.ALCHEMY_ID }), publicProvider()]
);

const connectors = connectorsForWallets([
  {
    groupName: "Recommended",
    wallets: [rainbowMagicConnector(chains)],
  },
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
