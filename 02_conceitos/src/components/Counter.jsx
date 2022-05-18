import { useState, useCallback } from 'react';

export const Counter = () => {

  const [count, setCount] = useState(0);

  const handleIncrement = useCallback(() => setCount(count + 1), [count]);
  const handleDecrement = useCallback(() => setCount(count - 1), [count]);

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={handleIncrement}>+ 1</button>
      <button onClick={handleDecrement}>- 1</button>
    </div>
  );
}