

import React, { useRef } from 'react';
import ForceGraph3D from 'react-force-graph-3d'; // Import the library

const ForceGraph = ({data}) => {
  const graphRef = useRef(null);

  const assignClusters = (node) => node.cluster || 0; // Default to 0 if no cluster is assigned
  // const assignSize = (node) => node.size
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

  // const getAssignSize = () => {
    // const d = [
    //   {"id":1,"label":"3r tau","x":-0.3882,"y":0.4599,"cluster":3,"weights":{"Occurrences":22},"scores":{"Avg. pub. year":2008.1818}},
    //     {"id":2,"label":"3xtg","x":-0.3863,"y":-0.3828,"cluster":1,"weights":{"Occurrences":20},"scores":{"Avg. pub. year":2012.75}},
    //     {"id":3,"label":"3xtg ad","x":-0.3648,"y":-0.3976,"cluster":1,"weights":{"Occurrences":89},"scores":{"Avg. pub. year":2011.3371}},
    //     {"id":4,"label":"3xtg ad mouse","x":-0.3762,"y":-0.4143,"cluster":1,"weights":{"Occurrences":137},"scores":{"Avg. pub. year":2011.6934}},
    //     {"id":5,"label":"3xtg ad mouse model","x":-0.3816,"y":-0.4312,"cluster":1,"weights":{"Occurrences":22},"scores":{"Avg. pub. year":2012.2727}},
    //     {"id":6,"label":"3xtg mouse","x":-0.3869,"y":-0.3776,"cluster":1,"weights":{"Occurrences":22},"scores":{"Avg. pub. year":2012.4545}},
    //     {"id":7,"label":"3xtgad","x":-0.3384,"y":-0.4329,"cluster":1,"weights":{"Occurrences":19},"scores":{"Avg. pub. year":2011.5263}},
    //     {"id":8,"label":"3xtgad mouse","x":-0.3407,"y":-0.433,"cluster":1,"weights":{"Occurrences":36},"scores":{"Avg. pub. year":2011.5833}},
    //     {"id":9,"label":"4r tau","x":-0.2299,"y":0.5363,"cluster":3,"weights":{"Occurrences":28},"scores":{"Avg. pub. year":2007.1786}},
    //     {"id":10,"label":"a68","x":-0.8401,"y":0.5106,"cluster":4,"weights":{"Occurrences":19},"scores":{"Avg. pub. year":1991.7368}},
    //     {"id":11,"label":"aberrant accumulation","x":-0.6376,"y":-0.0818,"cluster":1,"weights":{"Occurrences":10},"scores":{"Avg. pub. year":2010}},{"id":12,"label":"aberrant phosphorylation","x":-0.8765,"y":-0.0679,"cluster":1,"weights":{"Occurrences":19},"scores":{"Avg. pub. year":2005.4737}},
    //     {"id":13,"label":"aberrant tau phosphorylation","x":-0.6678,"y":-0.2444,"cluster":1,"weights":{"Occurrences":13},"scores":{"Avg. pub. year":2006.9231}}
    // ]
    // return d.map(node => node.weights.Occurrences)
  // }
  return (
    <div ref={graphRef}>
      <ForceGraph3D
        graphData={data}
        // nodeAutoColorBy="id" 

        nodeAutoColorBy={(node) => assignClusters(node)} // Automatically color nodes based on clusters
      nodeColor={(node) => getClusterColor(assignClusters(node))}
      // nodeRelSize={10}
      nodeVal={node => node.size}
        nodeLabel="name"
        linkWidth={node => node.strength}
        // linkAutoColorBy={'#ffff00'}
        // linkColor={'#ffff00'}
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
