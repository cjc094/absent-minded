'use client';

import React, { useCallback, useState } from 'react';
import ReactFlow, {
  Background,
  Controls,
  Node,
  Edge,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  Connection,
} from 'reactflow';
import 'reactflow/dist/style.css';

let idCounter = 1;

export default function Flow() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  // 拖曳節點時
  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  // 邊更新時
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  // 新增連線時
  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
    []
  );

  // 右鍵刪除節點
  const onNodeContextMenu = useCallback(
    (event: React.MouseEvent, node: Node) => {
      event.preventDefault();
      setNodes((nds) => nds.filter((n) => n.id !== node.id));
      setEdges((eds) => eds.filter((e) => e.source !== node.id && e.target !== node.id));
    },
    []
  );

  // 按按鈕新增節點（隨機位置）
  const handleAddNode = () => {
    const x = Math.random() * 400 + 100;
    const y = Math.random() * 300 + 100;

    const newNode: Node = {
      id: `${idCounter++}`,
      data: { label: `節點 ${idCounter - 1}` },
      position: { x, y },
      type: 'default',
    };

    setNodes((nds) => [...nds, newNode]);
  };

  return (
    <div>
      <button
        onClick={handleAddNode}
        className="m-2 px-4 py-2 bg-gray-300 text-gray-800 rounded border border-gray-400 cursor-pointer"
      >
        新增節點
      </button>

      <div className="w-full h-[600px]">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeContextMenu={onNodeContextMenu}
          fitView
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
}