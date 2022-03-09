import { providers } from 'ethers'
import { Network } from "@ethersproject/networks";
import { JsonRpcProvider, WebSocketProvider } from "@ethersproject/providers";

// Imports
import { Connector, chain, allChains } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { WalletLinkConnector } from 'wagmi/connectors/walletLink'

// Get environment variables
const ALCHEMY_ID = process.env.REACT_APP_ALCHEMY_ID as string
const ETHERSCAN_API_KEY = process.env.REACT_APP_ETHERSCAN_API_KEY as string
const INFURA_ID = process.env.REACT_APP_INFURA_ID as string
// Can't import ChainName, use keyof instead
export const DEFAULT_NETWORK = (process.env.REACT_APP_NETWORK || 'polygonMainnet') as keyof typeof chain

// Pick chains
const chains = allChains
const defaultChain = chain[DEFAULT_NETWORK]

type NetworkOverride = Network & {
  webSocketProvider: () => WebSocketProvider
}

const networkOverrides: Record<number, NetworkOverride> = {
  137: {
    name: 'matic',
    chainId: 137,
    _defaultProvider: (providers) => new JsonRpcProvider(`https://polygon-mainnet.g.alchemy.com/v2/${ALCHEMY_ID}`),
    webSocketProvider: () => new WebSocketProvider(`wss://polygon-mainnet.g.alchemy.com/v2/${ALCHEMY_ID}`, 137)
  }
}

// Set up connectors
export type ConnectorsConfig = { chainId?: number }

export const connectors = ({ chainId }: ConnectorsConfig) => {
  const rpcUrl =
    chains.find((x) => x.id === chainId)?.rpcUrls?.[0] ??
    defaultChain.rpcUrls[0]
  return [
    new InjectedConnector({ chains, options: { shimDisconnect: true } }),
    new WalletConnectConnector({
      chains,
      options: {
        infuraId: INFURA_ID,
        qrcode: true,
      },
    }),
    new WalletLinkConnector({
      chains,
      options: {
        appName: 'fem.sale',
        jsonRpcUrl: `${rpcUrl}/${INFURA_ID}`,
      },
    }),
  ]
}

// Set up providers
export type ProviderConfig = { chainId?: number; connector?: Connector }

export const isChainSupported = (chainId?: number) =>
  chains.some((x) => x.id === chainId)

// Set up providers
export const provider = ({ chainId }: ProviderConfig): providers.BaseProvider => {
  if (!chainId || !isChainSupported(chainId)) return provider({ chainId: defaultChain.id })
  const networkOverride = networkOverrides[chainId]
  if (networkOverride) return providers.getDefaultProvider(networkOverride)
  return providers.getDefaultProvider(
    chainId,
    {
      alchemy: ALCHEMY_ID,
      etherscan: ETHERSCAN_API_KEY,
      infura: INFURA_ID,
    },
  )
}

export const webSocketProvider = ({ chainId }: ConnectorsConfig): WebSocketProvider => {
  if (!chainId || !isChainSupported(chainId)) return webSocketProvider({ chainId: defaultChain.id })
  const networkOverride = networkOverrides[chainId]
  if (networkOverride) return networkOverride.webSocketProvider()
  return new providers.InfuraWebSocketProvider(chainId, INFURA_ID)
}