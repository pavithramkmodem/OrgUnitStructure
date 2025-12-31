export function buildTree(data, nodes = [], edges = [], parent = null) {
  if (data.type === "group") {
    nodes.push({
      id: data.id,
      type: "groupNode",
      data: { label: data.label },
      position: { x: 0, y: 0 },
      style: { width: 700, height: 260 }
    });
    data.children.forEach(c =>
      buildTree(c, nodes, edges, data.id)
    );
    return { nodes, edges };
  }

  nodes.push({
    id: data.id,
    type: "orgNode",
    parentNode: parent || undefined,
    extent: parent ? "parent" : undefined,
    data,
    position: { x: 0, y: 0 }
  });

  if (parent && data.type !== "group") {
    edges.push({
      id: `${parent}-${data.id}`,
      source: parent,
      target: data.id,
      type: "smoothstep"
    });
  }

  data.children?.forEach(c =>
    buildTree(c, nodes, edges, data.id)
  );

  return { nodes, edges };
}
