import { loginBtn } from "./LoginBtn.css";

export default function LoginBtn({ children }: {children: string}) {
    return <button className={loginBtn}>{children}</button>;
}
