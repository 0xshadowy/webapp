import { createContext, useContext } from 'react';
import { useAccount } from 'wagmi';

type Context = {
  address: string | undefined;
  isConnected: boolean;
};

const Web3Context = createContext<Context>({
  address: '',
  isConnected: false,
});

export const Web3ContextProvider = (props: { children: React.ReactNode }) => {
  const { address, isConnected } = useAccount();
  return (
    <Web3Context.Provider value={{ address, isConnected }}>{props.children}</Web3Context.Provider>
  );
};

export const useWeb3Context = () => useContext<Context>(Web3Context);
