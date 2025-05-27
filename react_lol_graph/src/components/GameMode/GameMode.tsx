import { gameMode } from "./GameMode.css";

export default function GameMode() {
    return (
        <div className={gameMode}>
            <span>홈</span>
            <span>전략적 팀 전투</span>
        </div>
    );
}
