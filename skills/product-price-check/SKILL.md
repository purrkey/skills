---
name: product-price-check
description: Compare prices for a product across Amazon and eBay. Search both marketplaces, match comparable listings and report the price range, the cheapest new and used options, shipping and links. Uses Purrkey, pay per call.
metadata:
  homepage: https://purrkey.app/tools/amazon
  requires: purrkey
  verified: 2026-11-20
---

# Product price check

Use this when the user wants to know what something costs right now, where it is cheapest, or whether a price is a good deal.

## Before you start

This skill runs tools through Purrkey. It needs the Purrkey MCP server (tools `discover`, `inspect`, `run`, `get_run`) or the Purrkey CLI, with a `PURRKEY_API_KEY`. If neither is set up, install the [`purrkey` skill](../purrkey/SKILL.md) or the [Purrkey plugin](https://github.com/purrkey/plugins) first. Follow the `purrkey` skill's rules for `inspect`, spending caps and idempotency keys.

## Steps

1. **Pin down the product.** Get the exact model, size or variant if it matters. A vague query mixes products with very different prices.
2. **Amazon.** `inspect` then `run` `anyapi.amazon.search`. It takes an Amazon search URL:
   ```json
   {"url": "https://www.amazon.com/s?k=standing+desk", "limit": 5}
   ```
   Use the user's Amazon domain (`amazon.co.uk`, `amazon.de`, …) for other markets. Results are in `output.data.items[]` (`title`, `price`, `listPrice`, `currency`, `rating`, `reviewsCount`, `isSponsored`, `url`).
3. **eBay.** `run` `anyapi.ebay.search`:
   ```json
   {"query": "standing desk", "limit": 5}
   ```
   Optional filters in the schema: `condition`, `minPrice`, `maxPrice`, `sort`, `listingType`. Results are in `output.data.items[]` (`title`, `price`, `currency`, `condition`, `listingType`, `shippingCost`, `url`).
4. **Match and compare.** Drop listings that are a different product, accessories or parts. Separate new from used and auctions from fixed price. Add shipping where it is listed.
5. **Report.** The price range per marketplace, the cheapest comparable new and used options with links, and anything that affects the comparison (sponsored results, auctions still running, missing shipping costs).

## Cost

On 2026-11-20 an Amazon search cost $0.00075 and an eBay search cost $0.0012. The published caps per call are higher ($0.0021 and $0.0655), so set `maxChargeMicros` from `inspect`; you are charged the actual cost.

## Notes

- Prices and availability change quickly. Give the time of the check and don't promise a price at checkout.
- Local marketplaces such as Facebook Marketplace are also in the catalog: `discover` with `facebook marketplace listings search` and check the price with `inspect` first, as these runs cost more.
