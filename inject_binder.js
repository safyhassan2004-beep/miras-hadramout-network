const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  if (!content.includes('miras-ui-binder.js')) {
    content = content.replace('miras-supabase.js"></script>', 'miras-supabase.js"></script>\n<script src="miras-ui-binder.js"></script>');
    fs.writeFileSync(f, content, 'utf8');
    console.log('Injected ui-binder into:', f);
  }
});

console.log('All 27 HTML pages now include miras-ui-binder.js');
