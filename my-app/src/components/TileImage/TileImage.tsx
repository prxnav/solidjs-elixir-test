import XTile from "../../assets/XTileR.png"
import OTile from "../../assets/OTileG.png"
import styles from "./TileImage.module.css"

interface ITileImage {
    tileValue: number
}

const TileImage = (props: ITileImage) => {
    return (
        <img class={styles.Image} src={props.tileValue === 1 ? XTile : OTile} />
    )
}

export default TileImage