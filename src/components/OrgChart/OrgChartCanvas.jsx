import React, { useCallback,useState,useMemo} from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge
} from "reactflow";
import "reactflow/dist/style.css";
import AddNodePopup from "./popup/UnitPopup.jsx";
import OrgNode from "./nodes/OrgNode";
import GroupNode from "./nodes/GroupNode";
import { nodesData, edgesData } from "../../data/orgData";

const nodeTypes = {
  org: OrgNode,
  group: GroupNode
};

export default function OrgChartCanvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState(
  nodesData.map((node) => ({
    ...node,
    data: {
      ...node.data,
      popupType: node.id === "root" ? "orgUnit" : "role"
    }
  }))
);

  const [edges, setEdges, onEdgesChange] = useEdgesState(edgesData);
  const [selectedNode, setSelectedNode] = useState(null);
    const [showPopuptype, setShowPopuptype] = useState(null);

     // 🔥 Inject popup handler into node data
  const enhancedNodes = useMemo(() => {
  return nodes.map((node) => ({
    ...node,
    data: {
      ...node.data,
      onAddClick: () => {
        setSelectedNode(node);
        setShowPopuptype(node.data.popupType);
      }
    }
  }));
}, [nodes]);



  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      
      <ReactFlow
        nodes={enhancedNodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
       nodesConnectable = {false}
        fitView
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
      {showPopuptype && (
        <AddNodePopup
        type = {showPopuptype}
          onClose={() => setShowPopuptype(null)}
        />
      )}
    </div>
      
  );
}
