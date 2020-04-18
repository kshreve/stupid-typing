import React, { useEffect, useState } from 'react';
import './App.css';

import useEventListener from './useEventListener'
import { getJoke } from './fetchJoke'

function App() {
  const [game, setGame] = useState('');
  const [keys, setKeys] = useState([]);
  const [wordIndex, setWordIndex] = useState(0);
  const [winner, setWinner] = useState(false);
  const newGame = async () => {
    const joke = await getJoke();
    setGame(joke)
  }
  useEffect(() => {
    newGame();
  }, []);
  const activeWord = game.split(' ')[wordIndex];
  const activeWordArray = [...new Set(activeWord.toLowerCase())];

  useEventListener('keydown', ({ key, keyCode }) => {
    if (key && keyCode > 64 && keyCode < 90) {
      let setOfKeys = new Set(keys);
      setOfKeys.add(key.toLowerCase());
      const depressedKeys = [...setOfKeys];

      if (depressedKeys.length === activeWordArray.length) {
        setWordIndex(wordIndex + 1);
        setKeys([])
      } else {
        setKeys(depressedKeys);
      }
    }
  });
  useEventListener('keyup', ({ key }) => {
    let setOfKeys = new Set(keys);
    setOfKeys.delete(key);

    setKeys([...setOfKeys]);
  });

  return (
    <div className="App">
      <header className="App-header">
        {winner && <div>you win!</div>}
        {!winner && <div>{game}</div>}
        <br />
        <br />
        <div>{keys}</div>
        <br />
        {winner && <button onClick={newGame}>new game</button>}
      </header>
    </div>
  );
}

export default App;
