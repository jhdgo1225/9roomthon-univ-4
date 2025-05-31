import { useState } from "react";
import type { Ref } from "react";
import type { ChampionData, Coordinates } from "../../types/champion";
import { champNode, champNodeImg } from "./ChampNode.css";
import { showAnimation } from "../RealGraphView/RealGraphView.css";

interface ChampNodeType {
    index: number;
    ref: Ref<HTMLDivElement>;
    champ: Map<string, ChampionData>;
    champion: string;
    nodeCoords: Coordinates;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
}

export default function ChampNode({
    index,
    ref,
    champ,
    champion,
    nodeCoords,
    onMouseEnter,
    onMouseLeave,
}: ChampNodeType) {
    const [isLoaded, setIsLoaded] = useState(false);
    const renderingChampImg =
        champion === "" || champ.get(champion)?.image || "default.jpg";
    return (
        <div
            ref={ref}
            className={`${champNode} ${showAnimation}`}
            style={{
                position: "absolute",
                left: `${nodeCoords?.x}px`,
                top: `${nodeCoords?.y}px`,
                border: champion === "" ? "none" : undefined,
                opacity: isLoaded ? 1 : 0,
                transition:
                    "left 0.5s linear, top 0.5s linear, opacity 0.2s ease-in-out",
            }}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}>
            <img
                src={`/image/champs/${renderingChampImg}`}
                alt={champion}
                className={champNodeImg}
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                }}
                onLoad={() => setIsLoaded(true)}
            />
        </div>
    );
}
