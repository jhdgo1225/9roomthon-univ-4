import GamePart from "./GamePart/GamePart";
import UserPart from "./UserPart/UserPart";
import { header } from "./Header.css";

export default function Header() {
    return (
        <header className={header}>
            <GamePart />
            <UserPart />
        </header>
    );
}
