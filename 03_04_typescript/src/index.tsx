import { createRoot } from 'react-dom/client';

const data = { name: 'Rodolfo' };
import { App } from './App';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);

console.log(data?.name);
