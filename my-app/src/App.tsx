import {
  createSignal,
  type Component,
  For,
  createEffect,
  onMount,
} from "solid-js";
import styles from "./App.module.css";
import Tile from "./components/Tile/Tile";
import Header from "./components/Header/Header";
import GameManager, {TileType} from "./components/GameManager/GameManager";

const App: Component = () => {
  const gameManager = new GameManager();
  const [boardArray, setBoardArray] = createSignal(gameManager.gameState.board);
  const [xTurn, setXTurn] = createSignal(
    gameManager.gameState.currentTurn === TileType.X
  );

  const [winner, setWinner] = createSignal<TileType | null>(null);
  onMount(() => {
    let idx = location.hash.substring(1);
    if (!idx) {
      idx = crypto.randomUUID();
      location.hash = idx + "?sh=1";
    }
    gameManager.setRoom(idx.split("?")[0]);
  });
  onMount(() => {
    gameManager.addEventListener((newState) => {
      setBoardArray(newState.board);
      setXTurn(newState.currentTurn === TileType.X);
    });
  });

  const winningCombinations = [
    // Horizontal
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // Vertical
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // Diagonal
    [0, 4, 8],
    [2, 4, 6],
  ];

  function calculateWinner(boardArray: Array<TileType>): TileType | null {
    for (const combo of winningCombinations) {
      const [a, b, c] = combo;
      if (
        boardArray[a] &&
        boardArray[a] === boardArray[b] &&
        boardArray[a] === boardArray[c]
      ) {
        return boardArray[a];
      }
    }
    return null;
  }

  createEffect(() => {
    const winner = calculateWinner(boardArray());
    setWinner(winner);
  });

  return (
    <div class={styles.Container}>
      <Header
        winner={winner()}
        xTurn={xTurn()}
        me={gameManager.gameState.myChar}
      />
      <div class={styles.Board}>
        <For each={boardArray()}>
          {(value, index) => (
            <Tile
              xTurn={xTurn()}
              boardArray={boardArray}
              tileValue={value}
              tileIndex={index()}
              play={gameManager.play}
            />
          )}
        </For>
      </div>
    </div>
  );
};

export default App;
