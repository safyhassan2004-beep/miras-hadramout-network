const fs = require('fs');
const path = require('path');

const projectJsonPath = 'C:/Users/TYC/.gemini/antigravity/brain/bd9eb9b4-5664-4fa3-bfde-e5f9ff7ee887/.system_generated/steps/35/output.txt';
const projectData = JSON.parse(fs.readFileSync(projectJsonPath, 'utf8'));

const outDir = path.join(__dirname, 'raw_screens');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const screens = projectData.screenInstances.filter(s => s.sourceScreen && !s.sourceAsset);

console.log(`Found ${screens.length} screens to download.`);

const apiKey = process.env.STITCH_API_KEY || "";

async function downloadAll() {
  const index = [];

  for (const s of screens) {
    const screenId = s.id;
    const label = s.label;
    const url = `https://stitch.googleapis.com/v1/projects/3212603645773559956/files/${screenId}:download`;
    
    console.log(`Downloading: ${screenId} - ${label}`);
    try {
      const resp = await fetch(url, {
        headers: {
          'X-Goog-Api-Key': apiKey
        }
      });
      const data = await resp.json();
      const html = data.dataString || data.html || '';
      
      const fileName = `${screenId}.html`;
      fs.writeFileSync(path.join(outDir, fileName), html, 'utf8');
      
      index.push({
        id: screenId,
        label: label,
        file: fileName,
        length: html.length
      });
    } catch (err) {
      console.error(`Failed downloading ${screenId}:`, err);
    }
  }

  fs.writeFileSync(path.join(outDir, 'index.json'), JSON.stringify(index, null, 2), 'utf8');
  console.log(`Downloaded all ${index.length} screens!`);
}

downloadAll();

