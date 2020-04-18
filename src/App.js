import React, { useEffect, useState } from 'react';
import './App.css';

import useEventListener from './useEventListener'
import { getJoke } from './fetchJoke'

function App() {
  const [game, setGame] = useState('');
  const newGame = async () => {
    const joke = await getJoke();
    setGame(joke)
  }
  useEffect(() => {
    newGame();
  }, [])

  const [keys, setKeys] = useState('');

  useEventListener('keydown', ({ key, ...rest }) => {
    setKeys(String(keys) + String(key));
    debugger;
  });

  return (
    <div className="App">
      <header className="App-header">
        <div>{game}</div>
        <br />
        <br />
        <div>{keys}</div>
        <br />
        <button onClick={newGame}>new game</button>
      </header>
    </div>
  );
}

export default App;
