import { Handle, Position } from "reactflow";
import { useState } from "react";
import AddNodePopup from "../popup/unitPopup";
import "./node.css";


export default function OrgNode({ data }) {


  return (
    <>
      <div className={`org-node ${data.active ? "active" : ""}`}>
        <div className="status">● ACTIVE</div>

        <div className="content">
          <img src="https://i.pravatar.cc/40" alt="" />
          <div>
            <div className="title">{data.title}</div>
            <div className="subtitle">{data.subtitle}</div>
          </div>
        </div>

        <button className="add-btn" onClick={() => data.onAddClick?.()}>
          +
        </button>

        <Handle type="target" position={Position.Top} />
        <Handle type="source" position={Position.Bottom} />
      </div>

    
    </>
  );
}
