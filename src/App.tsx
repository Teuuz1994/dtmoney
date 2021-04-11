import { useState } from "react";
import { ThemeProvider } from "styled-components";
import { createServer, Model } from "miragejs";
import Modal from "react-modal";

import { Header } from "./components/Header";
import { Dashboard } from "./components/Dashboard";
import { NewTransactionModal } from "./components/NewTransactionModal";

import { TransactionsProvider } from "./hooks/Transactions";

import { schema } from "./styles/theme";
import { GlobalStyle } from "./styles/global";

createServer({
  models: {
    transaction: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: "Freelance de website",
          type: "deposit",
          category: "dev",
          amount: 6000,
          createdAt: new Date("2021-04-10 10:00:00"),
        },
        {
          id: 2,
          title: "Aluguel",
          type: "withdraw",
          category: "casa",
          amount: 1100,
          createdAt: new Date("2021-04-08 14:35:00"),
        },
      ],
    });
  },

  routes() {
    this.namespace = "api";

    this.get("/transactions", () => {
      return this.schema.all("transaction");
    });

    this.post("/transactions", (schema, request) => {
      const data = JSON.parse(request.requestBody);

      return schema.create("transaction", data);
    });
  },
});

Modal.setAppElement("#root");

export function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(
    false
  );

  function handleOpenNewTransactionModal() {
    setIsNewTransactionModalOpen(true);
  }

  function handleCloseNewTransactionModal() {
    setIsNewTransactionModalOpen(false);
  }

  return (
    <ThemeProvider theme={schema}>
      <TransactionsProvider>
        <GlobalStyle />
        <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />
        <Dashboard />

        <NewTransactionModal
          isOpen={isNewTransactionModalOpen}
          onRequestClose={handleCloseNewTransactionModal}
        />
      </TransactionsProvider>
    </ThemeProvider>
  );
}
