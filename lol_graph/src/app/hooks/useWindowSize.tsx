import { useEffect, useState } from "react";

type WindowSize = { width?: number };

export default function useWindowSize(): WindowSize {
    const [windowSize, setWindowSize] = useState<WindowSize>({
        width: undefined,
    });

    useEffect(() => {
        // 클라이언트 사이드에서만 실행
        if (typeof window === "undefined") return;

        const handleResize = () => {
            setWindowSize({ width: window.innerWidth });
        };

        // 초기값 설정
        handleResize();

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowSize;
}
