import bs from "browser-sync";
import esbuild from "esbuild";
import fs from "fs";
import path from "path";

// VARIABLES
// ======================================================================================
const dist = process.env.DIST_DIR;
const events = ["change", "rename"];
const src = "src";
const transformFiles = [".js", ".jsx", ".css"];
const url = process.env.URL;

// INITIALIZATION
// ======================================================================================

if (process.env.MODE === "production") {
  buildFiles();
} else {
  bs.init({ proxy: url });
  watchFiles();
}

// FUNCTIONS
// ======================================================================================

export function buildFiles() {
  console.log(`Building files in ${src}...`);
  // Ensure the destination directory exists
  if (!fs.existsSync(dist)) fs.mkdirSync(dist, { recursive: true });
  // Build the source directory
  fs.readdirSync(src, { recursive: true }).forEach((file) => {
    const isFile = !!path.extname(file);
    const distPath = path.join(dist, file);
    if (!isFile) {
      if (fs.existsSync(distPath)) return;
      fs.mkdirSync(distPath, { recursive: true });
    } else {
      copyOrTransform(file);
    }
  });
}

function watchFiles() {
  console.log(`Watching for changes in ${src}...`);
  // Ensure the destination directory exists
  if (!fs.existsSync(dist)) fs.mkdirSync(dist, { recursive: true });
  // Watch the source directory for changes
  fs.watch(src, { recursive: true }, changeHandler);
}

async function changeHandler(eventType, filename) {
  if (!events.includes(eventType)) return;
  await copyOrTransform(filename);
}

async function copyOrTransform(filename) {
  console.log(`Copying or transforming ${filename}...`);
  const fileType = path.extname(filename);
  const sourceFilePath = path.join(src, filename);
  const destinationFilePath = path.join(dist, filename);

  if (!fileType) {
    // if its a folder
    if (fs.existsSync(destinationFilePath)) return;
    fs.mkdirSync(destinationFilePath, { recursive: true });
  } else {
    try {
      if (filename !== "style.css" && transformFiles.includes(fileType)) {
        await transformFile(sourceFilePath, destinationFilePath);
      } else {
        await copyFile(sourceFilePath, destinationFilePath);
      }
    } catch (error) {
      console.error(error);
    }
  }
}

async function copyFile(source, target) {
  const sourceStream = fs.createReadStream(source);
  const targetStream = fs.createWriteStream(target);
  sourceStream.pipe(targetStream);
  sourceStream.on("end", () => console.log(`Copied: ${source} to ${target}`));
  sourceStream.on("error", (err) => console.error(`Error copying: ${err}`));
}

async function transformFile(source, target) {
  const options = {
    entryPoints: [source], // Input file path
    bundle: true, // Bundle all dependencies into one file
    outfile: target, // Output file path
    loader: { ".js": "jsx" },
  };
  if (process.env.MODE === "development") options.sourcemap = true;
  if (process.env.MODE === "production") options.minify = true;
  try {
    await esbuild.build(options);
    console.log(`Transformed ${source} to ${target}`);
  } catch (error) {
    console.error("Error transforming file:", error);
  }
}
