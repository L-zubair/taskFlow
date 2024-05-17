
import React, { useState } from 'react';
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  ReactFlowProvider,
} from 'react-flow-renderer';
import CustomNode from './CustomNode';
import './App.css';

const nodeTypes = {
  custom: CustomNode,
};

const Home = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [nodeId, setNodeId] = useState(1);

  const handleAddNode = () => {
    const newNode = {
      id: `${nodeId}`,
      type: 'custom',
      data: { label: `Node ${nodeId}`, id: `${nodeId}`, deleteNode: handleDeleteNode },
      position: { x: Math.random() * 250, y: Math.random() * 250 },
    };
    setNodes((nds) => [...nds, newNode]);
    setNodeId((id) => id + 1);
  };

  const handleConnect = (params) => setEdges((eds) => addEdge(params, eds));

  const handleDeleteNode = (nodeIdToDelete) => {
    setNodes((nds) => nds.filter((node) => node.id !== nodeIdToDelete));
    setEdges((eds) => eds.filter((edge) => edge.source !== nodeIdToDelete && edge.target !== nodeIdToDelete));
  };

  const handleDeleteEdge = (edgeIdToDelete) => {
    setEdges((eds) => eds.filter((edge) => edge.id !== edgeIdToDelete));
  };

  const handleNodeDragStop = (event, node) => {
    const updatedNodes = nodes.map((n) => {
      if (n.id === node.id) {
        return {
          ...n,
          position: { x: node.position.x, y: node.position.y },
        };
      }
      return n;
    });
    setNodes(updatedNodes);
  };

  return (
    <div className="home-container">
      <div className="controls">
        <button onClick={handleAddNode}>Create node</button>
      </div>
      <div className="flow-container">
        <ReactFlowProvider>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onConnect={handleConnect}
            onElementsRemove={(elements) => {
              elements.forEach((element) => {
                if (element.id.startsWith('e')) {
                  handleDeleteEdge(element.id);
                } else {
                  handleDeleteNode(element.id);
                }
              });
            }}
            onNodeDragStop={handleNodeDragStop}
            nodeTypes={nodeTypes}
          >
            <MiniMap />
            <Controls />
            <Background />
          </ReactFlow>
        </ReactFlowProvider>
      </div>
    </div>
  );
};

export default Home;
