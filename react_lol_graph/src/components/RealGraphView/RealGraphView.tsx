import { realGraphView } from "./RealGraphView.css";
import ChampNode from "../ChampNode/ChampNode";
import type { GraphViewProps } from "../../types/champion";

export default function RealGraphView({ champ, champion }: GraphViewProps) {
    return (
        <div className={realGraphView}>
            <p>선택된 챔피언: {champion}</p>
            <ChampNode champ={champ} champion={champion} />
        </div>
    );
}
