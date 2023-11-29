import React from 'react';
import './App.css';
import ForceGraph from './ForceGraph';
import {data} from './DataFile';

const App = () => {
  return (
    <div className="App">
  
      <ForceGraph data={data}/>
    </div>
  );
};

export default App;
