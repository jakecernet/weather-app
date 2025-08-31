import { useState, useCallback } from "react";

export function useLocalStorage(key, initialValue) {
    // Lazy init
    const [value, setValue] = useState(() => {
        try {
            const raw = localStorage.getItem(key);
            return raw !== null ? JSON.parse(raw) : initialValue;
        } catch {
            return initialValue;
        }
    });

    const set = useCallback(
        (v) => {
            setValue((prev) => {
                const next = typeof v === "function" ? v(prev) : v;
                try {
                    localStorage.setItem(key, JSON.stringify(next));
                } catch {}
                return next;
            });
        },
        [key]
    );

    return [value, set];
}
