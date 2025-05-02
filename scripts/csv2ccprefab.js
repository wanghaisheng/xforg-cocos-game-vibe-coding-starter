const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');

// 类型映射
const typeMap = {
  'Node': 'cc.Node',
  'Sprite': 'cc.Node',
  'Label': 'cc.Node',
  'Button': 'cc.Node',
};
const componentTypeMap = {
  'Sprite': 'cc.Sprite',
  'Label': 'cc.Label',
  'Button': 'cc.Button',
  // 可扩展自定义脚本
};

let idCounter = 1;
function genId() { return idCounter++; }

function buildTree(rows) {
  const nodes = {};
  let root = null;
  for (const row of rows) {
    const [name, parent, type, component, resource, attr, remark] = row;
    nodes[name] = {
      __type__: typeMap[type] || type,
      _name: name,
      _children: [],
      _components: [],
      _lpos: { x: 0, y: 0, z: 0 },
      _lscale: { x: 1, y: 1, z: 1 },
      _active: true,
      _layer: 0,
      _id: genId(),
      _parent: parent || null,
      _attr: attr ? JSON.parse(attr) : {},
      _component: component,
      _resource: resource,
      _remark: remark
    };
  }
  for (const name in nodes) {
    const node = nodes[name];
    if (node._parent && nodes[node._parent]) {
      nodes[node._parent]._children.push(node);
    } else if (!node._parent) {
      root = node;
    }
  }
  return root;
}

function flattenTree(node, nodeList = [], compList = []) {
  if (node._attr.x !== undefined) node._lpos.x = node._attr.x;
  if (node._attr.y !== undefined) node._lpos.y = node._attr.y;
  if (node._attr.visible !== undefined) node._active = node._attr.visible;
  // 组件
  if (node._component) {
    const compType = componentTypeMap[node._component] || node._component;
    const comp = {
      __type__: compType,
      node: { __id__: node._id }
    };
    if (compType === 'cc.Sprite' && node._resource) {
      comp._spriteFrame = node._resource; // UUID替换后处理
    }
    if (compType === 'cc.Label' && node._attr.fontSize) {
      comp._fontSize = node._attr.fontSize;
    }
    compList.push(comp);
    node._components.push(compList.length + 100); // 组件id占位
  }
  nodeList.push(node);
  for (const child of node._children) {
    flattenTree(child, nodeList, compList);
  }
  return { nodeList, compList };
}

function main(csvPath, outPath) {
  const csvContent = fs.readFileSync(csvPath, 'utf-8');
  const records = parse(csvContent, { skip_empty_lines: true });
  const rows = records.slice(1);
  const root = buildTree(rows);
  const { nodeList, compList } = flattenTree(root);
  const prefab = [
    {
      "__type__": "cc.Prefab",
      "_name": root._name,
      "data": { "__id__": root._id }
    },
    ...nodeList.map(n => ({
      "__type__": n.__type__,
      "_name": n._name,
      "_children": n._children.map(c => c._id),
      "_components": n._components,
      "_lpos": n._lpos,
      "_lscale": n._lscale,
      "_layer": n._layer,
      "_active": n._active,
    })),
    ...compList
  ];
  fs.writeFileSync(outPath, JSON.stringify(prefab, null, 2), 'utf-8');
  console.log(`Prefab JSON written to ${outPath}`);
}

if (require.main === module) {
  const [,, csvPath, outPath] = process.argv;
  if (!csvPath || !outPath) {
    console.log('用法: node csv2ccprefab.js <input.csv> <output.prefab.json>');
    process.exit(1);
  }
  main(csvPath, outPath);
} 