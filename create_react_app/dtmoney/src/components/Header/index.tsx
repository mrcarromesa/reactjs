import logoImg from '~/assets/logo.svg';
import { Container, Content } from './styles';

interface HeaderProps {
  onOpenNewTransactionModal: () => void;
}


export const Header: React.FC<HeaderProps> = (props) => {
  
  return (
    <Container>
      <Content>
        <img src={logoImg} alt="dt money" />
        <button type="button" onClick={props.onOpenNewTransactionModal}>
          Nova transação
        </button>
        
      </Content>
    </Container>
  );
}