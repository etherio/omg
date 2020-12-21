const fs = require("fs");
const path = require("path");
const readline = require("readline");
const pkg = require("../package.json");

const io = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let [major, minor, patch] = pkg.version.split(".");
let updated = `${major}.${minor}.${parseInt(patch) + 1}`;
let question = `Do you want to save change as version ${pkg.version} to ${updated}? (y/N): `;

io.question(question, (answer) => {
  answer = answer && ["y", "yes"].includes(answer.toLowerCase()) ? true : false;
  if (!answer) return io.close();
  pkg.version = updated;
  let pkgPath = path.resolve(__dirname, "../package.json");
  let pkgContent = JSON.stringify(pkg);

  fs.writeFile(pkgPath, pkgContent, "utf-8", () => {
    io.close();
  });
});
