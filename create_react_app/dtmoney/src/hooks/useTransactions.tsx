import { createContext, ReactNode, useContext, useEffect, useState, useCallback } from 'react';
import { api } from '../services/api';



interface Transaction { 
  id: string;
  title: string;
  type: 'deposit' | 'withdraw';
  category: string;
  amount: number;
  createdAt: string;
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>;

interface TransactionsProviderProps {
  children: ReactNode;
}

interface TransactionContextData {
  transactions: Transaction[];
  createTransaction: (data: TransactionInput) => Promise<void>;
}


const TransactionsContext = createContext<TransactionContextData>({} as TransactionContextData);

export const TransactionsProvider: React.FC<TransactionsProviderProps> = ({ children  }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {

    const loadData = async () => {
      const { data } = await api.get('transactions');
      setTransactions(data.transactions);
    }

    loadData();

  }, []);

  const createTransaction = useCallback(async (transaction: TransactionInput) => {
    const { data } = await api.post('/transactions', {...transaction, createdAt: new Date()});

    setTransactions((oldValue) => [data.transaction, ...oldValue]);
  }, []);
  
  return (
    <TransactionsContext.Provider value={{transactions, createTransaction}}>
      {children}
    </TransactionsContext.Provider>
  );
};

export const useTransition = (): TransactionContextData => {
  const context = useContext(TransactionsContext);
  if (!context) {
    throw new Error('useTransition must be used within a TransactionsProvider');
  }
  return context;
};