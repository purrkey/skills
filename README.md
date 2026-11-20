<h1 align="center">Purrkey skills</h1>

<p align="center">
  <a href="https://purrkey.app/?utm_source=github&utm_medium=readme&utm_campaign=geo_launch">purrkey.app</a> ·
  <a href="https://purrkey.app/tools?utm_source=github&utm_medium=readme&utm_campaign=geo_launch">Tool catalog</a> ·
  <a href="https://github.com/purrkey/plugins">Plugins</a> ·
  <a href="https://github.com/purrkey-ai/cli">CLI</a>
</p>

Agent skills for [Purrkey](https://purrkey.app/?utm_source=github&utm_medium=readme&utm_campaign=geo_launch), a pay-per-call tool marketplace for AI agents. Each skill is a recipe for one real task, such as researching Xiaohongshu notes, comparing prices on Amazon and eBay, or digesting Google Maps reviews. It tells the agent which tools to use, what to pass them and what to report.

Skills follow the open [Agent Skills](https://agentskills.io) format and work with Claude Code, Codex, Cursor, OpenCode, Gemini CLI and other agents that support it.

## Skills

<!-- SKILL_INDEX_START -->

| Skill | What it does | Install |
| --- | --- | --- |
| [`purrkey`](skills/purrkey/) | Use Purrkey when the user needs live external data or a web task an agent can't do alone, such as social media posts and comments, e-commerce listings and reviews, travel and job listings, search results, page scraping or browser automation. | `npx skills add purrkey/skills -s purrkey` |
| [`lead-email-finder`](skills/lead-email-finder/) | Find business email addresses at a company from its domain, filtered by department or seniority, with confidence scores and the public sources where each address was seen. | `npx skills add purrkey/skills -s lead-email-finder` |
| [`product-price-check`](skills/product-price-check/) | Compare prices for a product across Amazon and eBay. | `npx skills add purrkey/skills -s product-price-check` |
| [`rental-listing-scan`](skills/rental-listing-scan/) | Scan property listings for rent or sale on Idealista (Spain, Italy, Portugal) or Zillow (US) and summarize prices, price per square meter, sizes and neighborhoods with links. | `npx skills add purrkey/skills -s rental-listing-scan` |
| [`review-digest`](skills/review-digest/) | Summarize recent customer reviews of a place or business on Google Maps, with optional Trustpilot or Yelp coverage. | `npx skills add purrkey/skills -s review-digest` |
| [`seo-keyword-research`](skills/seo-keyword-research/) | Research SEO keywords for a topic. | `npx skills add purrkey/skills -s seo-keyword-research` |
| [`short-video-trend-scan`](skills/short-video-trend-scan/) | Scan TikTok and Douyin (抖音) for short videos about a keyword and report what is trending, which creators lead and how engagement compares across the two platforms. | `npx skills add purrkey/skills -s short-video-trend-scan` |
| [`web-page-to-markdown`](skills/web-page-to-markdown/) | Fetch a web page, including JavaScript-rendered or bot-protected pages, and return its main content as clean Markdown with title and description. | `npx skills add purrkey/skills -s web-page-to-markdown` |
| [`xiaohongshu-research`](skills/xiaohongshu-research/) | Research what people say on Xiaohongshu (RED, 小红书) about a product, brand or topic. | `npx skills add purrkey/skills -s xiaohongshu-research` |

<!-- SKILL_INDEX_END -->

Every recipe was run against the live Purrkey API on the date in its `verified` field. Each one lists the real cost of that run.

## Install

```bash
# List the skills in this repository
npx skills add purrkey/skills --list

# Install one skill
npx skills add purrkey/skills -s xiaohongshu-research

# Install the base skill plus a recipe for a specific agent
npx skills add purrkey/skills -s purrkey -s review-digest -a claude-code
```

Or copy a folder from `skills/` into your agent's skill directory, for example `~/.claude/skills/` for Claude Code.

## Set up Purrkey access

The recipes run tools through Purrkey, so the agent needs one of:

- **The Purrkey MCP server**: install the [Purrkey plugin](https://github.com/purrkey/plugins) for Claude Code or Cursor, or add `https://api.purrkey.app/mcp` with an `Authorization: Bearer <key>` header to any MCP client.
- **The Purrkey CLI**: see [purrkey-ai/cli](https://github.com/purrkey-ai/cli).

Create a key at [purrkey.app/keys](https://purrkey.app/keys?utm_source=github&utm_medium=readme&utm_campaign=geo_launch) and make it available as `PURRKEY_API_KEY`. New accounts get $1 in free credit and there is no subscription. Install the base `purrkey` skill too: it holds the rules every recipe relies on (inspect before running, spending caps, never paying twice for one task).

## Costs

Running a tool spends your Purrkey balance; finding and inspecting tools is free. Each recipe states what its verified run cost, but prices can change, so the agent checks the live price with `inspect` before every run. You can set daily and per-run caps at [purrkey.app/budget](https://purrkey.app/budget?utm_source=github&utm_medium=readme&utm_campaign=geo_launch).

## Contributing

Recipes for other tasks are welcome. A recipe should:

1. Solve one task a user would actually ask for.
2. Name the tools it uses and show a working input for each one.
3. Say where the useful fields are in each output and what to report.
4. State the cost of a real run, with its date in `verified`.

Run `node scripts/validate.mjs` before opening a pull request. It checks the frontmatter and regenerates the index above.

## License

[MIT](LICENSE)
