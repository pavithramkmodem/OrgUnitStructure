import { Handle, Position } from "reactflow";
import "./node.css";

export default function GroupNode({ data }) {
  return (
    <div className="group-node">
      <div className="group-title">{data.label}</div>
      <Handle type="target" position={Position.Top} />
    </div>
  );
}
