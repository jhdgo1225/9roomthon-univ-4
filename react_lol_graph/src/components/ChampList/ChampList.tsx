// import Image from "next/image";
import type { MouseEvent } from "react";

import type { ChampionData } from "../../types/champion";
import { champList, champListItem } from "./ChampList.css";

interface ChampListItemProps {
    id: string;
    children: string;
    image: string;
    onClick: (event: MouseEvent<HTMLDivElement>) => void;
}

function ChampListItem({ id, children, image, onClick }: ChampListItemProps) {
    const realImage = !image?.length ? "default.jpg" : image;
    return (
        <div
            key={id}
            onClick={onClick}
            className={champListItem}
            style={
                {
                    "--champ-image": `url(/image/champs/${realImage})`,
                } as React.CSSProperties
            }>
            <h1>{children}</h1>
        </div>
    );
}

interface ChampListProps {
    champ: Map<string, ChampionData>;
    clickHandler: (event: MouseEvent<HTMLDivElement>) => void;
}

export default function ChampList({ champ, clickHandler }: ChampListProps) {
    return (
        <div className={champList}>
            {Array.from(champ.keys()).map((value) => (
                <ChampListItem
                    key={value}
                    id={value}
                    onClick={clickHandler}
                    image={champ.get(value)?.image || ""}>
                    {value}
                </ChampListItem>
            ))}
        </div>
    );
}
