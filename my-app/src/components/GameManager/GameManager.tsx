import { Accessor, Setter } from "solid-js";
import { Channel, Socket } from "phoenix";
import { elixirSocket } from "../../util/CustomSocket";

export const enum TileType {
  EMPTY = 0,
  X = 1,
  O = 2,
}

interface GameState {
  board: TileType[];
  myChar: TileType;
  currentTurn: TileType;
}
class GameManager {
  socket: Socket;
  gameState: GameState;
  callbacks: Set<(num: GameState) => void> = new Set();
  channel?: Channel | null;
  constructor() {
    this.socket = null as any;
    this.gameState = {
      board: Array.from({ length: 9 }).fill(TileType.EMPTY) as TileType[],
      myChar: new URLSearchParams(location.hash.split("?")[1] || "").has("sh")
        ? TileType.O
        : TileType.X,
      currentTurn: TileType.X,
    };

    console.log("connecting");
    elixirSocket.connect();
  }
  ___toggleXTurn = () => {
    this.gameState = {
      ...this.gameState,
      currentTurn:
        this.gameState.currentTurn === TileType.O ? TileType.X : TileType.O,
    };

    this.callbacks.forEach((cb) => cb(this.gameState));
    this.sync();
  };
  sync() {
    this.channel?.push("broadcast", {
      data: {
        board: this.gameState.board,
        currentTurn: this.gameState.currentTurn,
      },
    });
  }
  setRoom(id: string) {
    this.channel = elixirSocket.channel("room:" + id);
    this.channel.join();
    (window as any).temp1 = this.channel;
    this.channel.push("broadcast", { data: "ping" });
    this.channel.on("update", (data) => {
      if (data?.data === "ping") return this.sync();
      this.gameState = { ...this.gameState, ...data.data };
      console.log(data, this.gameState);
      this.callbacks.forEach((cb) => cb(this.gameState));
    });
  }
  play = (position: number, tile: TileType) => {
    if (this.gameState.myChar !== this.gameState.currentTurn)
      return console.log("illegal");
    this.gameState = {
      board: this.gameState.board.slice(),
      myChar: this.gameState.myChar,
      currentTurn: this.gameState.currentTurn,
    };
    this.gameState.board[position] = tile;
    this.___toggleXTurn();
  };

  addEventListener(callback: (newState: GameState) => void) {
    this.callbacks.add(callback);
  }
}

export default GameManager;