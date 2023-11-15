// import React, { useEffect, useRef } from 'react';
// import ForceGraph3D from 'react-force-graph-3d'; // Import the library
// import * as d3 from 'd3'; // Import D3.js

// const ForceGraph = () => {
//   const graphRef = useRef(null);

// //   useEffect(() => {
// //     const graphData = {
// //       nodes: [{ id: 'Node 1' }, { id: 'Node 2' }],
// //       links: [{ source: 'Node 1', target: 'Node 2' }],
// //     };
// useEffect(() => {
//     const graphData = {
//       nodes: [{ id: 'Node 1' }, { id: 'Node 2' }],
//       links: [{ source: 'Node 1', target: 'Node 2' }],
//     };

//     // <ForceGraph3D graphData={graphData}/>

//     // Use ForceGraph3D as a function
//     // const fg = ForceGraph3D(); 
//     // fg(graphRef.current)
//     //   .graphData(graphData)
//     //   .onNodeClick((node) => {
//     //     console.log('Node clicked:', node);
//     //   });

//     return () => {
//     //   fg.pauseAnimation();
//     <ForceGraph3D graphData={graphData}/>
//     };
//   }, []);

//   return <div ref={graphRef} />;
// };

// export default ForceGraph;



import React, { useRef } from 'react';
import ForceGraph3D from 'react-force-graph-3d'; // Import the library
import * as THREE from 'three';

const ForceGraph = ({data}) => {
  const graphRef = useRef(null);

//   const graphData = {
//     nodes: [{ id: 'Node 1' }, { id: 'Node 2' }, { id: 'Node 3' }, { id: 'Node 4' }],
//     links: [{ source: 'Node 1', target: 'Node 2' }, { source: 'Node 1', target: 'Node 4' }, { source: 'Node 3', target: 'Node 4' }, { source: 'Node 2', target: 'Node 3' }],
//   };

// const graphData = {
//     nodes: [
//       { id: 'Node 1', x: 0, y: 0, z: 0 },
//       { id: 'Node 2', x: 10, y: 0, z: 0 },
//       { id: 'Node 3', x: 0, y: 10, z: 0 },
//       { id: 'Node 4', x: 10, y: 10, z: 0 },
//       { id: 'Node 5', x: 20, y: 0, z: 0 }, // Additional node
//       { id: 'Node 6', x: 0, y: 20, z: 0 }, // Additional node
//       // Add more nodes as needed
//     ],
//     links: [
//       { source: 'Node 1', target: 'Node 2' },
//       { source: 'Node 1', target: 'Node 4' },
//       { source: 'Node 3', target: 'Node 4' },
//       { source: 'Node 2', target: 'Node 3' },
//       { source: 'Node 5', target: 'Node 6' }, 
      
//     ],
//   };
  

  return (
    <div ref={graphRef}>
      <ForceGraph3D
        graphData={data}
        // You can add additional props and configurations here
        nodeAutoColorBy="id" 
        nodeLabel="name"
        linkCurvature={0.25}
        nodeThreeObject={node => {
          // You can use this function to further customize the nodes if needed
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
      // nodeThreeObject={node => {
      //   // Use a group to position both the sphere and label
      //   const obj = new THREE.Group();
        
      //   // Add a sphere (you can customize this)
      //   const sphereGeometry = new THREE.SphereGeometry(5);
      //   const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      //   const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
      //   obj.add(sphere);

      //   // Add label sprite
      //   const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(createLabel(node.name)) }));
      //   sprite.scale.set(100, 50, 1);
      //   obj.add(sprite);

      //   return obj;
      // }}

      // linkThreeObjectExtend={true}
      // linkThreeObject={link => {
      //   // Customize link rendering here
      //   const lineGeometry = new THREE.BufferGeometry();
      //   lineGeometry.setAttribute(
      //     'position',
      //     new THREE.Float32BufferAttribute([0, 0, 0, 0, 0, 0], 3)
      //   );

      //   const lineMaterial = new THREE.LineBasicMaterial({ color: 0x0000ff });
      //   const line = new THREE.Line(lineGeometry, lineMaterial);

      //   return line;
      // }}

        // linkOpacity={d => d.opacity}
       // For example, auto-color nodes by id
        // onNodeClick={(node) => {
        //   console.log('Node clicked:', node);
        // }}
      />
    </div>
  );
};

function createLabel(name) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  context.font = '20px Arial';
  context.fillStyle = 'white';
  context.fillText(name, 10, 25);
  return canvas;
}

export default ForceGraph;
