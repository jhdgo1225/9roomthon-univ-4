import { realGraphView } from "./RealGraphView.css";

interface RealGraphViewProps {
    champion: string;
}

export default function RealGraphView({ champion }: RealGraphViewProps) {
    return (
        <div className={realGraphView}>
            {/* 여기에 그래프 구현 */}
            <p>선택된 챔피언: {champion}</p>
        </div>
    );
}
