import { name, status, profileText } from "./ProfileText.css";

function Name() {
    return <h1 className={name}>퉁퉁퉁 사후르</h1>;
}

function Status() {
    return <span className={status}>퉁퉁퉁퉁퉁퉁퉁퉁퉁투웉ㅇ퉁퉁퉁</span>;
}

export default function ProfileText() {
    return (
        <div className={profileText}>
            <Name />
            <Status />
        </div>
    );
}
