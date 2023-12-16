import { ReactNode, useCallback, useEffect, useState } from 'react'
import { api } from '../lib/axios';
import { createContext } from 'use-context-selector';

type Transaction = {
  id: number;
  description: string;
  type: 'income' | 'outcome'
  price: number
  category: string
  createdAt: string
}

type CreateTransactionInput = {
  description: string
  price: number
  category: string
  type: 'income' | 'outcome'
}

type TransactionContextType = {
  transactions: Transaction[]
  fetchTransactions: (query?: string) => Promise<void>
  createTransaction: (data: CreateTransactionInput) => Promise<void>
}

export const TransactionContext = createContext({} as TransactionContextType)

type TransactionsProviderProps = {
  children: ReactNode
}


export function TransactionProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  const fetchTransactions = useCallback(async (query?: string) => {
    const { data } = await api.get('/transactions', {
      params: {
        _sort: 'createdAt',
        _order: 'desc',
        q: query
      }
    })

    setTransactions(data)
  }, [])

  const createTransaction = useCallback(async (data: CreateTransactionInput) => {
    const { description, price, category, type } = data
    const { data: result } = await api.post('transactions', { description, price, category, type, createdAt: new Date() })

    setTransactions(current => ([result, ...current]))
  }, []);

  useEffect(() => {
    fetchTransactions()
  }, [])
  return (
    <TransactionContext.Provider value={{ transactions, fetchTransactions, createTransaction }}>
      {children}
    </TransactionContext.Provider>
  )
}