import { createContext } from "react";
import { useState } from "react";

const GameStateContext = createContext();

export default GameStateContext;

export const GameStateProvider = ({ children }) => {

  const [search, setSearch] = useState("");
  const [currentItemSize, setItemSize] = useState(""); // Initial size value
  const [currentLinkSize, setLinkSize] = useState(""); // Initial size value


return (
    <GameStateContext.Provider value={{ 
        search,
        setSearch,
        currentItemSize,
        setItemSize,
        currentLinkSize,
        setLinkSize
         }}>

        {children}
    </GameStateContext.Provider>
)
}

