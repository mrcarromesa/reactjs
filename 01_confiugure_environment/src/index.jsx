import { render } from 'react-dom';
const data = { name: 'Rodolfo' };
import { App } from './App';

render(<App />, document.getElementById('root'));

console.log(data?.name);

