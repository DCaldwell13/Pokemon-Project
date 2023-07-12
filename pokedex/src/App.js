import { useEffect } from "react";
import './App.css';

function App() {
  useEffect(() => {
    document.title = 'Pokedex App'
  }, [])
  
  return (
    <div className="App">
      <header className="App-header">
      </header>
    </div>
  );
}

export default App;
