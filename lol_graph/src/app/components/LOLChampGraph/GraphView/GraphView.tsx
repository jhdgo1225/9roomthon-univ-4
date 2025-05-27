"use client";

import Image from "next/image";
import LOLChampGraphTitle from "../LOLChampGraphTitle/LOLChampGraphTitle";
import RealGraphView from "./RealGraphView/RealGraphView";
import { graphView, content } from "./GraphView.css";
import { useState, useEffect, useRef } from "react";

interface GraphViewProps {
    champion: string;
}

export default function GraphView({ champion }: GraphViewProps) {
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
            <Image
                src="/image/background.png"
                alt="lol background"
                fill
                style={{ objectFit: "cover" }}
                priority
            />
            <div ref={graphViewRef} className={content}>
                <LOLChampGraphTitle />
                <RealGraphView champion={champion} />
            </div>
        </div>
    );
}
