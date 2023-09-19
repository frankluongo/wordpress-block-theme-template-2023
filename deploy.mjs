import archiver from "archiver";
import fs from "fs";
import { buildFiles } from "./build.mjs";
const dist = process.env.DIST_DIR;
buildFiles();
// Create a write stream for the output ZIP file
const output = fs.createWriteStream(`${process.env.THEME}.zip`);
// Create a new archiver instance
const archive = archiver("zip", { zlib: { level: 9 } });
// Pipe the output to the archive
archive.pipe(output);
// Add the entire folder and its contents to the archive
archive.directory(dist, false);
// Finalize the archive and handle errors
archive.finalize();
// Event handler for when the archive is finalized
archive.on("finish", () => {
  console.log("Folder has been zipped successfully.");
});
// Event handler for archive errors
archive.on("error", (err) => {
  console.error("Error creating archive:", err);
});
