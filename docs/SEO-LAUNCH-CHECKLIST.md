# GARWEVIA — SEO launch checklist (www.garwevia.com)

Target searches: *apparel sourcing company in India*, *apparel sourcing companies in India*, *knitwear manufacturers in Tiruppur*, *private label clothing manufacturer India*, *garment sourcing agent India*.

## Week 1 — get indexed
1. **Domain:** serve the site on `https://www.garwevia.com`, and 301-redirect `garwevia.com` and `http://` to it. Set `NEXT_PUBLIC_SITE_URL=https://www.garwevia.com` on the server.
2. **Google Search Console** (search.google.com/search-console): add the domain, copy the HTML-tag code into the `GOOGLE_SITE_VERIFICATION` environment variable, redeploy, verify. Submit `https://www.garwevia.com/sitemap.xml`. Use *URL inspection → Request indexing* for the home page and the four landing pages.
3. **Bing Webmaster Tools** (covers Bing, Yahoo, DuckDuckGo and ChatGPT search): import from Search Console, or put the code in `BING_SITE_VERIFICATION`. Submit the sitemap.
4. **Google Business Profile** (business.google.com): category *Clothing wholesaler* / *Garment exporter*, address 62 Rayapuram Main Road, Tiruppur 641601, phone +91-8546802097, website, photos, products. Verify by post or video.

## Month 1 — build trust signals (backlinks & citations)
Use exactly the same name, address and phone (NAP) everywhere:
- LinkedIn company page (then add its link in `app/contact.ts`)
- IndiaMART, TradeIndia, ExportersIndia, Alibaba (supplier profile)
- Fibre2Fashion, Kompass, Europages, Sourcing Journal directory, Maker's Row
- Tiruppur Exporters' Association (TEA) / AEPC membership listing, if eligible
- Industry associations and chambers of commerce you belong to

## Ongoing — content & reputation
- Ask happy buyers for Google reviews.
- Publish 2 articles a month answering buyer questions (e.g. "How to source T-shirts from Tiruppur", "GOTS vs OEKO-TEX", "What MOQ to expect in India"). I can add a blog section when you are ready.
- Add real product photos (see `docs/PRODUCT-IMAGE-PROMPTS.md`) — image search brings traffic too.
- Check Search Console monthly: which queries show the site, and which pages to improve.

Realistic timing: brand searches ("GARWEVIA") within days of indexing; competitive phrases like "apparel sourcing company in India" typically take 3–9 months and depend mostly on backlinks, reviews and fresh content.
