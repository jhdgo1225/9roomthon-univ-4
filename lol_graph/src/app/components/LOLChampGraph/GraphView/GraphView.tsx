import Image from "next/image";
import LOLChampGraphTitle from "../LOLChampGraphTitle/LOLChampGraphTitle";
import RealGraphView from "./RealGraphView/RealGraphView";
import {graphView, content} from "./GraphView.css";

export default function GraphView() {
    return (
        <div className={graphView}>
			<Image
                src="/image/background.png"
                alt="lol background"
                layout="fill"
                objectFit="cover"
                objectPosition="center"
				priority
            />
			<div className={content}>
				<LOLChampGraphTitle />
				<RealGraphView />
			</div>
        </div>
    );
}
