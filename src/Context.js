import { createContext, useContext, useState } from "react";

export const ResultContext = createContext(1);

export default function Context({children}) {
    const [sideMenu, setSideMenu] = useState(1);

    const value = {
        sideMenu,
        setSideMenu
    };

    return <ResultContext.Provider value={value}>{children}</ResultContext.Provider>
}

export function useResultContext() {
    return useContext(ResultContext);
}