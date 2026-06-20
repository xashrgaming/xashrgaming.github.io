const fs = require("fs");
const path = require("path");
const Filter = require("bad-words");

const filter = new Filter();

function scan(dir) {
  for (const entry of fs.readdirSync(dir)) {
    if (entry === ".git" || entry === "node_modules") continue;

    const full = path.join(dir, entry);
    const stat = fs.statSync(full);

    if (stat.isDirectory()) {
      scan(full);
    } else {
      const text = fs.readFileSync(full, "utf8");

      if (filter.isProfane(text)) {
        console.error(`Profanity detected in ${full}`);
        process.exit(1);
      }
    }
  }
}

scan(".");
console.log("Content check passed");
