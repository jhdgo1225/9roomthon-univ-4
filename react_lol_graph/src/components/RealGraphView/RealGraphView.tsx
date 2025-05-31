import { realGraphView } from "./RealGraphView.css";
import ChampNode from "../ChampNode/ChampNode";
import type { GraphViewProps, Coordinates } from "../../types/champion";
import { useState, useRef, useEffect, useCallback } from "react";

function calcCoords(
    championLength: number | 1,
    graphView: HTMLDivElement | null
): Coordinates[] {
    const newCoords: Coordinates[] = [];
    const graphViewOffsetWidth = graphView?.offsetWidth || 0;
    const graphViewOffsetHeight = graphView?.offsetHeight || 0;
    newCoords.push({ x: graphViewOffsetWidth / 2, y: 10 });
    for (let i = 1; i < championLength; i++) {
        let nextX = Math.random() * graphViewOffsetWidth;
        let nextY: number = newCoords[i - 1].y + 70;
        if (nextX >= graphViewOffsetWidth - 62)
            nextX = graphViewOffsetWidth - 62;
        if (nextX <= 20) nextX = 20;
        if (nextY >= graphViewOffsetHeight - 52) nextY = 15;
        if (
            nextX >= newCoords[i - 1].x - 42 &&
            nextX <= newCoords[i - 1].x + 42
        ) {
            const tmpNextX1 = newCoords[i - 1].x - 62;
            const tmpNextX2 = newCoords[i - 1].x + 62;
            if (tmpNextX1 <= 20) nextX = tmpNextX2;
            else if (tmpNextX2 >= graphViewOffsetHeight - 62) nextX = tmpNextX1;
        }
        const coord: Coordinates = { x: nextX, y: nextY };
        newCoords.push(coord);
    }
    return newCoords;
}

export default function RealGraphView({ champ, champion }: GraphViewProps) {
    const graphViewRef = useRef<HTMLDivElement>(null);
    const champNodeRef = useRef<HTMLDivElement>(null);
    const animationIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const [champNodesCoords, setChampNodesCoords] = useState<Coordinates[]>([]);
    const [nodesVelocity, setNodesVelocity] = useState<Coordinates[]>([]);
    const [graphViewWidth, setGraphViewWidth] = useState<number>(0);
    const [champEdges, setChampEdges] = useState<Record<number, string>[]>([]);
    const [hoveredChampion, setHoveredChampion] = useState<string>("");

    const moveAnywhere = useCallback(() => {
        setChampNodesCoords((prevCoords) => {
            if (nodesVelocity.length === 0) return prevCoords;

            return prevCoords.map((value: Coordinates, index: number) => {
                let nextX = value.x + nodesVelocity[index].x;
                let nextY = value.y + nodesVelocity[index].y;
                const graphView = graphViewRef.current;
                if (graphView) {
                    const nodeSize = 80;
                    const padding = 10;
                    const minX = padding;
                    const maxX = graphView.offsetWidth - nodeSize - padding;
                    const minY = padding;
                    const maxY = graphView.offsetHeight - nodeSize - padding;

                    if (nextX < minX || nextX > maxX) {
                        nextX = value.x - nodesVelocity[index].x;
                    }
                    if (nextY < minY || nextY > maxY) {
                        nextY = value.y - nodesVelocity[index].y;
                    }
                }
                return { x: nextX, y: nextY };
            });
        });
    }, [nodesVelocity, graphViewRef]);

    const changeVelocity = useCallback(() => {
        setNodesVelocity((prevVelocity) => {
            const newVelocity = Array(prevVelocity.length)
                .fill(null)
                .map(() => ({
                    x: Math.random() * 8 - 4,
                    y: Math.random() * 8 - 4,
                }));
            return newVelocity;
        });
    }, []);

    // 초기 데이터 설정 및 애니메이션 시작
    useEffect(() => {
        const graphView = graphViewRef.current;
        if (!graphView) return;

        const graphChamps = champ?.get(champion)?.relation || {};
        const graphChampsLength = Object.keys(graphChamps)?.length || 0;

        // 초기 좌표 설정 (데이터 로드 시 한 번만)
        if (champNodesCoords.length === 0 && graphChampsLength > 0) {
            const initialCoords = calcCoords(graphChampsLength + 1, graphView);
            setChampNodesCoords(initialCoords);

            // 초기 속도 설정 (데이터 로드 시 한 번만)
            const initialVelocity = Array(graphChampsLength + 1)
                .fill(null)
                .map(() => ({
                    x: Math.random() * 8 - 4,
                    y: Math.random() * 8 - 4,
                }));
            setNodesVelocity(initialVelocity);

            // 엣지 설정 (데이터 로드 시 한 번만)
            const champToIdx: Record<string, number> = {};
            champToIdx[champion] = 0;
            Object.keys(graphChamps).forEach((value: string, index: number) => {
                champToIdx[value] = index + 1;
            });

            const edges = Object.keys(champToIdx).map((value) => {
                const champRelations = champ?.get(value)?.relation || {};
                const champToChamps: Record<number, string> = {};
                Object.keys(champRelations).forEach((value) => {
                    const idx = champToIdx[value];
                    if (idx !== undefined) {
                        champToChamps[idx] = champRelations[value];
                    }
                });
                return champToChamps;
            });

            setChampEdges(edges);
        }

        // 노드 좌표와 속도가 설정되면 애니메이션 시작
        if (
            champNodesCoords.length > 0 &&
            nodesVelocity.length > 0 &&
            !hoveredChampion &&
            !animationIntervalRef.current
        ) {
            animationIntervalRef.current = setInterval(() => {
                moveAnywhere(); // 먼저 위치 업데이트
                changeVelocity(); // 그 다음 속도 변경 (랜덤하게 튀는 움직임)
            }, 100); // 간격 조정 (랜덤 움직임이 너무 빠르지 않게)
        }

        // 컴포넌트 언마운트 또는 의존성 변경 시 애니메이션 정리
        return () => {
            if (animationIntervalRef.current) {
                clearInterval(animationIntervalRef.current);
                animationIntervalRef.current = null;
            }
        };
    }, [
        champ,
        champion,
        graphViewWidth,
        champNodesCoords.length,
        nodesVelocity.length,
        hoveredChampion,
        moveAnywhere,
        changeVelocity,
    ]);

    const handleMouseEnter = useCallback((champion: string) => {
        // 모든 노드의 움직임을 멈춤
        if (animationIntervalRef.current) {
            clearInterval(animationIntervalRef.current);
            animationIntervalRef.current = null;
        }
        setHoveredChampion(champion);
    }, []);

    const handleMouseLeave = useCallback(() => {
        setHoveredChampion("");
        // 마우스가 벗어나면 다시 움직임 시작
        // 데이터가 로드된 상태에서만 애니메이션 시작
        if (
            champNodesCoords.length > 0 &&
            nodesVelocity.length > 0 &&
            !animationIntervalRef.current
        ) {
            animationIntervalRef.current = setInterval(() => {
                moveAnywhere();
                changeVelocity();
            }, 100); // 간격 조정
        }
    }, [
        champNodesCoords.length,
        nodesVelocity.length,
        moveAnywhere,
        changeVelocity,
    ]);

    // 리사이즈 처리
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

    const drawEdges = useCallback(() => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const graphView = graphViewRef.current;
        if (!ctx || !graphView || champNodesCoords.length === 0) return; // Draw only if nodes data is available

        canvas.width = graphView.offsetWidth;
        canvas.height = graphView.offsetHeight;
        canvas.style.position = "absolute";
        canvas.style.top = "0";
        canvas.style.left = "0";
        canvas.style.zIndex = "-1";
        canvas.style.pointerEvents = "none";
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 노드 중앙을 기준으로 간선 그리기
        const nodeSize = 80; // ChampNode의 크기를 80x80으로 가정
        const nodeCenterOffset = nodeSize / 2;

        if (hoveredChampion) {
            const graphChamps = champ?.get(champion)?.relation || {};
            const champToIdx: Record<string, number> = {};
            champToIdx[champion] = 0;
            Object.keys(graphChamps).forEach((value: string, index: number) => {
                champToIdx[value] = index + 1;
            });

            const hoveredIndex = champToIdx[hoveredChampion];

            if (hoveredIndex !== undefined && champEdges[hoveredIndex]) {
                // Check if champEdges[hoveredIndex] exists
                // 호버된 챔피언에서 다른 챔피언으로 가는 간선
                Object.keys(champEdges[hoveredIndex]).forEach(
                    (targetIndexStr) => {
                        const targetIndex = parseInt(targetIndexStr);
                        const startCoord = champNodesCoords[hoveredIndex];
                        const targetCoord = champNodesCoords[targetIndex];

                        if (startCoord && targetCoord) {
                            ctx.beginPath();
                            // 시작 좌표를 노드 중앙으로 설정
                            ctx.moveTo(
                                startCoord.x + nodeCenterOffset,
                                startCoord.y + nodeCenterOffset
                            );
                            // 끝 좌표를 대상 노드 중앙으로 설정
                            ctx.lineTo(
                                targetCoord.x + nodeCenterOffset,
                                targetCoord.y + nodeCenterOffset
                            );
                            ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
                            ctx.lineWidth = 2;
                            ctx.stroke();

                            const text = champEdges[hoveredIndex][targetIndex];
                            if (text) {
                                ctx.font = "12px Arial";
                                const textWidth = ctx.measureText(text).width;
                                const padding = 4;
                                ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
                                ctx.fillRect(
                                    targetCoord.x +
                                        nodeCenterOffset -
                                        textWidth / 2 -
                                        padding,
                                    targetCoord.y + nodeCenterOffset - 35, // 텍스트 위치 조정
                                    textWidth + padding * 2,
                                    20
                                );
                                ctx.fillStyle = "white";
                                ctx.textAlign = "center";
                                ctx.fillText(
                                    text,
                                    targetCoord.x + nodeCenterOffset,
                                    targetCoord.y + nodeCenterOffset - 20
                                ); // 텍스트 위치 조정
                            }
                        }
                    }
                );

                // 다른 챔피언에서 호버된 챔피언으로 오는 간선
                Object.keys(champToIdx).forEach((otherChampName) => {
                    const otherIndex = champToIdx[otherChampName];
                    if (
                        otherIndex !== hoveredIndex &&
                        champNodesCoords[otherIndex]
                    ) {
                        // Check if otherIndex is valid and coords exist
                        const otherChampRelations =
                            champ?.get(otherChampName)?.relation || {};
                        if (otherChampRelations[hoveredChampion]) {
                            const startCoord = champNodesCoords[otherIndex];
                            const targetCoord = champNodesCoords[hoveredIndex];
                            const relationText =
                                otherChampRelations[hoveredChampion];

                            if (startCoord && targetCoord) {
                                ctx.beginPath();
                                // 시작 좌표를 노드 중앙으로 설정
                                ctx.moveTo(
                                    startCoord.x + nodeCenterOffset,
                                    startCoord.y + nodeCenterOffset
                                );
                                // 끝 좌표를 호버된 노드 중앙으로 설정
                                ctx.lineTo(
                                    targetCoord.x + nodeCenterOffset,
                                    targetCoord.y + nodeCenterOffset
                                );
                                ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
                                ctx.lineWidth = 2;
                                ctx.stroke();

                                ctx.font = "12px Arial";
                                const textWidth =
                                    ctx.measureText(relationText).width;
                                const padding = 4;
                                ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
                                ctx.fillRect(
                                    targetCoord.x +
                                        nodeCenterOffset -
                                        textWidth / 2 -
                                        padding,
                                    targetCoord.y + nodeCenterOffset + 15, // 텍스트 위치 조정
                                    textWidth + padding * 2,
                                    20
                                );
                                ctx.fillStyle = "white";
                                ctx.textAlign = "center";
                                ctx.fillText(
                                    relationText,
                                    targetCoord.x + nodeCenterOffset,
                                    targetCoord.y + nodeCenterOffset + 30
                                ); // 텍스트 위치 조정
                            }
                        }
                    }
                });
            }
        }

        return canvas;
    }, [champNodesCoords, champEdges, hoveredChampion, champion, champ]);

    useEffect(() => {
        const canvas = drawEdges();
        if (canvas && graphViewRef.current) {
            const existingCanvas = graphViewRef.current.querySelector("canvas");
            if (existingCanvas) {
                existingCanvas.remove();
            }
            graphViewRef.current.appendChild(canvas);
        }
    }, [drawEdges]);

    return (
        <div ref={graphViewRef} className={realGraphView}>
            <ChampNode
                index={0}
                ref={champNodeRef}
                champ={champ}
                champion={champion}
                nodeCoords={champNodesCoords[0]}
                onMouseEnter={() => handleMouseEnter(champion)}
                onMouseLeave={handleMouseLeave}
            />
            {Object.keys(champ?.get(champion)?.relation || {})?.map(
                (relChampion, index) => (
                    <ChampNode
                        key={index + 1}
                        index={index + 1}
                        ref={champNodeRef}
                        champ={champ}
                        champion={relChampion}
                        nodeCoords={champNodesCoords[index + 1]}
                        onMouseEnter={() => handleMouseEnter(relChampion)}
                        onMouseLeave={handleMouseLeave}
                    />
                )
            )}
        </div>
    );
}
