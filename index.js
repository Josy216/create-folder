#!/usr/bin/env node
import fs from "fs";
import path from "path";

const root = process.cwd();

/* SAFETY: allow only empty, .git, .gitignore */
const allowed = [".git", ".gitignore"];
const filesInRoot = fs.readdirSync(root);
const unsafe = filesInRoot.filter((f) => !allowed.includes(f));

if (unsafe.length > 4) {
  console.log(
    "❌ This folder is not empty. Create a new project folder and run create-folder there."
  );
  process.exit(1);
}

const folders = [
  "backend",
  "backend/routes",
  "backend/controllers",
  "backend/models",
  "backend/middleware",
  "backend/utils",
  "backend/config",
  "client",
];

const files = [
  {
    path: "backend/index.js",
    content: `
const port = process.env.PORT || 5000;
console.log(\` Server is running on http://localhost:\${port}\`);
console.log("✨ Happy coding — Jocode");
`,
  },
  {
    path: "backend/controllers/user.js",
    content: "// Write your register & login logic here\n",
  },
  {
    path: "backend/middleware/auth.js",
    content: "// Write your API shield / token verification here\n",
  },
  {
    path: "backend/models/schema.js",
    content: "// Design your database schemas here\n",
  },
  {
    path: "backend/routes/route.js",
    content: "// Collect and organize all your API endpoints here\n",
  },
  {
    path: "backend/config/db.js",
    content: "// Write your database connection logic here\n",
  },

  {
    path: "backend/.env",
    content: "PORT=5000\nDB_HOST=\nDB_USER=\nDB_PASS=\nDB_NAME=\n",
  },
  { path: "backend/.gitignore", content: "node_modules\n.env\n" },

  { path: "client/.env", content: "VITE_API_KEY=\n" },
  { path: "client/.gitignore", content: "node_modules\n.env\n" },

  {
    path: "client/README.md",
    content: `
# Frontend Setup

Recommended packages:

npm install react-router-dom axios react-icons

Why:
- react-router-dom → page routing
- axios → HTTP requests
- react-icons → UI icons
`,
  },
];

folders.forEach((dir) =>
  fs.mkdirSync(path.join(root, dir), { recursive: true })
);

files.forEach((file) => {
  const full = path.join(root, file.path);
  if (!fs.existsSync(full)) fs.writeFileSync(full, file.content.trimStart());
});
