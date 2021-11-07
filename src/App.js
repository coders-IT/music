import { useContext } from 'react';
import './App.css';
import BaseContext from './Context/BaseContext';

function App() {
  const context = useContext(BaseContext);
  return (
    <div className="App">
      <h1>{context.name}</h1>
    </div>
  );
}

export default App;
