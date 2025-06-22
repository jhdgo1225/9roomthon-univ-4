import Account from "../Account/Account";
import LoginForm from "../LoginForm/LoginForm";
import Logo from "../Logo/Logo";
import PolicyDesc from "../PolicyDesc/PolicyDesc";
import { loginSider } from "./LoginSider.css";

export default function LoginSider() {
    return (
        <div className={loginSider}>
            <Logo />
            <LoginForm />
            <Account />
            <PolicyDesc />
        </div>
    );
}
