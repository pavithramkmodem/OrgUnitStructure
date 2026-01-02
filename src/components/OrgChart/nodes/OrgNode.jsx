
import { Handle, Position } from "reactflow";
import "./node.css";
 
const avatarByLevel = [
  // Level 0 – Root
  "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=400&h=400&fit=crop",
 
  "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=400&h=400&fit=crop",
 
  "https://api.dicebear.com/7.x/avataaars/svg?seed=dept-head",
 
  "https://api.dicebear.com/7.x/thumbs/svg?seed=employee",
 
  "https://api.dicebear.com/7.x/identicon/svg?seed=staff",
];
 
 
 
export default function OrgNode({ data }) {
  const level = data.level ?? 0;
  const avatarUrl = avatarByLevel[level] || avatarByLevel[avatarByLevel.length - 1]; // fallback
 
  const isRoot = level === 0;
 
  return (
    <div className={`org-node ${data.active ? "active" : ""} ${isRoot ? "root" : ""}`}>
      <div className="status">● ACTIVE</div>
 
      <div className="content">
        <img src={avatarUrl} alt={data.title} />
        <div>
          <div className="title">{data.title}</div>
          <div className="subtitle">{data.subtitle}</div>
        </div>
      </div>
 
      <button className="add-btn">+</button>
 
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}