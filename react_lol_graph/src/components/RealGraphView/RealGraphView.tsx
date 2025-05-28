import { realGraphView } from "./RealGraphView.css";
import ChampNode from "../ChampNode/ChampNode";
import type { GraphViewProps, Coordinates } from "../../types/champion";
import { useState, useRef, useEffect, useCallback } from "react";

function calcCoords(
    championLength: number | 1,
    graphView: HTMLDivElement | null
) {
    const newCoords = [];
    const graphViewOffsetWidth = graphView?.offsetWidth || 0;
    const graphViewOffsetHeight = graphView?.offsetHeight || 0;
    newCoords.push({ x: graphViewOffsetWidth / 2, y: 10 });
    for (let i = 1; i < championLength; i++) {
        const tmpCoord: Coordinates = newCoords[i - 1];
        let nextX = tmpCoord.x,
            nextY = tmpCoord.y;
        while (true) {
            nextX += 62 + Math.random() * 15;
            nextY += 52 + Math.random() * 10;
            if (nextX >= graphViewOffsetWidth - 52) nextX = 20;
            if (nextY >= graphViewOffsetHeight - 52) nextY = 15;
            if (
                Math.abs(nextX - tmpCoord.x) >= 62 &&
                Math.abs(nextY - tmpCoord.y)
            )
                break;
        }
        const coord = { x: nextX, y: nextY };
        newCoords.push(coord);
    }
    return newCoords;
}

export default function RealGraphView({ champ, champion }: GraphViewProps) {
    const graphViewRef = useRef<HTMLDivElement>(null);
    const champNodeRef = useRef<HTMLDivElement>(null);
    const [champNodesCoords, setChampNodesCoords] = useState<Coordinates[]>([]);
    const [nodesVelocity, setNodesVelocity] = useState<Coordinates[]>([]);
    const [graphViewWidth, setGraphViewWidth] = useState<number>(0);

    useEffect(() => {
        const graphView = graphViewRef.current;
        if (!graphView) return;

        setGraphViewWidth(graphView.offsetWidth);

        const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                setGraphViewWidth(entry.contentRect.width);
            }
        });

        resizeObserver.observe(graphView);

        return () => {
            resizeObserver.disconnect();
        };
    }, []);

    useEffect(() => {
        const graphView = graphViewRef.current;
        if (!graphView) return;
        const graphChamps = champ?.get(champion)?.relation || {};
        const graphChampsLength = Object.keys(graphChamps).length;
        console.log(graphChampsLength);
        setChampNodesCoords(() => calcCoords(graphChampsLength + 1, graphView));
        setNodesVelocity(() => {
            const newVelocity: Coordinates[] = [];
            for (let i = 0; i < graphChampsLength + 1; i++) {
                newVelocity.push({
                    x: Math.random() * 8 - 4,
                    y: Math.random() * 8 - 4,
                });
            }
            return newVelocity;
        });
    }, [
        champ,
        champion,
        graphViewWidth,
        setNodesVelocity,
        setChampNodesCoords,
    ]);

    const moveAnywhere = useCallback(() => {
        setChampNodesCoords((prevCoords) => {
            const newCoords = prevCoords.map(
                (value: Coordinates, index: number) => {
                    let nextX = value.x + nodesVelocity[index]?.x;
                    let nextY = value.y + nodesVelocity[index]?.y;
                    const graphView = graphViewRef.current;
                    if (graphView) {
                        const nodeSize = 80;
                        const padding = 10;
                        const minX = padding;
                        const maxX = graphView.offsetWidth - nodeSize - padding;
                        const minY = padding;
                        const maxY =
                            graphView.offsetHeight - nodeSize - padding;

                        if (nextX < minX || nextX > maxX) {
                            nextX = value.x - nodesVelocity[index].x;
                        }
                        if (nextY < minY || nextY > maxY) {
                            nextY = value.y - nodesVelocity[index].y;
                        }
                    }
                    return { x: nextX, y: nextY };
                }
            );
            return newCoords;
        });
    }, [setChampNodesCoords, nodesVelocity, graphViewRef]);

    const changeVelocity = useCallback(() => {
        setNodesVelocity(() => {
            const newVelocity: Coordinates[] = [];
            for (let i = 0; i < champNodesCoords.length; i++) {
                newVelocity.push({
                    x: Math.random() * 8 - 4,
                    y: Math.random() * 8 - 4,
                });
            }
            return newVelocity;
        });
    }, [setNodesVelocity, champNodesCoords]);

    useEffect(() => {
        const interval = setInterval(() => {
            changeVelocity();
            moveAnywhere();
        }, 500);
        return () => {
            clearInterval(interval);
        };
    }, [changeVelocity, moveAnywhere]);

    return (
        <div ref={graphViewRef} className={realGraphView}>
            <ChampNode
                ref={champNodeRef}
                champ={champ}
                champion={champion}
                nodeCoords={champNodesCoords[0]}
            />
            {Object.keys(champ?.get(champion)?.relation || {})?.map(
                (relChampion, index) => (
                    <ChampNode
                        key={index}
                        ref={champNodeRef}
                        champ={champ}
                        champion={relChampion}
                        nodeCoords={champNodesCoords[index+1]}
                    />
                )
            )}
        </div>
    );
}
