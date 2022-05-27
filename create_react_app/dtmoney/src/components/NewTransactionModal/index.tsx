import Modal from 'react-modal';
import { Container, TransactionTypeContainer, RadioBox } from './styles';
import closeImg from '~/assets/close.svg';
import incomeImg from '~/assets/income.svg';
import outcomeImg from '~/assets/outcome.svg';
import { useState, useCallback, FormEvent } from 'react';
import { useTransition } from '~/hooks/useTransactions';

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

enum TransactionType {
  INCOME = 'deposit',
  OUTCOME = 'withdraw',
}

const NewTransactionModal: React.FC<NewTransactionModalProps> = (props) => {

  const { createTransaction } = useTransition();

  const [type, setType] = useState(TransactionType.INCOME);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [value, setValue] = useState(0);

  const handleCreateNewTransaction = useCallback(async (event:  FormEvent) => {
    event.preventDefault();
    const data = {
      title,
      category,
      amount: value,
      type,
    };

    await createTransaction(data);

    props.onRequestClose();

    setType(TransactionType.INCOME);
    setTitle('');
    setCategory('');
    setValue(0);

  }, [title, category, value, type, createTransaction, props]); 
  
  return (
    <Modal
      isOpen={props.isOpen}
      onRequestClose={props.onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <Container onSubmit={handleCreateNewTransaction}>
        
        <button 
          type="button" 
          onClick={props.onRequestClose} 
          className="react-modal-close"
        >
          <img src={closeImg} alt="Fechar modal" />  
        </button>

        <h2>Cadastrar transação</h2>
        <input
          placeholder="Título"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <input
          type="number"
          placeholder="Valor"
          value={value}
          onChange={(event) => setValue(Number(event.target.value))}
        />


        <TransactionTypeContainer>
          <RadioBox
            type="button"
            onClick={() => setType(TransactionType.INCOME)}
            isActive={type === TransactionType.INCOME}
            activeColor='green'
          >
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>
          <RadioBox
            type="button"
            onClick={() => setType(TransactionType.OUTCOME)}
            isActive={type === TransactionType.OUTCOME}
            activeColor='red'
          >
            <img src={outcomeImg} alt="Saída" />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>


        <input
          placeholder="Categoria"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        />
        <button type="submit">
          Cadastrar
        </button>
      </Container>
      
    </Modal>
  );
}

export default NewTransactionModal;