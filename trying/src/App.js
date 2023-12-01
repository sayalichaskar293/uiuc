import React from 'react';
import './App.css';
import ForceGraph from './ForceGraph';
import Sidebar from './Sidebar';
import {data} from './DataFile';

const App = () => {
  return (
    <div className="App">
  
  <Sidebar/>
        <ForceGraph data={data}/>
    </div>
  );
};

export default App;
