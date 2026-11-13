const fs = require('fs');
const path = require('path');

const scriptTags = `
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script src="miras-store.js"></script>
<script src="miras-supabase.js"></script>
`;

// 1. Inject script tags in all HTML files right before </body>
const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));

htmlFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  // Check if scripts already present
  if (!content.includes('miras-supabase.js')) {
    if (content.includes('</body>')) {
      content = content.replace('</body>', `${scriptTags}\n</body>`);
      fs.writeFileSync(file, content, 'utf8');
      console.log(`[Script Injected] ${file}`);
    } else {
      content += scriptTags;
      fs.writeFileSync(file, content, 'utf8');
      console.log(`[Script Appended] ${file}`);
    }
  }
});

console.log('✅ Universal Supabase scripts injected in all 27 HTML files.');
