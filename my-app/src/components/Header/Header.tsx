import smallO from "../../assets/smallOTileG.png";
import smallX from "../../assets/smallXTileR.png";
import { TileType } from "../GameManager/GameManager";
import styles from "./Header.module.css";

interface BoardHeader {
  xTurn: boolean;
  winner: TileType | null;
  me: TileType;
}

const Header = (props: BoardHeader) => {
  return (
    <div class={styles.Container}>
      {props.winner == null ? (
        <>
          <div class={styles.Turn}>
            <b style={{ color: "var(--lightYellow)" }}>YOU</b>
            <img src={props.me === TileType.X ? smallX : smallO} />{" "}
          </div>
          <p style={{ color: "var(--lightYellow)" }}>XO Game</p>
          <div class={styles.Turn}>
            <img src={props.xTurn ? smallX : smallO} />
            <b style={{ color: "var(--lightYellow)" }}>TURN</b>
          </div>
        </>
      ) : (
        <>
          <div class={styles.Turn}>
            <img src={props.winner === TileType.X ? smallX : smallO} />
            <p style={{ color: "var(--lightYellow)" }}>WINS!</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Header;
