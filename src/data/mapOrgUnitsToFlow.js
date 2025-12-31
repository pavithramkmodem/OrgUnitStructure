// export const mapOrgUnitsToFlow = (apiData) => {
//   const nodes = [];
//   const edges = [];

//   // find root
// const roots = apiData.filter(item => item.ParentUnitId === null);

// if (roots.length !== 1) {
//   console.error(" Invalid org data. Root count:", roots.length, roots);
//   return { nodes: [], edges: [] };
// }

// const root = roots[0];


//   // add root node
//   nodes.push({
//     id: root.OrganizationUnitId,
//     type: "org",
//     position: { x: 600, y: 40 },
//     data: {
//       title: root.OrganizationName,
//       subtitle: root.OrganizationDescription
//     }
//   });

//   // children positioning helpers
//   let levelMap = {};
//   levelMap[root.OrganizationUnitId] = { x: 600, y: 40 };

//   apiData.forEach((item, index) => {
//     if (item.ParentUnitId) {
//       const parentPos = levelMap[item.ParentUnitId] || { x: 600, y: 40 };

//       const x = parentPos.x + index * 250 - 300;
//       const y = parentPos.y + 140;

//       nodes.push({
//         id: item.OrganizationUnitId,
//         type: "org",
//         position: { x, y },
//         data: {
//           title: item.OrganizationName,
//           subtitle: item.OrganizationDescription
//         }
//       });

//       edges.push({
//         id: `e-${item.ParentUnitId}-${item.OrganizationUnitId}-${index}`,
//         source: item.ParentUnitId,
//         target: item.OrganizationUnitId,
//         type: "smoothstep"
//       });

//       levelMap[item.OrganizationUnitId] = { x, y };
//     }
//   });

//   return { nodes, edges };
// };
export const mapOrgUnitsToFlow = (apiData) => {
  const nodes = [];
  const edges = [];

  // Find root
  const roots = apiData.filter(item => item.ParentUnitId === null);
  if (roots.length !== 1) {
    console.error("Invalid org data. Root count:", roots.length, roots);
    return { nodes: [], edges: [] };
  }

  const root = roots[0];

  // Map to easily find item by ID
  const itemMap = {};
  apiData.forEach(item => {
    itemMap[item.OrganizationUnitId] = item;
    item.children = []; // We'll populate children for easier traversal
  });

  // Build children arrays
  apiData.forEach(item => {
    if (item.ParentUnitId !== null) {
      itemMap[item.ParentUnitId]?.children.push(item);
    }
  });

  // Assign levels using BFS
  const levelMap = {};        // position
  const nodeLevel = {};       // hierarchy level (0 = root)
  const queue = [{ item: root, level: 0 }];

  while (queue.length > 0) {
    const { item, level } = queue.shift();
    nodeLevel[item.OrganizationUnitId] = level;

    item.children.forEach(child => {
      queue.push({ item: child, level: level + 1 });
    });
  }

  // Add root node
  nodes.push({
    id: root.OrganizationUnitId,
    type: "org",
    position: { x: 600, y: 40 },
    data: {
      title: root.OrganizationName,
      subtitle: root.OrganizationDescription,
      level: 0, // root
    },
  });
  levelMap[root.OrganizationUnitId] = { x: 600, y: 40 };

  // Layout children (simple horizontal spread per parent)
  apiData.forEach((item, index) => {
    if (item.ParentUnitId) {
      const parentPos = levelMap[item.ParentUnitId] || { x: 600, y: 40 };
      const siblingIndex = itemMap[item.ParentUnitId].children.findIndex(c => c.OrganizationUnitId === item.OrganizationUnitId);

      // Spread children horizontally centered under parent
      const childCount = itemMap[item.ParentUnitId].children.length;
      const spread = Math.max(400, childCount * 200);
      const startX = parentPos.x - spread / 2;

      const x = startX + siblingIndex * (spread / (childCount - 1 || 1)) + 100;
      const y = parentPos.y + 180;

      nodes.push({
        id: item.OrganizationUnitId,
        type: "org",
        position: { x, y },
        data: {
          title: item.OrganizationName,
          subtitle: item.OrganizationDescription,
          level: nodeLevel[item.OrganizationUnitId],
        },
      });

      edges.push({
        id: `e-${item.ParentUnitId}-${item.OrganizationUnitId}`,
        source: item.ParentUnitId,
        target: item.OrganizationUnitId,
        type: "smoothstep",
      });

      levelMap[item.OrganizationUnitId] = { x, y };
    }
  });

  return { nodes, edges };
};