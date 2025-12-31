
import React, { useEffect } from "react";
import {useParams} from 'react-router-dom';
import ReactFlow, {
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
} from "reactflow";
import "reactflow/dist/style.css";
import { useReactFlow } from "reactflow";
import OrgNode from "./nodes/OrgNode";
import GroupNode from "./nodes/GroupNode";
import { getOrgStructureData } from "../../api";
import { mapOrgUnitsToFlow } from "../../data/mapOrgUnitsToFlow";
import { getLayoutedElements } from "../../data/autoLayout";

const nodeTypes = {
  org: OrgNode,
  group: GroupNode,
};

function OrgChartFlow() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { fitView, getZoom, setCenter, getViewport } = useReactFlow();
  const { projectCode  } = useParams();

  useEffect(() => {
    getOrgStructureData(projectCode)
      .then((res) => {
        const { nodes: rawNodes, edges: rawEdges } = mapOrgUnitsToFlow(res.data);
        const layouted = getLayoutedElements(rawNodes, rawEdges);
        
        setNodes(layouted.nodes);
        setEdges(layouted.edges);

        setTimeout(() => {
          const rootNode = layouted.nodes.find(n => 
            res.data.some(item => item.OrganizationUnitId === n.id && item.ParentUnitId === null)
          );

          if (rootNode) {
            // Get viewport dimensions
            const viewport = getViewport();
            const windowHeight = window.innerHeight;
            
            // Position root at 20% from top instead of center
            const offsetY = windowHeight * -0.30; // 20% from top
            
            setCenter(
              rootNode.position.x + 110, // center of node (nodeWidth/2)
              rootNode.position.y + 45 - offsetY, // center of node (nodeHeight/2) minus offset
              {
                zoom: 1.1,
                duration: 800,
              }
            );
          } else {
            fitView({
              padding: 0.15,
              includeHiddenNodes: false,
              minZoom: 0.2,
              maxZoom: 1,
              duration: 200,
            });
          }
        }, 100);
      })
      .catch((err) => {
        console.error("Failed to load org structure", err);
      });
  }, [setNodes, setEdges, fitView, setCenter, getViewport]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      nodesConnectable={false}
      panOnScroll={true}
      panOnDrag={true}
    >
      <Background />
      <Controls />
    </ReactFlow>
  );
}

export default function OrgChartCanvas() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <button className="floating-btn-role">Add Role</button>
      <button className="floating-btn">Add User</button>

      <ReactFlowProvider>
        <OrgChartFlow />
      </ReactFlowProvider>
    </div>
  );
}