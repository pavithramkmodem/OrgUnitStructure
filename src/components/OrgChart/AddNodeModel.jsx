export default function AddNodeModal({ onClose, onCreate }) {
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>Add Node</h3>

        <button onClick={() => onCreate("org")}>➕ Role</button>
        <button onClick={() => onCreate("group")}>📦 Group</button>

        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}
