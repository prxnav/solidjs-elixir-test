import {Show} from "solid-js";
import {TileType} from "../GameManager/GameManager";
import TileImage from "../TileImage/TileImage";
import styles from "./Tile.module.css";

interface ITile {
  xTurn: boolean;
  boardArray: any;
  tileValue: number;
  tileIndex: number;
  play: (position: number, tile: TileType) => void;
}

const Tile = (props: ITile) => {
  const putTile = () => {
    if (props.tileValue === 0) {
      props.xTurn
        ? props.play(props.tileIndex, TileType.X)
        : props.play(props.tileIndex, TileType.O);
  
    }
  };

  return (
    <div class={styles.Tile} onClick={putTile}>
      <Show when={props.tileValue > 0}>
        <TileImage tileValue={props.tileValue} />
      </Show>
    </div>
  );
};

export default Tile;
