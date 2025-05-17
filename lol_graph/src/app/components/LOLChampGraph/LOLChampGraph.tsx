"use client";

// import { getChampions } from "@/app/api/data/route";
import { useEffect, useState, MouseEvent } from "react";
import ChampSelection from "./ChampSelection/ChampSelection";
import GraphView from "./GraphView/GraphView";
import { lolChampGraph } from "./LOLChampGraph.css";

interface ChampionRelation {
    [key: string]: string;
}

interface ChampionData {
    image: string;
    relation: ChampionRelation;
}

interface ChampionMap {
    [key: string]: ChampionData;
}

function objectToMap(obj: ChampionMap | null): Map<string, ChampionData> {
    if (!obj) return new Map();

    const map = new Map<string, ChampionData>();
    Object.entries(obj).forEach(([key, value]) => {
        map.set(key, value);
    });
    return map;
}

export default function LOLChampGraph() {
    const [champData, setChampData] = useState<Map<string, ChampionData>>(
        new Map()
    );
    const [isLoading, setIsLoading] = useState(true);
    const [champion, setChampion] = useState("");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("/api/data");
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                const json = await res.json();
                const champMap = objectToMap(json);
                setChampData(champMap);
            } catch (error) {
                console.error("데이터 로딩 중 오류 발생:", error);
            } finally {
                setIsLoading(false);
            }
        };

        setMounted(true);
        fetchData();
    }, []);

    const clickHandler = (event: MouseEvent<HTMLDivElement>) => {
        const value = event.currentTarget.textContent || "";
        setChampion(value);
    };

    // 클라이언트 사이드에서만 렌더링
    if (!mounted) {
        return null;
    }

    // 로딩 중이거나 데이터가 없을 때는 빈 컨테이너만 렌더링
    if (isLoading || champData.size === 0) {
        return <div className={lolChampGraph} />;
    }

    return (
        <div className={lolChampGraph}>
            <ChampSelection champ={champData} clickHandler={clickHandler} />
            <GraphView champion={champion} />
        </div>
    );
}
