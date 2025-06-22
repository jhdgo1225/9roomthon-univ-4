import { riotLogo, riotLogoImg } from "./Logo.css";

export default function Logo() {
    return (
        <div className={riotLogo}>
            <img src="/image/logo.png" alt="riot" className={riotLogoImg} />
        </div>
    );
}
