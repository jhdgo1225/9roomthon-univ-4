import ChampSearchBar from "./ChampSearchBar/ChampSearchBar";
import ChampSelectBox from "./ChampSelectBox/ChampSelectBox";
import ChampList from "./ChampList/ChampList";

export default function ChampSelection() {
    return (
        <div>
            <ChampSearchBar />
            <ChampSelectBox />
            <ChampList />
        </div>
    );
}
