import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { Transactions } from "../models/Transactions";
import { api } from "../services/api";

interface TransactionsProviderProps {
  children: ReactNode;
}

type TransactionSchema = Omit<Transactions, "id" | "createdAt">;

interface TransactionContext {
  transactions: Transactions[];
  createTransaction(transactionData: TransactionSchema): Promise<void>;
}

const TransactionsContext = createContext<TransactionContext>(
  {} as TransactionContext
);

export const TransactionsProvider = ({
  children,
}: TransactionsProviderProps) => {
  const [transactions, setTransactions] = useState<Transactions[]>([]);

  const createTransaction = async (transactionData: TransactionSchema) => {
    const response = await api.post("/transactions", {
      ...transactionData,
      createdAt: new Date(),
    });
    const { transaction } = response.data;

    setTransactions((oldState) => [...oldState, transaction]);
  };

  useEffect(() => {
    api
      .get("transactions")
      .then((response) => setTransactions(response.data.transactions));
  }, []);

  return (
    <TransactionsContext.Provider value={{ createTransaction, transactions }}>
      {children}
    </TransactionsContext.Provider>
  );
};

export const useTransactions = () => useContext(TransactionsContext);
