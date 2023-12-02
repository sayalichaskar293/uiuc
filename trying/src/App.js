import React from 'react';
import './App.css';
import ForceGraph from './ForceGraph';
import Sidebar from './Sidebar';
import {data} from './DataFile';
import { GameStateProvider } from "./Context/useContext";

const App = () => {
  return (
    <div className="App">
  <GameStateProvider>
        <Sidebar/>
        <ForceGraph data={data}/>
  </GameStateProvider>
    </div>
  );
};

export default App;
