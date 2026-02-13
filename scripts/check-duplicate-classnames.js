const fs = require('fs');
const path = require('path');

/**
 * Script to find and report duplicate className instances in JSX files
 * These need manual review as automated fixes might break styling
 */

const srcDir = path.join(__dirname, '../src');
const issues = [];

function checkForDuplicateClasses(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  
  lines.forEach((line, lineNumber) => {
    // Check for multiple rounded- classes (common issue)
    const roundedMatches = line.match(/rounded-\w+/g);
    if (roundedMatches && roundedMatches.length > 1) {
      issues.push({
        file: path.relative(srcDir, filePath),
        line: lineNumber + 1,
        type: 'Multiple rounded- classes',
        content: line.trim(),
        classes: roundedMatches
      });
    }
    
    // Check for duplicate exact class names in same className
    const classNameMatch = line.match(/className\s*=\s*["`]([^"`]+)["`]/);
    if (classNameMatch) {
      const classes = classNameMatch[1].split(/\s+/).filter(Boolean);
      const duplicates = classes.filter((item, index) => classes.indexOf(item) !== index);
      if (duplicates.length > 0) {
        issues.push({
          file: path.relative(srcDir, filePath),
          line: lineNumber + 1,
          type: 'Duplicate class names',
          content: line.trim(),
          classes: [...new Set(duplicates)]
        });
      }
    }
    
    // Check for multiple padding/margin classes
    const paddingMatches = line.match(/p[trblxy]?-\d+/g);
    if (paddingMatches && paddingMatches.length > 1) {
      const uniquePadding = [...new Set(paddingMatches)];
      if (paddingMatches.length !== uniquePadding.length) {
        issues.push({
          file: path.relative(srcDir, filePath),
          line: lineNumber + 1,
          type: 'Duplicate padding classes',
          content: line.trim(),
          classes: paddingMatches
        });
      }
    }
  });
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
      checkForDuplicateClasses(filePath);
    }
  });
}

console.log('🔍 Checking for duplicate className issues...\n');
processDirectory(srcDir);

if (issues.length === 0) {
  console.log('✓ No duplicate className issues found!');
} else {
  console.log(`Found ${issues.length} potential className issues:\n`);
  console.log('='.repeat(80));
  
  // Group by file
  const byFile = {};
  issues.forEach(issue => {
    if (!byFile[issue.file]) {
      byFile[issue.file] = [];
    }
    byFile[issue.file].push(issue);
  });
  
  Object.entries(byFile).forEach(([file, fileIssues]) => {
    console.log(`\n📄 ${file} (${fileIssues.length} issues)`);
    fileIssues.forEach(issue => {
      console.log(`  Line ${issue.line}: ${issue.type}`);
      console.log(`  Classes: ${issue.classes.join(', ')}`);
      console.log(`  Code: ${issue.content.substring(0, 100)}...`);
    });
  });
  
  console.log('\n' + '='.repeat(80));
  console.log('\n⚠️  These issues require manual review:');
  console.log('   - Multiple rounded- classes may conflict');
  console.log('   - Duplicate class names should be deduplicated');
  console.log('   - Check Tailwind CSS specificity rules');
}
