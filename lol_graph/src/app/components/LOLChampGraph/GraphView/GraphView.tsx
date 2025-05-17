import Image from "next/image";
import LOLChampGraphTitle from "../LOLChampGraphTitle/LOLChampGraphTitle";
import RealGraphView from "./RealGraphView/RealGraphView";
import { graphView, content } from "./GraphView.css";

interface GraphViewProps {
    champion: string;
}

export default function GraphView({ champion }: GraphViewProps) {
    return (
        <div className={graphView}>
            <Image
                src="/image/background.png"
                alt="lol background"
                fill
                style={{ objectFit: "cover" }}
                priority
            />
            <div className={content}>
                <LOLChampGraphTitle />
                <RealGraphView champion={champion} />
            </div>
        </div>
    );
}
