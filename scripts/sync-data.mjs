import fs from "node:fs";
import path from "node:path";
const root = path.resolve(import.meta.dirname, "..");
const data = JSON.parse(
  fs.readFileSync(path.join(root, "data/literacies.json"), "utf8"),
);
fs.writeFileSync(
  path.join(root, "data/literacies.js"),
  "window.LITERACIES = " + JSON.stringify(data) + ";\n",
);
console.log("Dados sincronizados.");
