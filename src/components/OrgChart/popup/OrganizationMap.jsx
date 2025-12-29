  const  OrganizationMap =() =>{
  return (
    <>
      <h3>Add Organization Unit</h3>

      <label>Organization Unit Name *</label>
      <input placeholder="Enter Organization Unit Name" />

      <label>Organization Unit Description *</label>
      <textarea
        placeholder="Enter Organization Unit Description (Max 2500 Chars)"
      />

      <button className="save-btn">Save</button>
    </>
  );
}
export default OrganizationMap;

  
