import React, { useRef,useState } from 'react';
import ForceGraph3D from 'react-force-graph-3d'; // Import the library
import  GameStateContext  from "./Context/useContext";
import { useContext,useEffect } from "react";


const ForceGraph = ({data}) => {
  const [nodeLabel, setNodeLabel] = useState('name');
  const [permanentLabel, setPermanentLabel] = useState(null);


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
  const [searchedNode, setsearchedNode] =useState(null);

  const getClusterColor = (cluster) => {
    const colorMap = {         
      1: '#00FF00',  
      2: '#0000FF',   
      3: '#FFFF00',
      4: '#FF0000',
      5: '#FFFFFF',
      6: '#800080',
      7: '#FB2576',
      8: '#FF10F0',
      9: '#FF6700',
      10: '#9A7B4F',
      11: '#ADFF2F',
      12: '#007500',
      13: '#00F5FF',
      14: '#CEEDC7',
      15: '#F4C2C2',
      16: '#E5B80B',
      17: '#E97451',
      18: '#6f5fe0',
      19:'#ffa600',
      20:'#5G30DE',
      21:'#1E90FF',
      22: '#C6E6FB'

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
      // console.log(node)
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
      setNodeLabel(getNodeLabel(node));
      console.log(nodeLabel);
    } else {
  
      setHoveredNode(null);
      setNodeColor(defaultColors1);
      setLinkColor(defaultColors2);
      setNodeLabel('name');
    }
  };
  
  const handleNodeSearch = (node) => {
    if (node) {
    setsearchedNode(node);
  
      const updatedColors = {};
      const updatedLinkColors = { ...linkColor }; // Create a copy of current link colors
  
      data.nodes.forEach((n) => {
        updatedColors[n.id] = n.id === node.id ? getClusterColor(assignClusters(n)) : 'rgba(200, 200, 200, 0.5)';
      });
  
      data.links.forEach((link) => {
        const sourceId = link.source.id;
        const targetId = link.target.id;
        const linkId = `${sourceId}-${targetId}`;
  
        updatedLinkColors[linkId] = 'rgba(200, 200, 200, 0.5)';
      });
  
      setNodeColor(updatedColors);
      setLinkColor(updatedLinkColors);
      setNodeLabel(getNodeLabel(node));
      console.log(nodeLabel);
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
    const permanentLabels = data.nodes
      .filter((node) => node.size > 250)
      .reduce((labels, node) => {
        labels[node.id] = node.name;
        return labels;
      }, {});
      // console.log(permanentLabels)
      setPermanentLabel(
        Object.values(permanentLabels).join(', ')
      );
      console.log(permanentLabel)
  }, []);

  useEffect(() => {
    // console.log(search);
    if (search) {
      const searchLower = search.toLowerCase();
      const matchingNode = data.nodes.find(
        (node) => node.name.toLowerCase() === searchLower
      );
      if (matchingNode) {
        handleNodeSearch(matchingNode);
        // console.log(matchingNode)
        setNodeLabel(getNodeLabel(matchingNode));
      } else {
        setNodeLabel('name');
        console.log(matchingNode)
        // Handle case when no matching node is found
        // You can set default behavior here if needed
      }
    }
  }, [search]);

  const getNodeLabel = (node) => {
    if (search && node.name.toLowerCase().includes(search.toLowerCase())) {
      return node.name;
    } else {
      return permanentLabel.includes(node.name) ? node.name : 'name';
    }
  };

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
      nodeLabel={ nodeLabel || permanentLabel}

      // nodeLabel='name'
        linkCurvature={curvedLinks ? 0.25 : 0} 
        // linkColor={(link) => {
        //   const sourceNode = link.source;
        //   return sourceNode ? getClusterColor(assignClusters(sourceNode)) : 'grey';
        // }}
        linkColor={(link) => linkColor[`${link.source.id}-${link.target.id}`]}
       
        nodeVal={(node) => (currentItemSize/10)*(node.size) || 7}
        linkWidth={(node)=>(currentLinkSize/10)*(node.strength)}
        
        onBackgroundClick={() => handleNodeHover(null)}
        onNodeClick={handleNodeHover}
          
    
     
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