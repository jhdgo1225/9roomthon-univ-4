import {policyDesc} from "./PolicyDesc.css"

export default function PolicyDesc() {
    return (
        <div className={policyDesc}>
            이 앱은 hCaptcha로 보호되고 있으며 hCaptcha의{" "}
            <span>개인정보 처리방침</span> 및 <span>서비스 약관</span>이
            적용됩니다.
        </div>
    );
}
