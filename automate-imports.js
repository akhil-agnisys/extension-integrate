// automate-imports.js
// This script adds 'from Integrate import *' to the top of every .py file in the workspace (if not already present).

const fs = require('fs');
const path = require('path');

const workspaceDir = __dirname; // Uses the current directory (your extension workspace)
const importLine = \

function addImportToFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    if (!content.startsWith(importLine)) {
        fs.writeFileSync(filePath, importLine + content);
        console.log(`Added import to: ${filePath}`);
    }
}

function processDir(dir) {
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDir(fullPath);
        } else if (file.endsWith('.py')) {
            addImportToFile(fullPath);
        }
    });
}

processDir(workspaceDir);
console.log('Import automation complete.');
