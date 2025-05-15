import UserProfileAndCosts from "./UserProfileAndCosts/UserProfileAndCosts";
import UserMenu from "./UserMenu/UserMenu";
import {userPart} from "./UserPart.css";

export default function UserPart() {
    return (
        <div className={userPart}>
            <UserProfileAndCosts />
            <UserMenu />
        </div>
    );
}
