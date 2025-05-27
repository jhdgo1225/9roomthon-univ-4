import { userMenuList, userMenuListItem } from "./UserMenuList.css";
import useWindowSize from "../../hooks/useWindowSize";

function UserMenuListItem({ item }: { item: string }) {
    return (
        <div
            className={userMenuListItem}
            style={{
                borderRight: item !== "menu3" ? "1px solid" : "none",
                borderImage:
                    item !== "menu3"
                        ? "linear-gradient(to bottom, #50524a, #bbb9a1, #50524a) 1"
                        : "none",
            }}>
            <img
                src={`/image/${item}.png`}
                alt={item}
                style={{
                    width: "100%",
                    height: "auto",
                }}
            />
        </div>
    );
}

export default function UserMenuList({ show }: { show: boolean }) {
    const items = ["menu1", "menu2", "menu3", "menu4", "menu5"];
    const windowSize = useWindowSize()?.width;
    return (
        <div
            style={{
                display:
                    windowSize === undefined
                        ? "none" // 초기 렌더링 시에는 숨김
                        : (windowSize >= 491 && windowSize <= 634) ||
                          windowSize > 1024 ||
                          show
                        ? "flex"
                        : "none",
            }}
            className={userMenuList}>
            {items.map((item) => (
                <UserMenuListItem key={item} item={item} />
            ))}
        </div>
    );
}
