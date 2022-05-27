import { ReactNode } from "react";
import { TransactionsProvider } from "./useTransactions";

interface AppProviderProps {
  children: ReactNode;
}

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (<TransactionsProvider>
    {children}
  </TransactionsProvider>);
}

export default AppProvider;