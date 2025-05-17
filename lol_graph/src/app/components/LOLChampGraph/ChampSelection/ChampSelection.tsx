import ChampSearchBar from "./ChampSearchBar/ChampSearchBar";
// import ChampSelectBox from "./ChampSelectBox/ChampSelectBox";
import ChampList from "./ChampList/ChampList";
import { champSelection } from "./ChampSelection.css";
import { MouseEvent } from "react";

interface ChampionRelation {
    [key: string]: string;
}

interface ChampionData {
    image: string;
    relation: ChampionRelation;
}

interface ChampSelectionProps {
    champ: Map<string, ChampionData>;
    clickHandler: (event: MouseEvent<HTMLDivElement>) => void;
}

export default function ChampSelection({
    champ,
    clickHandler,
}: ChampSelectionProps) {
    return (
        <div className={champSelection}>
            <ChampSearchBar />
            {/* <ChampSelectBox /> */}
            <ChampList champ={champ} clickHandler={clickHandler} />
        </div>
    );
}
