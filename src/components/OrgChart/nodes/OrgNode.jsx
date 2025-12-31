// import { Handle, Position } from "reactflow";
// import "./node.css";

// export default function OrgNode({ data }) {
//   return (
//     <div className={`org-node ${data.active ? "active" : ""}`}>
//       <div className="status">● ACTIVE</div>

//       <div className="content">
//         <img src="https://i.pravatar.cc/40" alt="" />
//         <div>
//           <div className="title">{data.title}</div>
//           <div className="subtitle">{data.subtitle}</div>
//         </div>
//       </div>

//       <button className="add-btn">+</button>

//       <Handle type="target" position={Position.Top} />
//       <Handle type="source" position={Position.Bottom} />
//     </div>
//   );
// }

import { Handle, Position } from "reactflow";
import "./node.css";

// Define avatar images per level (you can replace these URLs with your own)
const avatarByLevel = [
  "https://i.pravatar.cc/150?img=68", // Level 0 - Root (e.g., CEO or company logo)
  "https://i.pravatar.cc/150?img=50", // Level 1 - Department heads
  "https://i.pravatar.cc/150?img=32", // Level 2
  "https://i.pravatar.cc/150?img=12", // Level 3
  "https://i.pravatar.cc/150?img=45", // Level 4
  "https://i.pravatar.cc/150?img=8",  // Level 5 fallback
];

// Or use real photos / icons:
// const avatarByLevel = [
//   "/images/ceo.jpg",
//   "/images/department-manager.png",
//   "/images/team-lead.svg",
//   ...
// ];

export default function OrgNode({ data }) {
  const level = data.level ?? 0;
  const avatarUrl = avatarByLevel[level] || avatarByLevel[avatarByLevel.length - 1]; // fallback

  return (
    <div className={`org-node ${data.active ? "active" : ""}`}>
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