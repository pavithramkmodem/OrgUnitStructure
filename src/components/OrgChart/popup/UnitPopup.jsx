
import OrganizationMap from "../popup/OrganizationMap";
import RoleMapping from "../popup/RoleMapping";
import "../nodes/node.css";

export default function AddNodePopup({ type, onClose }) {
  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <button className="close-btn" onClick={onClose}>cancel</button>

        {type === "orgunit" && <OrganizationMap />}
        {type === "role" && <RoleMapping />}
      </div>
    </div>
  );
}

