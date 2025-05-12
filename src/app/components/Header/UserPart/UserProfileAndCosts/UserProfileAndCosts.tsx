import UserProfile from "./UserProfile/UserProfile";
import UserCosts from "./UserCosts/UserCosts";
import { userProfileAndCosts } from "./UserProfileAndCosts.css";

export default function UserProfileAndCosts() {
    return (
        <div className={userProfileAndCosts}>
            <UserProfile />
            <UserCosts />
        </div>
    );
}
