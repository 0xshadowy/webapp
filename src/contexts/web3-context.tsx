import { createContext, useContext } from 'react';
import { useAccount } from 'wagmi';

type Context = {
  address: string | undefined;
};

const Web3Context = createContext<Context>({
  address: '',
});

export const Web3ContextProvider = (props: { children: React.ReactNode }) => {
  const { address } = useAccount();
  return <Web3Context.Provider value={{ address }}>{props.children}</Web3Context.Provider>;
};

export const useWeb3Context = () => useContext<Context>(Web3Context);
