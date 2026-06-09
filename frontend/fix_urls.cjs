const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else {
            results.push(file);
        }
    });
    return results;
}

const files = walk('e:/PROYECTOS CON SERVER/Finesi_Web_Server/Finesi_Web_Server/root/ferreatiplano-main/frontend/src');

let count = 0;
files.forEach(file => {
    if (file.endsWith('.js') || file.endsWith('.jsx')) {
        let content = fs.readFileSync(file, 'utf8');
        if (content.includes('http://localhost:4000/api')) {
            content = content.replace(/'http:\/\/localhost:4000\/api([^']*)'/g, '`${import.meta.env.VITE_API_URL || "http://localhost:4000/api"}$1`');
            content = content.replace(/`http:\/\/localhost:4000\/api([^`]*)`/g, '`${import.meta.env.VITE_API_URL || "http://localhost:4000/api"}$1`');
            
            fs.writeFileSync(file, content);
            count++;
            console.log("Updated: " + file);
        }
    }
});
console.log("Total files updated: " + count);
