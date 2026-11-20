---
name: rental-listing-scan
description: Scan property listings for rent or sale on Idealista (Spain, Italy, Portugal) or Zillow (US) and summarize prices, price per square meter, sizes and neighborhoods with links. Uses Purrkey, pay per call.
metadata:
  homepage: https://purrkey.app/tools/idealista
  requires: purrkey
  verified: 2026-11-20
---

# Rental listing scan

Use this when the user is looking for a flat or house, or wants to understand rents and prices in an area.

## Before you start

This skill runs tools through Purrkey. It needs the Purrkey MCP server (tools `discover`, `inspect`, `run`, `get_run`) or the Purrkey CLI, with a `PURRKEY_API_KEY`. If neither is set up, install the [`purrkey` skill](../purrkey/SKILL.md) or the [Purrkey plugin](https://github.com/purrkey/plugins) first. Follow the `purrkey` skill's rules for `inspect`, spending caps and idempotency keys.

## Steps

1. **Agree the search.** City or area, rent or sale, property type, budget and size. Pick the source: Idealista for Spain, Italy and Portugal; Zillow for the US.
2. **Idealista.** `inspect` then `run` `apify.idealista.search`:
   ```json
   {"operation": "rent", "propertyType": "homes", "country": "es", "location": "Madrid", "limit": 10}
   ```
   Listings are in `output.results[]`: `price`, `priceSuffix`, `sizeSquareMeters`, `pricePerSquareMeter`, `rooms`, `bathrooms`, `floor`, `hasLift`, `district`, `neighborhood`, `address`, `agency`, `firstActivatedAt`, `url`.
3. **Zillow (US).** `run` `anyapi.zillow.search` with `location` and the filters in its schema (`listingTypes`, `minBedrooms`, `maxPrice`, `homeTypes`, …). Its cap per call is higher than Idealista's, so `inspect` the price and keep `limit` small.
4. **Report.** The number of listings, the price range and median, price per square meter by district, and a short list of the listings that best match the user's criteria, with links and when they were first listed.

## Cost

On 2026-11-20 an Idealista search with 3 results cost $0.0077 (cap $0.03 per call, at Apify's price with no markup; failed runs and runs without results are not charged). Check live prices with `inspect`.

## Notes

- Listings go fast and may be outdated or duplicated across agencies. Say when you searched.
- Don't contact agencies or landlords on the user's behalf unless they ask.
