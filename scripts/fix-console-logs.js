const fs = require('fs');
const path = require('path');

// Function to recursively find all JS/JSX files
function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const filePath = path.join(dirPath, file);
    if (fs.statSync(filePath).isDirectory()) {
      if (!filePath.includes('node_modules') && !filePath.includes('.next')) {
        arrayOfFiles = getAllFiles(filePath, arrayOfFiles);
      }
    } else if (file.match(/\.(js|jsx)$/)) {
      arrayOfFiles.push(filePath);
    }
  });

  return arrayOfFiles;
}

// Function to remove console statements
function removeConsoleLogs(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // Remove console.log statements
  const newContent = content
    .replace(/^\s*console\.log\([^;]*\);?\s*$/gm, '')
    .replace(/\s*console\.log\([^;]*\);?\s*/g, '')
    // Keep console.error in development mode
    .replace(/^\s*console\.error\([^;]*\);?\s*$/gm, (match) => {
      if (!match.includes('process.env.NODE_ENV')) {
        return `if (process.env.NODE_ENV === 'development') { ${match.trim()} }`;
      }
      return match;
    })
    // Keep console.warn in development mode
    .replace(/^\s*console\.warn\([^;]*\);?\s*$/gm, (match) => {
      if (!match.includes('process.env.NODE_ENV')) {
        return `if (process.env.NODE_ENV === 'development') { ${match.trim()} }`;
      }
      return match;
    })
    // Remove commented console logs
    .replace(/\/\/\s*console\.(log|error|warn)\([^)]*\);?\s*$/gm, '');

  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    modified = true;
  }

  return modified;
}

// Main execution
const srcPath = path.join(__dirname, '..', 'src');
const files = getAllFiles(srcPath);

let modifiedCount = 0;
files.forEach((file) => {
  if (removeConsoleLogs(file)) {
    modifiedCount++;
    console.log(`Fixed: ${file}`);
  }
});

console.log(`\nTotal files modified: ${modifiedCount}`);
