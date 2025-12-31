export const nodesData = [
  {
    id: "root",
    type: "org",
    position: { x: 600, y: 40 },
    data: { title: "Organization Unit", subtitle: "Root", }
  },

  { id: "n1", type: "org", position: { x: 150, y: 185 }, data: { title: "Thomas Martin", subtitle: "Staff Officer" } },
  { id: "n2", type: "org", position: { x: 450, y: 185 }, data: { title: "Thomas Martin", subtitle: "Staff Officer" } },
  { id: "n3", type: "org", position: { x: 750, y: 185 }, data: { title: "Thomas Martin", subtitle: "Staff Officer",} },
  { id: "n4", type: "org", position: { x: 1050, y: 185 }, data: { title: "Thomas Martin", subtitle: "Staff Officer" } },

  {
    id: "group1",
    type: "group",
    position: { x: 180, y: 320 },
    style: { width: 900, height: 230 },
    data: { label: "Group Name" }
  },

  { id: "g1", type: "org", parentNode: "group1", extent: "parent", position: { x: 20, y: 60 }, data: { title: "Thomas Martin", subtitle: "Staff Officer" } },
  { id: "g2", type: "org", parentNode: "group1", extent: "parent", position: { x: 270, y: 60 }, data: { title: "Thomas Martin", subtitle: "Staff Officer" } },
  { id: "g3", type: "org", parentNode: "group1", extent: "parent", position: { x: 540, y: 60 }, data: { title: "Thomas Martin", subtitle: "Staff Officer" } }
];

export const edgesData = [
  { id: "e1", source: "root", target: "n1", type: "smoothstep" },
  { id: "e2", source: "root", target: "n2", type: "smoothstep" },
  { id: "e3", source: "root", target: "n3", type: "smoothstep" },
  { id: "e4", source: "root", target: "n4", type: "smoothstep" },
  { id: "e5", source: "n3", target: "group1", type: "smoothstep" }
];
