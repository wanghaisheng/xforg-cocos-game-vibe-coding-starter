const fs = require('fs');
const uuidMap = JSON.parse(fs.readFileSync('uuid_map.json', 'utf-8'));
let prefab = fs.readFileSync(process.argv[2], 'utf-8');
for (const [name, uuid] of Object.entries(uuidMap)) {
  prefab = prefab.replace(new RegExp(name, 'g'), uuid);
}
fs.writeFileSync(process.argv[2], prefab, 'utf-8');
console.log('UUID 替换完成'); 