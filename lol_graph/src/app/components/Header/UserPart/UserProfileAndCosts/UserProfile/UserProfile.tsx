import ProfileImage from "./ProfileImage/ProfileImage";
import ProfileText from "./ProfileText/ProfileText";
import {userProfile} from "./UserProfile.css";

export default function UserProfile() {
    return (
        <div className={userProfile}>
            <ProfileImage />
            <ProfileText />
        </div>
    );
}
