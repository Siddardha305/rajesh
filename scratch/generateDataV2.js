const fs = require('fs');
const path = require('path');

const absolutePublicDir = "E:/code/rajeshweb/public";
const myWorksDir = path.join(absolutePublicDir, "My works");
const outputPath = "E:/code/rajeshweb/src/data/projectsData.ts";

function getJpegSize(filePath) {
  try {
    const buffer = fs.readFileSync(filePath);
    let i = 0;
    if (buffer[i] !== 0xFF || buffer[i + 1] !== 0xD8) {
      return null;
    }
    i += 2;
    while (i < buffer.length) {
      while (buffer[i] === 0xFF) {
        i++;
      }
      const marker = buffer[i];
      i++;
      if (marker === 0xD9 || marker === 0xDA) {
        break;
      }
      const size = buffer.readUInt16BE(i);
      if (marker >= 0xC0 && marker <= 0xC3) {
        const height = buffer.readUInt16BE(i + 3);
        const width = buffer.readUInt16BE(i + 5);
        return { width, height, aspect: width / height };
      }
      i += size;
    }
  } catch(e) {}
  return null;
}

const projects = [];
let id = 1;

if (!fs.existsSync(myWorksDir)) {
  console.log("Directory does not exist:", myWorksDir);
  process.exit(1);
}

const readDir = (dirPath, relativePath = "My works") => {
  const files = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const file of files) {
    const fileRelativePath = path.join(relativePath, file.name).replace(/\\/g, "/");
    const fullPath = path.join(dirPath, file.name);

    if (file.isDirectory()) {
      readDir(fullPath, fileRelativePath);
    } else {
      const ext = path.extname(file.name).toLowerCase();
      if (ext === ".jpg" || ext === ".jpeg" || ext === ".png" || ext === ".webp") {
        if (file.name.toLowerCase() === "avatar.jpg") continue;

        let category = "branding";
        const lowerName = file.name.toLowerCase();
        const lowerPath = fileRelativePath.toLowerCase();

        const isPosterKeyword = 
          lowerName.includes("poster") ||
          lowerName.includes("gabbar") ||
          lowerName.includes("pushpa") ||
          lowerName.includes("thandel") ||
          lowerName.includes("game changer") ||
          lowerName.includes("hari hara") ||
          lowerName.includes("hit 3") ||
          lowerName.includes("khaleja") ||
          lowerName.includes("ustad") ||
          lowerName.includes("svsc") ||
          lowerName.includes("gopichand") ||
          lowerName.includes("irumudi") ||
          lowerName.includes("devara") ||
          lowerName.includes("image_1") ||
          lowerName.includes("kingdom") ||
          lowerName.includes("court") ||
          lowerName.includes("3bhk");

        // 1. Check folder name first
        if (lowerPath.includes("/thumbnails/")) {
          category = "thumbnails";
        } else if (lowerPath.includes("/wedding countdown/") || lowerPath.includes("/love story/")) {
          category = "branding";
        } else if (isPosterKeyword) {
          category = "posters";
        } else {
          // 2. Classify based on image aspect ratio for files directly in 'My works/'
          const size = getJpegSize(fullPath);
          if (size) {
            if (size.aspect >= 1.2) {
              category = "thumbnails";
            } else if (size.aspect < 0.75) {
              category = "posters";
            } else {
              category = "branding";
            }
          } else {
            // fallback
            category = "branding";
          }
        }

        let cleanTitle = path.basename(file.name, ext);
        if (cleanTitle.toLowerCase() === "image_1") {
          cleanTitle = "Devara";
        } else {
          cleanTitle = cleanTitle.replace(/final/gi, "").replace(/copy/gi, "").trim();
        }
        cleanTitle = cleanTitle
          .split(" ")
          .map((word) => word ? word.charAt(0).toUpperCase() + word.slice(1) : "")
          .join(" ");

        projects.push({
          id: id++,
          title: cleanTitle || "Graphic Creative",
          category: category,
          image: `/${fileRelativePath}`,
          description: `Professional graphic design artwork: ${cleanTitle}. Crafted with attention to detail and visual narrative.`,
          client: lowerPath.includes("love story") ? "Sree Venkateswara Creations" : "Production Client",
          year: "2024",
        });
      }
    }
  }
};

readDir(myWorksDir);

// Sort projects by category so they group together nicely (optional, but clean)
// let's keep the order or sort so thumbnails is first
projects.sort((a, b) => {
  const catOrder = { "thumbnails": 1, "posters": 2, "branding": 3 };
  return catOrder[a.category] - catOrder[b.category] || a.id - b.id;
});

// Re-assign sequential IDs
projects.forEach((p, idx) => {
  p.id = idx + 1;
});

const fileContent = `export interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  client: string;
  year: string;
}

export const projectsData: Project[] = ${JSON.stringify(projects, null, 2)};
`;

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, fileContent, 'utf-8');
console.log("Successfully generated projects data file at:", outputPath);
console.log("Total projects:", projects.length);

const summary = {};
projects.forEach(p => {
  summary[p.category] = (summary[p.category] || 0) + 1;
});
console.log("Category breakdown:", summary);
