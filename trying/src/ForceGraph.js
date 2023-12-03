import React, { useRef,useState } from 'react';
import ForceGraph3D from 'react-force-graph-3d'; // Import the library
import  GameStateContext  from "./Context/useContext";
import { useContext,useEffect } from "react";


const ForceGraph = ({data}) => {

  const {
    search,
        setSearch,
        currentItemSize,
        setItemSize,
        currentLinkSize,
        setLinkSize,
        curvedLinks, 
        setCurvedLinks
  } = useContext(GameStateContext);

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

  const defaultColors2 = {};
  data.links.forEach((link) => {
  const sourceCluster = assignClusters(link.source);
  const sourceColor = getClusterColor(sourceCluster);
  
  defaultColors2[`${link.source.id}-${link.target.id}`] = sourceColor;
});

const [linkColor, setLinkColor] = useState(() => {
  const defaultColors2 = {};
  data.links.forEach((link) => {
    const sourceCluster = assignClusters(link.source);
    const sourceColor = getClusterColor(sourceCluster);
    defaultColors2[`${link.source.id}-${link.target.id}`] = sourceColor;
    // You might need to adjust this based on your data structure
  });
  return defaultColors2;
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
  
      const updatedColors = {};
      const updatedLinkColors = { ...linkColor }; // Create a copy of current link colors
  
      data.nodes.forEach((n) => {
        if (n.id === node.id || linkedNodeIds.includes(n.id)) {
          updatedColors[n.id] = getClusterColor(assignClusters(n));
        } else {
          updatedColors[n.id] = 'rgba(200, 200, 200, 0.5)';
        }
      });
  
      data.links.forEach((link) => {
        const sourceId = link.source.id;
        const targetId = link.target.id;
        const linkId = `${sourceId}-${targetId}`;

        if (linkedNodeIds.includes(sourceId) && linkedNodeIds.includes(targetId)) {
          updatedLinkColors[linkId] = getClusterColor(assignClusters(link.source));
        } else {
          updatedLinkColors[linkId] = 'rgba(200, 200, 200, 0.5)';
        }
      });
  
      setNodeColor(updatedColors);
      setLinkColor(updatedLinkColors);
    } else {
      setNodeColor(defaultColors1);
      setLinkColor(defaultColors2);
    }
  };
  
  
  // const handleSearch = (search) => {
  //   const searchLower = search.toLowerCase(); 
  //   const matchingNode = data.nodes.find(
  //     (node) => node.name.toLowerCase() === searchLower
  //   );  
  //   if (matchingNode) {
  //     handleNodeHover(matchingNode);
  //   } else {
  //     // Handle case when no matching node is found
  //     // You can set default behavior here if needed
  //   }
  // };
  useEffect(() => {
    console.log(search);
    if (search) {
      const searchLower = search.toLowerCase();
      const matchingNode = data.nodes.find(
        (node) => node.name.toLowerCase() === searchLower
      );
      if (matchingNode) {
        handleNodeHover(matchingNode);
      } else {
        // Handle case when no matching node is found
        // You can set default behavior here if needed
      }
    }
  }, [search]);


  return (
    <div ref={graphRef}>
      
      {/* <input
        type="text"
        placeholder="Search by label..."
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
      /> */}

      <ForceGraph3D
        graphData={data}

      nodeAutoColorBy={(node) => assignClusters(node)} 
      
      nodeColor={(node) => nodeColor[node.id]}
      
        nodeLabel="name"
        linkCurvature={curvedLinks ? 0.25 : 0} 
        nodeVal={(node) => node.size || 7}
        linkWidth={(node)=>node.strength}
        linkColor={(link) => {
          const sourceNode = link.source;
          return sourceNode ? getClusterColor(assignClusters(sourceNode)) : 'grey';
        }}
        // linkColor={(link) => linkColor[`${link.source.id}-${link.target.id}`]}
        

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