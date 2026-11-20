---
name: seo-keyword-research
description: Research SEO keywords for a topic. Get Google search volume, CPC and competition for a batch of keywords, then look at who ranks on the first page for the best candidates. Uses Purrkey (DataForSEO and Google Search), pay per call.
metadata:
  homepage: https://purrkey.app/tools/dataforseo
  requires: purrkey
  verified: 2026-11-20
---

# SEO keyword research

Use this when the user wants to choose keywords for a page, an article or a campaign, or to size demand for a topic.

## Before you start

This skill runs tools through Purrkey. It needs the Purrkey MCP server (tools `discover`, `inspect`, `run`, `get_run`) or the Purrkey CLI, with a `PURRKEY_API_KEY`. If neither is set up, install the [`purrkey` skill](../purrkey/SKILL.md) or the [Purrkey plugin](https://github.com/purrkey/plugins) first. Follow the `purrkey` skill's rules for `inspect`, spending caps and idempotency keys.

## Steps

1. **Build the candidate list yourself first.** Write 10–50 candidate keywords from the user's topic: head terms, long-tail variants, questions. Agree the market (country and language) with the user. The default is the US in English.
2. **Get volume in one batch.** `inspect` then `run` `dataforseo.keywords.search_volume` with **all** candidates in one call. The price is per call, not per keyword, so batching is much cheaper than one call per keyword.
   ```json
   {"keywords": ["matcha latte", "matcha powder", "ceremonial matcha"], "location_code": 2840, "language_code": "en"}
   ```
   `location_code` is a DataForSEO location (2840 = United States, 2826 = United Kingdom). Results are in `output.keywords[]`: `searchVolume`, `monthlySearches` (12 months), `cpc`, `competition`, `competitionIndex`.
3. **Shortlist.** Rank by volume and competition for the user's goal. Flag seasonal keywords from `monthlySearches`.
4. **Check the first page.** For the top 3–5 keywords, `run` `anyapi.google.search`:
   ```json
   {"query": "best ceremonial matcha", "limit": 10, "gl": "us", "hl": "en"}
   ```
   Results are in `output.data.results[]` (`position`, `title`, `link`, `snippet`). Note which kinds of sites rank (big publishers, stores, forums) and what the pages cover.
5. **Report.** A table of keywords with volume, CPC, competition and trend, then for each shortlisted keyword the current top results and the angle a new page would need.

## Cost

On 2026-11-20 one search-volume call with 3 keywords cost $0.09 (the published cap is $0.10 per call, at DataForSEO's price with no markup), and one Google results call cost $0.0005. Batch keywords and check live prices with `inspect`.

## Notes

- Search volume is Google Ads data, rounded and averaged. Present it as an estimate.
- Ranking pages change daily. Give the date of the check.
