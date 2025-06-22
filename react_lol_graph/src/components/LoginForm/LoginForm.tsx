// import { useState } from "react";
import LoginBtn from "../LoginBtn/LoginBtn";

export default function LoginForm() {
	// const [loginMethod, setLoginMethod] = useState(0);
	return <form onSubmit={(e) => {
		e.preventDefault();
	}}>
		{/* <LoginMethodBtnSet setLoginMethod={} />
		{loginMethod === 0 ? <LoginInputs /> : <LoginQRCode />} */}
		<LoginBtn>→</LoginBtn>
	</form>
}