import { userMenuBtn } from "./UserMenuBtn.css";

export default function UserMenuBtn({
    clickHandler,
}: {
    clickHandler: EventListener;
}) {
    return (
        <button className={userMenuBtn} onClick={clickHandler}>
            ▼
        </button>
    );
}
