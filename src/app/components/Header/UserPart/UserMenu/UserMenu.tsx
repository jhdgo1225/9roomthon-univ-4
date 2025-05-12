"use client";

import UserMenuList from "./UserMenuList/UserMenuList";
import UserMenuBtn from "./UserMenuBtn/UserMenuBtn";
import { useState, useCallback } from "react";
import { userMenu } from "./UserMenu.css";

export default function UserMenu() {
    const [isActive, setIsActive] = useState(false);
    const menuBtnHandler = useCallback(() => {
        setIsActive((prev) => !prev);
    }, []);
    return (
        <div className={userMenu}>
            <UserMenuBtn clickHandler={menuBtnHandler} />
            <UserMenuList show={isActive} />
        </div>
    );
}
