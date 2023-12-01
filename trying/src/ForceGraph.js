import React, { useRef,useState } from 'react';
import ForceGraph3D from 'react-force-graph-3d'; // Import the library
import * as d3 from 'd3';
import * as THREE from 'three';


const ForceGraph = ({data}) => {
  const graphRef = useRef(null);
  const [hoveredNode, setHoveredNode] =useState(null);
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
  

  const assignClusters = (node) => {
   
    if (!node || node.cluster === undefined || node.cluster === null) {
     
      return 0; 
    }
    return node.cluster;
  };
  const defaultColors1 = {};
  data.nodes.forEach((node) => {
    defaultColors1[node.id] = getClusterColor(assignClusters(node));
  });
    

  const [nodeColor, setNodeColor] = useState(() => {
    const defaultColors = {};
    data.nodes.forEach((node) => {
      defaultColors[node.id] = getClusterColor(assignClusters(node));
    });
    return defaultColors;
  });

  

  const handleNodeHover = (node) => {
    if (node) {
      setHoveredNode(node);
      const linkedNodeIds = data.links
      .filter((link) => link.source.id === node.id || link.target.id === node.id)
      .flatMap((link) => [link.source.id, link.target.id]);
  console.log(linkedNodeIds)
      const updatedColors = {};
      data.nodes.forEach((n) => {
        if (n.id === node.id || linkedNodeIds.includes(n.id)) {
          updatedColors[n.id] = getClusterColor(assignClusters(n));
        } else {
          updatedColors[n.id] = 'rgba(200, 200, 200, 2)';
        }
      });
  
      setNodeColor(updatedColors);
    } else {
      setNodeColor(defaultColors1); // Reset colors to their initial state
    }
  };
  
  

  return (
    <div ref={graphRef}>
      <ForceGraph3D
        graphData={data}

      nodeAutoColorBy={(node) => assignClusters(node)} 
      
      nodeColor={(node) => nodeColor[node.id]}
      
        nodeLabel="name"
        linkCurvature={0.25}
        nodeVal={(node) => node.size || 7}
        linkWidth={(node)=>node.strength}
        linkColor={(link) => {
          const sourceNode = link.source;
          return sourceNode ? getClusterColor(assignClusters(sourceNode)) : 'rgba(200, 200, 200, 2)';
        }}
        

        onNodeHover={handleNodeHover}
          
        

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
      {hoveredNode && (
        <div style={{ position: 'absolute', bottom: 0, background: 'white', padding: '10px', display: 'flex' }}>
          <p style={{ marginRight: '10px' }}>ID: {hoveredNode.id}</p>
          <p style={{ marginRight: '10px' }}>Name: {hoveredNode.name}</p>
          <p style={{ marginRight: '10px' }}>Cluster: {hoveredNode.cluster}</p>
          <p>Total link Strength: {hoveredNode.size}</p>
        </div>
      )}
    </div>
  );
};


export default ForceGraph;