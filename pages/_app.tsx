import "../src/styles/globals.css";
import { AppProps } from "next/app";
import "@rainbow-me/rainbowkit/styles.css";
import {
  connectorsForWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { MagicConnector } from "@everipedia/wagmi-magic-connector";
import { Wallet } from "@rainbow-me/rainbowkit/dist/wallets/Wallet";

export const rainbowMagicConnector = ({ chains }: any): Wallet => ({
  id: "magic",
  name: "Magic",
  iconUrl: "https://svgshare.com/i/iJK.svg",
  iconBackground: "#fff",
  // TODO: fix any
  createConnector: (): any => {
    const connector = new MagicConnector({
      chains: chains,
      options: {
        apiKey: "YOUR_MAGIC_API_KEY",
        //...Other options (check out full API below)
      },
    });
    return {
      connector,
    };
  },
});

const { chains, provider, webSocketProvider } = configureChains(
  [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum],
  [alchemyProvider({ apiKey: process.env.ALCHEMY_ID }), publicProvider()]
);

const connectors = connectorsForWallets([
  {
    groupName: "Recommended",
    wallets: [
      //... other wallets connectors
      rainbowMagicConnector({ chains }),
    ],
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
