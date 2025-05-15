import ChampSelection from "./ChampSelection/ChampSelection";
import GraphView from "./GraphView/GraphView";
// import {lolChampGraph} from "./LOLChampGraph.css";

export default function LOLChampGraph() {
    return (
        <div>
            <ChampSelection />
            <GraphView />
        </div>
    );
}
