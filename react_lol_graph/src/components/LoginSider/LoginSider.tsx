import Account from "../Account/Account";
import LoginFormAndQRCode from "../LoginFormAndQRCode/LoginFormAndQRCode";
import Logo from "../Logo/Logo";
import PolicyDesc from "../PolicyDesc/PolicyDesc";
import { loginSider } from "./LoginSider.css";

export default function LoginSider() {
    return (
        <div className={loginSider}>
            <Logo />
            <LoginFormAndQRCode />
            <Account />
            <PolicyDesc />
        </div>
    );
}
