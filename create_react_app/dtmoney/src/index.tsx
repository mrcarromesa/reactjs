import React from 'react';
import ReactDOM from 'react-dom/client';
import {App} from './App';
import { createServer, Model } from 'miragejs';

createServer({

  models: {
    transaction: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Freelance de website',
          type: 'deposit',
          category: 'DEV',
          amount: 6000,
          createdAt: new Date('2020-01-01 09:00:00'),
        },
        {
          id: 2,
          title: 'Aluguel',
          type: 'withdraw',
          category: 'Casa',
          amount: 1100,
          createdAt: new Date('2020-01-14 11:00:00'),
        },
      ]
    });
  },


  routes() {
    this.namespace = 'api';

    this.get('/transactions', () => {
      return this.schema.all('transaction');
    });
    
    this.post('/transactions', (schema, req) => {
      const data = JSON.parse(req.requestBody);

      return schema.create('transaction', data);
    });
  }
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

