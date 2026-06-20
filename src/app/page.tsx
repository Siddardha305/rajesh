import fs from "fs";
import path from "path";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import PortfolioGrid, { Project } from "@/components/PortfolioGrid";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";

function getProjects(): Project[] {
  const publicDir = path.join(process.cwd(), "public");
  const myWorksDir = path.join(publicDir, "My works");
  const projects: Project[] = [];
  let id = 1;

  if (!fs.existsSync(myWorksDir)) {
    return projects;
  }

  // Recursive read function
  const readDir = (dirPath: string, relativePath: string = "My works") => {
    const files = fs.readdirSync(dirPath, { withFileTypes: true });

    for (const file of files) {
      const fileRelativePath = path.join(relativePath, file.name).replace(/\\/g, "/");
      const fullPath = path.join(dirPath, file.name);

      if (file.isDirectory()) {
        readDir(fullPath, fileRelativePath);
      } else {
        const ext = path.extname(file.name).toLowerCase();
        if (ext === ".jpg" || ext === ".jpeg" || ext === ".png" || ext === ".webp") {
          // Skip avatar.jpg as it is the profile avatar source
          if (file.name.toLowerCase() === "avatar.jpg") continue;

          // Determine category
          let category = "branding";
          const lowerName = file.name.toLowerCase();
          const lowerPath = fileRelativePath.toLowerCase();

          if (
            lowerPath.includes("poster") ||
            lowerName.includes("gabbar") ||
            lowerName.includes("pushpa") ||
            lowerName.includes("thandel") ||
            lowerName.includes("game changer") ||
            lowerName.includes("hari hara") ||
            lowerName.includes("hit 3") ||
            lowerName.includes("khaleja") ||
            lowerName.includes("ustad") ||
            lowerName.includes("svsc") ||
            lowerName.includes("gopichand")
          ) {
            category = "posters";
          } else if (
            lowerName.includes("thumbnail") ||
            lowerName.includes("kingdom") ||
            lowerName.includes("court") ||
            lowerName.includes("riya") ||
            lowerName.includes("3bhk") ||
            lowerName.includes("image_1") ||
            lowerName.includes("irumudi")
          ) {
            category = "thumbnails";
          } else if (lowerPath.includes("love story") || lowerPath.includes("wedding")) {
            category = "branding";
          }

          // Format clean title
          let cleanTitle = path.basename(file.name, ext);
          // Remove trailing details
          cleanTitle = cleanTitle.replace(/final/gi, "").replace(/copy/gi, "").trim();
          // Capitalize first letters
          cleanTitle = cleanTitle
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
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
  return projects;
}

export default function Home() {
  const projects = getProjects();

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <PortfolioGrid projects={projects} />
        <Experience />
        <Contact />
      </main>
    </>
  );
}
