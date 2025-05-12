import GameStartBtn from "./GameStartBtn/GameStartBtn";
import GameMode from "./GameMode/GameMode";
import { gameContainer } from "./GameContainer.css";

export default function GameContainer() {
    return (
        <div className={gameContainer}>
            <GameStartBtn />
            <GameMode />
        </div>
    );
}
