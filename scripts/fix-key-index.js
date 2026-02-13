const fs = require('fs');
const path = require('path');

/**
 * Script to fix key={index} anti-pattern in React components
 * Replaces with unique keys based on item properties or generated IDs
 */

const srcDir = path.join(__dirname, '../src');
let filesModified = 0;
let totalReplacements = 0;

// Common patterns for finding better key alternatives
const keyPatterns = [
  // Pattern 1: item?.id or item.id
  { pattern: /\.map\(\((\w+),\s*index\)\s*=>/g, hasId: true },
  // Pattern 2: Array with objects
  { pattern: /\.map\(\((\w+),\s*index\)\s*=>/g, hasSlug: true }
];

function findBetterKey(fileContent, lineNumber, itemName) {
  // Try to find if item has id, slug, or other unique identifier
  const lines = fileContent.split('\n');
  const contextLines = lines.slice(Math.max(0, lineNumber - 10), Math.min(lines.length, lineNumber + 10));
  const context = contextLines.join('\n');
  
  // Check for common unique identifiers
  if (context.includes(`${itemName}?.id`) || context.includes(`${itemName}.id`)) {
    return `${itemName}?.id || ${itemName}.id || index`;
  }
  if (context.includes(`${itemName}?.slug`) || context.includes(`${itemName}.slug`)) {
    return `${itemName}?.slug || ${itemName}.slug || index`;
  }
  if (context.includes(`${itemName}?.name`) || context.includes(`${itemName}.name`)) {
    return `\`${itemName}-\${${itemName}?.name || index}\``;
  }
  if (context.includes(`${itemName}?.title`) || context.includes(`${itemName}.title`)) {
    return `\`${itemName}-\${${itemName}?.title || index}\``;
  }
  
  // Fallback: generate unique key combining item property and index
  return `\`${itemName}-\${index}\``;
}

function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  let modified = false;
  let replacements = 0;
  
  // Find all instances of key={index}
  const keyIndexPattern = /key=\{index\}/g;
  
  if (!keyIndexPattern.test(content)) {
    return; // No key={index} found
  }
  
  let newContent = content;
  
  // Find the context for each key={index}
  lines.forEach((line, lineNumber) => {
    if (line.includes('key={index}')) {
      // Look backwards to find the .map function
      let mapLine = '';
      let itemName = 'item';
      
      for (let i = lineNumber; i >= Math.max(0, lineNumber - 20); i--) {
        const currentLine = lines[i];
        if (currentLine.includes('.map((')) {
          mapLine = currentLine;
          // Extract item name from .map((itemName, index) =>
          const match = currentLine.match(/\.map\(\((\w+),\s*index\)/);
          if (match) {
            itemName = match[1];
          }
          break;
        }
      }
      
      // Determine better key
      const betterKey = findBetterKey(content, lineNumber, itemName);
      
      // Only replace if we found a better alternative
      if (betterKey !== 'index') {
        // Create a unique replacement for this specific instance
        const lineContext = lines.slice(Math.max(0, lineNumber - 2), lineNumber + 1).join('\n');
        const oldString = lineContext.includes('key={index}') ? lineContext : line;
        
        if (betterKey.startsWith('`')) {
          // Template literal key
          newContent = newContent.replace('key={index}', `key={${betterKey}}`);
        } else {
          // Regular key
          newContent = newContent.replace('key={index}', `key={${betterKey}}`);
        }
        
        modified = true;
        replacements++;
      }
    }
  });
  
  if (modified) {
    fs.writeFileSync(filePath, newContent, 'utf-8');
    filesModified++;
    totalReplacements += replacements;
    console.log(`✓ Fixed ${replacements} key(s) in: ${path.relative(srcDir, filePath)}`);
  }
}

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // Skip node_modules and other non-source directories
      if (!['node_modules', '.next', 'out', '.git'].includes(file)) {
        processDirectory(filePath);
      }
    } else if (stat.isFile() && /\.(jsx?|tsx?)$/.test(file)) {
      processFile(filePath);
    }
  });
}

console.log('🔍 Searching for key={index} patterns...\n');
processDirectory(srcDir);

console.log('\n' + '='.repeat(50));
console.log(`✨ Complete! Modified ${filesModified} files`);
console.log(`📊 Total replacements: ${totalReplacements}`);
console.log('='.repeat(50));

if (filesModified === 0) {
  console.log('\n✓ No key={index} patterns found!');
} else {
  console.log('\n⚠️  Please review the changes and test thoroughly.');
  console.log('💡 Some keys may need manual refinement for optimal uniqueness.');
}
