import { realGraphView } from "./RealGraphView.css";
import ChampNode from "../ChampNode/ChampNode";
import type { GraphViewProps, Coordinates } from "../../types/champion";
import { useState, useRef, useEffect, useCallback } from "react";

function calcCoords(
  championLength: number,
  graphView: HTMLDivElement | null
): Coordinates[] {
  const newCoords: Coordinates[] = [];
  const w = graphView?.offsetWidth || 0;
  const h = graphView?.offsetHeight || 0;
  // 가운데 위쪽에서 시작
  newCoords.push({ x: w / 2, y: 10 });
  for (let i = 1; i < championLength; i++) {
    let nextX = Math.random() * w;
    let nextY = newCoords[i - 1].y + 70;
    const nodeSize = 80;
    // 화면 밖으로 안 나가도록 clamp
    nextX = Math.max(20, Math.min(nextX, w - nodeSize - 20));
    nextY = Math.min(nextY, h - nodeSize - 20);
    // 직전 노드와 너무 겹치지 않게 약간 좌우로 밀기
    if (
      Math.abs(nextX - newCoords[i - 1].x) <= 42
    ) {
      const left   = newCoords[i - 1].x - 62;
      const right  = newCoords[i - 1].x + 62;
      if (left <= 20)         nextX = right;
      else if (right >= w - nodeSize - 20) nextX = left;
      else nextX = right;
    }
    newCoords.push({ x: nextX, y: nextY });
  }
  return newCoords;
}

export default function RealGraphView({ champ, champion }: GraphViewProps) {
  const graphViewRef = useRef<HTMLDivElement>(null);
  const champNodeRef = useRef<HTMLDivElement>(null);
  const animationIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // 좌표 / 속도 / 엣지 / 호버 상태 등
  const [champNodesCoords, setChampNodesCoords] = useState<Coordinates[]>([]);
  const [nodesVelocity, setNodesVelocity] = useState<Coordinates[]>([]);
  const [graphViewWidth, setGraphViewWidth] = useState<number>(0);
  const [champEdges, setChampEdges] = useState<Record<number, string>[]>([]);
  const [hoveredChampion, setHoveredChampion] = useState<number>(-1);

  // 노드를 움직이는 애니메이션 함수
  const moveAnywhere = useCallback(() => {
    setChampNodesCoords((prevCoords) => {
      if (nodesVelocity.length === 0) return prevCoords;

      return prevCoords.map((coord, idx) => {
        let nextX = coord.x + nodesVelocity[idx].x;
        let nextY = coord.y + nodesVelocity[idx].y;
        const graphView = graphViewRef.current;
        if (graphView) {
          const nodeSize = 80;
          const padding = 10;
          const minX = padding;
          const maxX = graphView.offsetWidth - nodeSize - padding;
          const minY = padding;
          const maxY = graphView.offsetHeight - nodeSize - padding;
          if (nextX < minX || nextX > maxX) {
            nextX = coord.x - nodesVelocity[idx].x;
          }
          if (nextY < minY || nextY > maxY) {
            nextY = coord.y - nodesVelocity[idx].y;
          }
        }
        return { x: nextX, y: nextY };
      });
    });
  }, [nodesVelocity]);

  // 주기적으로 속도 바꾸는 함수
  const changeVelocity = useCallback(() => {
    setNodesVelocity((prev) =>
      prev.map(() => ({ x: Math.random() * 8 - 4, y: Math.random() * 8 - 4 }))
    );
  }, []);

  // ──────────────▶  [A] 챔피언이 바뀔 때마다(= champion prop이 바뀔 때마다) “엣지 & 좌표 & 속도”를 **새로** 세팅
  useEffect(() => {
    const graphView = graphViewRef.current;
    if (!graphView) return;

    // 1) 새로 선택된 champion의 relation 정보
    const graphChamps = champ.get(champion)?.relation || {};
    const totalNodes = Object.keys(graphChamps).length + 1; // 자기 자신 + relation

    // 2) 좌표 초기화
    const initialCoords = calcCoords(totalNodes, graphView);
    setChampNodesCoords(initialCoords);

    // 3) 속도 초기화
    const initialVelocity = Array(totalNodes)
      .fill(null)
      .map(() => ({ x: Math.random() * 8 - 4, y: Math.random() * 8 - 4 }));
    setNodesVelocity(initialVelocity);

    // 4) 엣지 계산
    //   champToIdx: { [챔피언이름]: index-in-array } 꼴로 map
    const champToIdx: Record<string, number> = {};
    champToIdx[champion] = 0;
    Object.keys(graphChamps).forEach((relName, idx) => {
      champToIdx[relName] = idx + 1;
    });

    // 5) champEdges:  길이 totalNodes인 배열, 각 인덱스마다 그 챔피언(인덱스)에 연결된 관계(엣지 문자열)을 담는다.
    const newEdges: Record<number, string>[] = Object.keys(champToIdx).map(
      (champName) => {
        const rels = champ.get(champName)?.relation || {};
        const mapping: Record<number, string> = {};
        Object.entries(rels).forEach(([targetName, desc]) => {
          const idx = champToIdx[targetName];
          if (idx !== undefined) {
            mapping[idx] = desc;
          }
        });
        return mapping;
      }
    );
    setChampEdges(newEdges);

    // 6) 만약 이전에 돌리던 애니메이션 interval이 있다면 지워준다.
    if (animationIntervalRef.current) {
      clearInterval(animationIntervalRef.current);
      animationIntervalRef.current = null;
    }

    // 7) (선택된 champion이 바뀌면) 호버 상태 초기화
    setHoveredChampion(-1);
  }, [champ, champion, graphViewWidth]);

  // ──────────────▶ [B] “좌표&속도(state)가 준비되면 애니메이션을 돌린다”
  useEffect(() => {
    if (
      champNodesCoords.length > 0 &&
      nodesVelocity.length > 0 &&
      hoveredChampion === -1 &&
      !animationIntervalRef.current
    ) {
      // 속도가 (0,0)으로만 돼 있으면 무작위로 다시 채워준다
      if (nodesVelocity.every((v) => v.x === 0 && v.y === 0)) {
        setNodesVelocity((prev) =>
          prev.map(() => ({ x: Math.random() * 8 - 4, y: Math.random() * 8 - 4 }))
        );
      }
      animationIntervalRef.current = setInterval(() => {
        moveAnywhere();
        changeVelocity();
      }, 100);
    }

    // 언마운트되거나 dependency가 바뀔 때 interval 정리
    return () => {
      if (animationIntervalRef.current) {
        clearInterval(animationIntervalRef.current);
        animationIntervalRef.current = null;
      }
    };
  }, [champNodesCoords, nodesVelocity, hoveredChampion, moveAnywhere, changeVelocity]);

  // ──────────────▶ [C] 호버(마우스 엔터/리브) 시 노드 고정 처리
  const handleMouseEnter = useCallback((index: number) => {
    if (animationIntervalRef.current) {
      clearInterval(animationIntervalRef.current);
      animationIntervalRef.current = null;
    }
    setNodesVelocity((prev) => prev.map(() => ({ x: 0, y: 0 })));
    setHoveredChampion(index);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredChampion(-1);
    if (
      champNodesCoords.length > 0 &&
      nodesVelocity.length > 0 &&
      !animationIntervalRef.current
    ) {
      setNodesVelocity((prev) =>
        prev.map(() => ({ x: Math.random() * 8 - 4, y: Math.random() * 8 - 4 }))
      );
      animationIntervalRef.current = setInterval(() => {
        moveAnywhere();
        changeVelocity();
      }, 100);
    }
  }, [champNodesCoords, nodesVelocity, moveAnywhere, changeVelocity]);

  // ──────────────▶ [D] 화면 크기(리사이즈) 감지해서 graphViewWidth 상태 업데이트
  useEffect(() => {
    const graphView = graphViewRef.current;
    if (!graphView) return;

    setGraphViewWidth(graphView.offsetWidth);

    const resizeObserver = new ResizeObserver((entries) => {
      for (const ent of entries) {
        setGraphViewWidth(ent.contentRect.width);
      }
    });
    resizeObserver.observe(graphView);
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // ──────────────▶ [E] canvas에 엣지를 그리는 함수 (hoveredChampion이 바뀔 때마다 다시 그린다)
  const drawEdges = useCallback(() => {
    const graphView = graphViewRef.current;
    if (!graphView || champNodesCoords.length === 0) return null;

    const canvas = document.createElement("canvas");
    canvas.width = graphView.offsetWidth;
    canvas.height = graphView.offsetHeight;
    canvas.style.position = "absolute";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.zIndex = "-1";
    canvas.style.pointerEvents = "none";

    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const nodeSize = 80;
    const offset = nodeSize / 2;

    if (hoveredChampion !== -1 && champEdges[hoveredChampion]) {
      Object.entries(champEdges[hoveredChampion]).forEach(
        ([targetIdxStr, text]) => {
          const targetIdx = Number(targetIdxStr);
          const start = champNodesCoords[hoveredChampion];
          const end = champNodesCoords[targetIdx];
          if (!start || !end) return;

          ctx.beginPath();
          ctx.moveTo(start.x + offset, start.y + offset);
          ctx.lineTo(end.x + offset, end.y + offset);
          ctx.strokeStyle = "rgba(255,255,255,0.5)";
          ctx.lineWidth = 2;
          ctx.stroke();

          // 엣지 라벨(관계 설명)
          ctx.font = "12px Arial";
          const textWidth = ctx.measureText(text).width;
          const padding = 4;
          const cx = end.x + offset;
          const cy = end.y + offset - 42;
          ctx.fillStyle = "rgba(0,0,0,0.7)";
          ctx.fillRect(cx - textWidth / 2 - padding, cy - 24, textWidth + padding * 2, 20);
          ctx.fillStyle = "white";
          ctx.textAlign = "center";
          ctx.fillText(text, cx, cy - 10);
        }
      );
    }

    return canvas;
  }, [champEdges, champNodesCoords, hoveredChampion]);

  // ──────────────▶ [F] drawEdges가 바뀔 때마다(hoveredChampion or champEdges or coords 변경 시) 캔버스 업데이트
  useEffect(() => {
    const graphView = graphViewRef.current;
    const canvas = drawEdges();
    if (canvas && graphView) {
      const old = graphView.querySelector("canvas");
      if (old) old.remove();
      graphView.appendChild(canvas);
    }
  }, [drawEdges]);

  return (
    <div ref={graphViewRef} className={realGraphView}>
      {/* 인덱스 0번: 선택된 챔피언 자신 */}
      <ChampNode
        index={0}
        ref={champNodeRef}
        champ={champ}
        champion={champion}
        nodeCoords={champNodesCoords[0]}
        onMouseEnter={() => handleMouseEnter(0)}
        onMouseLeave={handleMouseLeave}
      />

      {/* 그 외: relation으로 연결된 챔피언들 */}
      {Object.keys(champ.get(champion)?.relation || {}).map(
        (relChampName, idx) => (
          <ChampNode
            key={idx + 1}
            index={idx + 1}
            ref={champNodeRef}
            champ={champ}
            champion={relChampName}
            nodeCoords={champNodesCoords[idx + 1]}
            onMouseEnter={() => handleMouseEnter(idx + 1)}
            onMouseLeave={handleMouseLeave}
          />
        )
      )}
    </div>
  );
}
