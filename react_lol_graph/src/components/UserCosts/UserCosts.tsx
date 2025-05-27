import Cost from "../Cost/Cost";
import { userCosts } from "./UserCosts.css";

export default function UserCosts() {
    return (
        <div className={userCosts}>
            <Cost type="RP" amount="1234" width="14" height="12" />
            <Cost type="BE" amount="6400" width="14" height="12" />
        </div>
    );
}
