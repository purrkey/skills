---
name: lead-email-finder
description: Find business email addresses at a company from its domain, filtered by department or seniority, with confidence scores and the public sources where each address was seen. Uses Purrkey (Hunter), pay per call.
metadata:
  homepage: https://purrkey.app/tools/hunter
  requires: purrkey
  verified: 2026-11-20
---

# Lead email finder

Use this when the user needs contacts at a specific company for sales, partnerships or recruiting outreach.

## Before you start

This skill runs tools through Purrkey. It needs the Purrkey MCP server (tools `discover`, `inspect`, `run`, `get_run`) or the Purrkey CLI, with a `PURRKEY_API_KEY`. If neither is set up, install the [`purrkey` skill](../purrkey/SKILL.md) or the [Purrkey plugin](https://github.com/purrkey/plugins) first. Follow the `purrkey` skill's rules for `inspect`, spending caps and idempotency keys.

## Steps

1. **Get the domain.** Use the company's own domain (`stripe.com`), not a social profile. If the user gives only a company name, the tool also accepts `company`, but a domain gives better results.
2. **Search the domain.** `inspect` then `run` `hunter.domain_search`:
   ```json
   {"domain": "stripe.com", "limit": 5, "department": ["sales"], "seniority": ["senior", "executive"]}
   ```
   Up to 10 addresses use at most one Hunter credit. Filters: `type` (`personal` or `generic`), `seniority`, `department`.
   Results are in `output`: `organization`, `pattern` (for example `{first}{last}`), `results` (total known addresses) and `emails[]` with `value`, `firstName`, `lastName`, `position`, `department`, `seniority`, `confidence`, `linkedin` and `sources[]`.
3. **Report.** A table of name, role, email and confidence, plus the company's email pattern. Mark addresses below 70 confidence as unverified.

## Cost

Priced at Hunter's retail credit price with no markup: $0.0245 per credit, and up to 10 addresses use at most 1 credit. Check the live price with `inspect`.

## Notes

- Use the results for legitimate business outreach only, and follow the anti-spam and privacy laws that apply to the user (for example CAN-SPAM, GDPR).
- Don't guess addresses that the tool didn't return. Offer the company pattern as a pattern, not as a confirmed address.
