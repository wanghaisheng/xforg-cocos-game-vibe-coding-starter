// prefab_csv2md.js
// 用于将Prefab结构CSV描述自动转换为Markdown结构树文档
// 用法：node prefab_csv2md.js input.csv output.md

const fs = require('fs');
const path = require('path');
const parse = require('csv-parse/lib/sync');

function buildTree(rows) {
  const nodeMap = {};
  let root = null;
  // 先创建所有节点对象
  for (const row of rows) {
    nodeMap[row['节点名']] = { ...row, children: [] };
  }
  // 构建树结构
  for (const row of rows) {
    const node = nodeMap[row['节点名']];
    if (row['父节点']) {
      nodeMap[row['父节点']].children.push(node);
    } else {
      root = node;
    }
  }
  return root;
}

function printTree(node, indent = '') {
  let line = `${indent}- **${node['节点名']}** (${node['类型']}`;
  if (node['组件']) line += `, 组件: ${node['组件']}`;
  if (node['资源']) line += `, 资源: ${node['资源']}`;
  if (node['属性']) line += `, 属性: ${node['属性']}`;
  line += ')';
  if (node['备注']) line += ` // ${node['备注']}`;
  let result = line + '\n';
  for (const child of node.children) {
    result += printTree(child, indent + '  ');
  }
  return result;
}

function main() {
  const [,, inputFile, outputFile] = process.argv;
  if (!inputFile || !outputFile) {
    console.log('用法: node prefab_csv2md.js input.csv output.md');
    process.exit(1);
  }
  const csvContent = fs.readFileSync(inputFile, 'utf-8');
  const records = parse(csvContent, { columns: true, skip_empty_lines: true });
  const root = buildTree(records);
  let md = `# Prefab结构树\n\n`;
  md += printTree(root);
  fs.writeFileSync(outputFile, md, 'utf-8');
  console.log('已生成:', outputFile);
}

if (require.main === module) {
  main();
} 