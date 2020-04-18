import React, { useEffect, useState } from 'react';
import Highlighter from "react-highlight-words";
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
    if (!winner && key && keyCode > 64 && keyCode < 90) {
      let setOfKeys = new Set(keys);
      setOfKeys.add(key.toLowerCase());
      const depressedKeys = [...setOfKeys];

      if (depressedKeys.length === activeWordArray.length) {
        const nextWordIndex = wordIndex + 1;
        if (nextWordIndex === game.split(' ').length) {
          setWinner(true);
        } else {
          setWordIndex(nextWordIndex);
          setKeys([])
        }
      } else {
        setKeys(depressedKeys);
      }
    }
  });
  useEventListener('keyup', ({ key }) => {
    if (!winner) {
      let setOfKeys = new Set(keys);
      setOfKeys.delete(key);

      setKeys([...setOfKeys]);
    }
  });

  return (
    <div className="App">
      <header className="App-header">
        {winner && <div>you win!</div>}
        {!winner && game && activeWord && <div>
          <Highlighter
            highlightClassName="YourHighlightClass"
            searchWords={[activeWord]}
            autoEscape={true}
            textToHighlight={game}
          />
        </div>}
        {activeWord}
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
