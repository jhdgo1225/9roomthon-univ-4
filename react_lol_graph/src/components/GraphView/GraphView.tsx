"use client";

import LOLChampGraphTitle from "../LOLChampGraphTitle/LOLChampGraphTitle";
import RealGraphView from "../RealGraphView/RealGraphView";
import { graphView, content } from "./GraphView.css";
import { useState, useEffect, useRef } from "react";
import type { GraphViewProps } from "../../types/champion";

export default function GraphView({ champ, champion }: GraphViewProps) {
    const graphViewRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    useEffect(() => {
        if (graphViewRef.current) {
            const width = graphViewRef.current.offsetWidth;
            const height = graphViewRef.current.offsetHeight;
            setDimensions({ width, height });
        }
    }, [graphViewRef]);
    console.log(dimensions);
    return (
        <div className={graphView}>
            <img
                src="/image/background.png"
                alt="lol background"
                style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                }}
            />
            <div ref={graphViewRef} className={content}>
                <LOLChampGraphTitle />
                <RealGraphView champ={champ} champion={champion} />
            </div>
        </div>
    );
}
