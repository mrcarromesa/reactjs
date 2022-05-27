import Dashboard from "./components/Dashboard";
import { Header } from "./components/Header";
import { GlobalStyle } from "./styles/globals";
import Modal from 'react-modal';
import { useState, useCallback } from 'react';
import NewTransactionModal from "./components/NewTransactionModal";
import AppProvider from "./hooks";

Modal.setAppElement('#root');

export function App() {

  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);


  const handleOpenNewTransactionModal = useCallback(() => {
    setIsNewTransactionModalOpen(true);
  }, []);

  const handleCloseNewTransactionModal = useCallback(() => {
    setIsNewTransactionModalOpen(false);
  }, []);

  return (
    <AppProvider>
      <Header
        onOpenNewTransactionModal={handleOpenNewTransactionModal}
      />
      <Dashboard />

        <NewTransactionModal 
           isOpen={isNewTransactionModalOpen}
           onRequestClose={handleCloseNewTransactionModal}
        />
      <GlobalStyle />
    </AppProvider>
  );
}

