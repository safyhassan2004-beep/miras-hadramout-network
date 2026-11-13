const fs = require('fs');
const path = require('path');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

console.log(`Checking ${files.length} HTML files for integrity and broken links...`);

let issues = 0;

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');

  // Check internal href links
  const hrefMatches = content.matchAll(/href="([^"#:]+\.html)"/g);
  for (const match of hrefMatches) {
    const target = match[1];
    if (!fs.existsSync(target)) {
      console.error(`[ERROR] In ${file}: link to "${target}" does not exist!`);
      issues++;
    }
  }

  // Check script tags
  const openScripts = (content.match(/<script/g) || []).length;
  const closeScripts = (content.match(/<\/script>/g) || []).length;
  if (openScripts !== closeScripts) {
    console.error(`[ERROR] In ${file}: mismatched <script> tags: ${openScripts} open vs ${closeScripts} close!`);
    issues++;
  }
}

if (issues === 0) {
  console.log(`✓ ALL ${files.length} HTML FILES PASSED INTEGRITY & LINK VERIFICATION! No broken internal links found.`);
} else {
  console.error(`Found ${issues} issues.`);
}

