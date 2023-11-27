

import React, { useRef } from 'react';
import ForceGraph3D from 'react-force-graph-3d'; // Import the library
import * as d3 from 'd3';

const ForceGraph = ({data}) => {
  const graphRef = useRef(null);

  const assignClusters = (node) => node.cluster || 0; // Default to 0 if no cluster is assigned

  // Define a function to map clusters to colors
  const getClusterColor = (cluster) => {
    const colorMap = {
         
      1: '#00FF00',  
      2: '#0000FF',   
      3: '#FFFF00',
      4: '#FF0000',
      5: '#FFFFFF',
      6: '#800080',


    }
    return colorMap[cluster] || 'gray'; // Default to gray for unknown clusters
  };;

  return (
    <div ref={graphRef}>
      <ForceGraph3D
        graphData={data}
        // nodeAutoColorBy="id" 

        nodeAutoColorBy={(node) => assignClusters(node)} // Automatically color nodes based on clusters
      nodeColor={(node) => getClusterColor(assignClusters(node))}
      // nodeRelSize={(node) => node.size}
        nodeLabel="name"
        linkCurvature={0.25}
        nodeThreeObject={node => {
        
        }}

        nodeCanvasObject={(node, ctx, globalScale) => {
        const label = node.name;
        const fontSize = 12 / globalScale;

        ctx.font = `${fontSize}px Sans-Serif`;
        const textWidth = ctx.measureText(label).width;
        const textHeight = fontSize;

        const scaleFactor = 0.1; // Adjust as needed
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'; // White with transparency
        ctx.fillRect(
          node.x - textWidth / 2 * scaleFactor,
          node.y - textHeight / 2 * scaleFactor,
          textWidth * scaleFactor,
          textHeight * scaleFactor
        );

        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = 'black'; // Adjust text color as needed
        ctx.fillText(label, node.x, node.y);
      }}
     
      />
    </div>
  );
};


export default ForceGraph;
