import { profileImage } from "./ProfileImage.css";

export default function ProfileImage() {
    return (
        <div className={profileImage}>
            <img
                src="/image/profile.png"
                alt="profile"
                style={{
                    width: "60px",
                    height: "60px",
                }}
            />
        </div>
    );
}
