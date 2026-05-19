const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const root = path.resolve(__dirname, "..");
const distDir = path.join(root, "dist");

fs.rmSync(distDir, { recursive: true, force: true });

const result = spawnSync(
  process.execPath,
  [path.join(root, "node_modules", "vite", "bin", "vite.js"), "build"],
  {
    cwd: root,
    stdio: "inherit",
    env: {
      ...process.env,
      LEONINCS_STATIC_BUILD: "1",
    },
  },
);

if (result.status !== 0) {
  process.exit(result.status || 1);
}

const indexHtml = path.join(distDir, "index.html");
for (const route of ["about", "gallery", "contact"]) {
  fs.copyFileSync(indexHtml, path.join(distDir, route));
}

console.log("Static LeoninCS clone built in dist/");
