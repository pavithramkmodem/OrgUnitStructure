export default function RoleMapping() {
  return (
    <>
      <h3>Role Mapping</h3>

      <div className="role-header">
        <select>
          <option>None selected</option>
        </select>

        <input placeholder="Search..." />
      </div>

      <table>
        <thead>
          <tr>
            <th>Select</th>
            <th>Role Name</th>
            <th>Role Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><input type="checkbox" /></td>
            <td>Asset Admin</td>
            <td>Asset Admin Role</td>
          </tr>
        </tbody>
      </table>

      <button className="save-btn">Save</button>
    </>
  );
}
