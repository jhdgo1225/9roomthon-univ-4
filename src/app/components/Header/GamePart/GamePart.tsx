import GameContainer from "./GameContainer/GameContainer";

import LOLBtn from "./LOLBtn/LOLBtn";
import { gamePart } from "./GamePart.css";

export default function GamePart() {
    return (
        <div className={gamePart}>
            <GameContainer />
            
            <LOLBtn />
        </div>
    );
}
