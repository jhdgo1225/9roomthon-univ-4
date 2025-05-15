import Image from "next/image";
import {profileImage} from "./ProfileImage.css";

export default function ProfileImage() {
    return (
        <div className={profileImage}>
            <Image
                priority={true}
                src="/image/profile.png"
                alt="profile"
                width={60}
                height={60}
            />
        </div>
    );
}