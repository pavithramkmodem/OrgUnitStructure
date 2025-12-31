import React, { useCallback,useEffect } from "react";
import ReactFlow, {
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  addEdge
} from "reactflow";
import "reactflow/dist/style.css";
import OrgNode from "./nodes/OrgNode";
import GroupNode from "./nodes/GroupNode";
import { getOrgStructureData } from "../../api";
import { mapOrgUnitsToFlow } from "../../data/mapOrgUnitsToFlow";
import { getLayoutedElements } from "../../data/autoLayout";

const nodeTypes = {
  org: OrgNode,
  group: GroupNode
};

export default function OrgChartCanvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

useEffect(() => {
    const projectCode ="7C52CD07-2EAD-4A6B-9A0C-231523147C95";

    getOrgStructureData(projectCode)
      .then((res) => {
        const { nodes, edges } = mapOrgUnitsToFlow(res.data);
         const layouted = getLayoutedElements(nodes, edges);
        setNodes(layouted.nodes);
        setEdges(layouted.edges);
      })
      .catch((err) => {
        console.error("Failed to load org structure", err);
      });
  }, []);
  // const addNode = () => {
  //   const id = `new-${Date.now()}`;
  //   setNodes((nds) => [
  //     ...nds,
  //     {
  //       id,
  //       type: "org",
  //       position: { x: 400, y: 600 },
  //       data: { title: "New User", subtitle: "Role" }
  //     }
  //   ]);
  // };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <button className="floating-btn-role" >
         Add Role
      </button>
        <button className="floating-btn" >
         Add User
      </button>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodesConnectable={false}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}