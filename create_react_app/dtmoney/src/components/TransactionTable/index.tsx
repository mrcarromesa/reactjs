import { Container } from './styles';
import { useTransition } from '~/hooks/useTransactions';



const TransactionTable: React.FC = () => {
  const { transactions } = useTransition();

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map(row => (
            <tr key={row.id}>
              <td>{row.title}</td>
              <td className={row.type}>
                {
                  new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(row.amount)
                }
              </td>
              <td>{row.category}</td>
              <td>
                {
                  new Intl.DateTimeFormat('pt-BR').format(new Date(row.createdAt))
                }
              </td>
            </tr>

          ))}
        </tbody>
      </table>
    </Container>
  );
}

export default TransactionTable;