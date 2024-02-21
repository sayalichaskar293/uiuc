import React from 'react';
import './App.css';
import ForceGraph from './ForceGraph';
import Sidebar from './Sidebar';
import {data} from './datafile2';
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
