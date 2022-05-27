# Projeto em react

- Projeto no figma: https://www.figma.com/file/0xmu9mj2TJYoIOubBFWsk5/dtmoney-Ignite-(Copy)

- Prefirir utilizar o export ao invés de export default
  - Para forçar a utilização do nome que inserimos para o component

- o arquivo src/react-app-env.d.ts é criado automáticamente pelo create react app é mais para ter uma definição de tipagens

---

### Framework de mock

- MirageJS: https://miragejs.com/

- Instalar:

```shell
yarn add miragejs -D
```

- No arquivo: `src/index.tsx` inserir:

```tsx
import { createServer } from 'miragejs';

createServer({
  routes() {
    this.namespace = 'api';

    this.get('/transactions', () => {
      return [
        {
          id: 1,
          title: 'Transaction 1',
          amount: 4000,
          type: 'deposit',
          category: 'Food',
          createdAt: new Date(),
        }
      ]
    });
  }
});

```

- E no arquivo `src/components/TransactionTable/index.tsx` inseri:

```tsx
useEffect(() => {

    const loadData = async () => {
      const response = await fetch('http://localhost:3000/api/transactions');
      const data = await response.json();
      console.log(data);
    }

    loadData();

  }, []);
```