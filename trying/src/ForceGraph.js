

import React, { useRef } from 'react';
import ForceGraph3D from 'react-force-graph-3d'; // Import the library
import * as THREE from 'three';

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
