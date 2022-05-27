import { Container } from './styles';
import incomeImg from '~/assets/income.svg';
import outcomeImg from '~/assets/outcome.svg';
import totalImg from '~/assets/total.svg';
import { useTransition } from '~/hooks/useTransactions';
import { useMemo } from 'react';

const Summary: React.FC = () => {
  const { transactions } = useTransition();

  const summary = useMemo(() => {
    const result = transactions.reduce((accumulator, transaction) => {
      if (transaction.type === 'deposit') {
        accumulator.deposits += transaction.amount;
        accumulator.total += transaction.amount;
      } else {
        accumulator.withdrawals += transaction.amount;
        accumulator.total -= transaction.amount;
      }
      return accumulator;
    }, {
      deposits:0,
      withdrawals:0,
      total:0,
    });


    return {
      deposits: new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(result.deposits),
      withdrawals: `-${new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(result.withdrawals)}`,
      total: new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(result.total),
    }
  }, [transactions]);

  return (<Container>
    <div>
      <header>
        <p>Entradas</p>
        <img src={incomeImg} alt="Entradas" />
      </header>
      <strong>{summary.deposits}</strong>
    </div>
    <div>
      <header>
        <p>Saídas</p>
        <img src={outcomeImg} alt="Saídas" />
      </header>
      <strong>{summary.withdrawals}</strong>
    </div>
    <div className="highlight-background">
      <header>
        <p>Total</p>
        <img src={totalImg} alt="Total" />
      </header>
      <strong>{summary.total}</strong>
    </div>
  </Container>);
}

export default Summary;