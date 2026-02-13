const fs = require('fs');
const path = require('path');

/**
 * Script to automatically fix simple duplicate className issues
 * Handles: duplicate exact class names, duplicate padding/margin classes
 */

const srcDir = path.join(__dirname, '../src');
let filesModified = 0;
let totalFixes = 0;

function fixDuplicateClasses(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  let newContent = content;
  let modified = false;
  let fixes = 0;
  
  // Fix duplicate exact class names
  const classNameRegex = /className\s*=\s*["`]([^"`]+)["`]/g;
  newContent = newContent.replace(classNameRegex, (match, classes) => {
    const classList = classes.split(/\s+/).filter(Boolean);
    const uniqueClasses = [...new Set(classList)];
    
    if (classList.length !== uniqueClasses.length) {
      modified = true;
      fixes++;
      return match.replace(classes, uniqueClasses.join(' '));
    }
    return match;
  });
  
  // Fix multiple conflicting rounded classes (keep last one if they conflict)
  newContent = newContent.replace(classNameRegex, (match, classes) => {
    const classList = classes.split(/\s+/).filter(Boolean);
    const roundedClasses = classList.filter(c => c.match(/^rounded-[a-z]+(?:-[a-z]+)?$/));
    
    // Check if there are conflicting rounded classes (rounded-2xl and rounded-xl)
    if (roundedClasses.length > 1) {
      // Check if they're actually conflicting (not rounded-tr, rounded-tl, etc.)
      const generalRounded = roundedClasses.filter(c => 
        c === 'rounded' || c.match(/^rounded-[0-9]/) || c.match(/^rounded-(sm|md|lg|xl|2xl|3xl|full|none)$/)
      );
      
      if (generalRounded.length > 1) {
        // Keep the last one (usually the intended one)
        const lastRounded = generalRounded[generalRounded.length - 1];
        const otherRounded = generalRounded.slice(0, -1);
        let newClasses = classList.filter(c => !otherRounded.includes(c)).join(' ');
        modified = true;
        fixes++;
        return match.replace(classes, newClasses);
      }
    }
    return match;
  });
  
  if (modified) {
    fs.writeFileSync(filePath, newContent, 'utf-8');
    filesModified++;
    totalFixes += fixes;
    console.log(`✓ Fixed ${fixes} issue(s) in: ${path.relative(srcDir, filePath)}`);
  }
}

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      if (!['node_modules', '.next', 'out', '.git'].includes(file)) {
        processDirectory(filePath);
      }
    } else if (stat.isFile() && /\.(jsx?|tsx?)$/.test(file)) {
      fixDuplicateClasses(filePath);
    }
  });
}

console.log('🔍 Fixing duplicate className issues...\n');
processDirectory(srcDir);

console.log('\n' + '='.repeat(50));
console.log(`✨ Complete! Modified ${filesModified} files`);
console.log(`📊 Total fixes: ${totalFixes}`);
console.log('='.repeat(50));

if (filesModified === 0) {
  console.log('\n✓ No duplicate className issues found!');
} else {
  console.log('\n⚠️  Note: Some complex cases may still need manual review.');
  console.log('💡 Run check-duplicate-classnames.js to see remaining issues.');
}
