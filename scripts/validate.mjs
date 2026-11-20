// Validates every skills/<name>/SKILL.md and regenerates the skill index in
// README.md. Run: node scripts/validate.mjs        (writes README.md)
//              node scripts/validate.mjs --check (fails if README.md is stale)
import { readFileSync, readdirSync, writeFileSync } from "node:fs";

const START = "<!-- SKILL_INDEX_START -->";
const END = "<!-- SKILL_INDEX_END -->";
const NAME = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const errors = [];

function frontmatter(dir, text) {
  const match = text.match(/^---\n([\s\S]*?)\n---\n/);
  if (!match) {
    errors.push(`${dir}: SKILL.md must start with YAML frontmatter`);
    return {};
  }
  const fields = {};
  for (const line of match[1].split("\n")) {
    const field = line.match(/^([a-z-]+):\s*(.*)$/);
    if (field) fields[field[1]] = field[2];
  }
  return fields;
}

const skills = readdirSync("skills", { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort((a, b) => (a === "purrkey" ? -1 : b === "purrkey" ? 1 : a.localeCompare(b)))
  .map((dir) => {
    const text = readFileSync(`skills/${dir}/SKILL.md`, "utf8");
    const { name, description } = frontmatter(dir, text);
    if (name !== dir) errors.push(`${dir}: name "${name}" must match the folder`);
    if (!NAME.test(dir) || dir.length > 64) errors.push(`${dir}: use lowercase words joined by hyphens, max 64 characters`);
    if (!description || description.length > 1024) errors.push(`${dir}: description is required, max 1024 characters`);
    if (dir !== "purrkey" && !text.includes("../purrkey/SKILL.md")) errors.push(`${dir}: link the purrkey skill under "Before you start"`);
    if (/atx_[A-Za-z0-9]/.test(text)) errors.push(`${dir}: contains what looks like an API key`);
    return { dir, description: description ?? "" };
  });

const summary = (description) => description.split(/(?<=\.)\s/)[0];
const rows = skills.map(
  ({ dir, description }) =>
    `| [\`${dir}\`](skills/${dir}/) | ${summary(description)} | \`npx skills add purrkey/skills -s ${dir}\` |`,
);
const index = [START, "", "| Skill | What it does | Install |", "| --- | --- | --- |", ...rows, "", END].join("\n");

const readme = readFileSync("README.md", "utf8");
const begin = readme.indexOf(START);
const finish = readme.indexOf(END);
if (begin < 0 || finish < 0) errors.push("README.md: index markers are missing");
const updated = readme.slice(0, begin) + index + readme.slice(finish + END.length);

if (process.argv.includes("--check") && updated !== readme) {
  errors.push("README.md: skill index is stale, run node scripts/validate.mjs");
}
if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
if (!process.argv.includes("--check")) writeFileSync("README.md", updated);
console.log(`ok: ${skills.length} skills`);
