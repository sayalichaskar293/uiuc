import React from 'react';
import './App.css';
import ForceGraph from './ForceGraph';
import {data} from './DataFile';

const App = () => {
  return (
    <div className="App">
      {/* <h1>3D Force Graph</h1> */}
      <ForceGraph data={data}/>
    </div>
  );
};

export default App;
