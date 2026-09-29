# GARWEVIA — Image brief

Who looks at these images: sourcing managers and founders at apparel brands deciding whether to trust a partner in India. They know garments and factories well. An image that looks staged, AI-generated or borrowed from another brand costs credibility faster than no image at all.

All current photography is illustrative and labelled as such on the site. This brief lists what should replace it, in priority order.

---

## Priority 1 — Real photography in Tiruppur

The single biggest trust upgrade. Shoot at partner facilities **with written permission**, and only show what is accurate (partners, not GARWEVIA-owned factories).

| # | Shot | Replaces (in `app/images.ts`) | Used on |
|---|------|------------------------------|---------|
| 1 | Sewing line, operators at work, natural light, wide | `floorPeople` | Home hero, About hero, How it works |
| 2 | Single operator close-up at a machine (consented) | `seamstress` | Home "Why", About, Network |
| 3 | Circular knitting machines with fabric rolls | `knitting` | Home "Why", About "Why Tiruppur" |
| 4 | Cutting room: marker/pattern on spread fabric | `cutting` | Home Tiruppur section, Product development |
| 5 | Dyed fabric rolls / processing unit | `fabricStacks` | Network "Processing" |
| 6 | Screen printing or embroidery in progress | `kidsPrint` | Network "Decoration" |
| 7 | QC: measuring a garment against a spec sheet | `measuring` | Quality, Compliance, RFQ page |
| 8 | Lab dips / swatch cards / trims on a table | `swatches` | Home "Why", Compliance hero |
| 9 | Finished goods: folding, tagging, polybagging | `sewingLines` | Home "Why" |
| 10 | Cartons with shipping marks, loading | `packing` | (available for Shipment steps) |
| 11 | Wide establishing shot of a production floor | `factoryWide` | Services, Network heroes |
| 12 | **The GARWEVIA team** — portraits and one group shot | *(new)* | About, Contact — people buy from people |

**Specs**
- Landscape 3:2, minimum 2400 px wide (heroes run full screen). Portrait crops are made in code.
- Natural or even light; real, tidy work areas; PPE where appropriate.
- No visible third-party brand labels or customer products.
- No minors anywhere in factory shots.
- Written consent from anyone identifiable.

---

## Priority 2 — Complete the product series

The five flat-lays in `public/images` (essentials, fleece, womenswear, kidswear, performance) are the right style: blank, unbranded, one consistent look. Extend that series rather than mixing in stock photos.

**Missing and needed:**
1. Tops only: T-shirt stack **plus a polo** (no hoodie or bra in frame). The Tops category currently relies on a zoomed crop.
2. Polo shirt — none exists in any current image.
3. Premium oversized T-shirt, flat, showing the dropped shoulder.
4. Pajama set, kids and adult.
5. Optional: one packshot per product type (13 in total) for a future per-product view.

**Specs**
- Portrait 4:5, minimum 2000 × 2500 px.
- Same warm stone surface, soft daylight from the top-left, minimal props (olive sprig, stone bowl).
- Blank garments only: no prints, slogans, logos or labels unless demonstrating a decoration technique.
- Consistent colourways: white, black, navy, heather grey, olive, sand.

**If generated with AI**, keep one base prompt so the series stays consistent, and keep the "Illustrative imagery" label on the site:

> Overhead flat-lay product photograph of [GARMENT(S)], blank and unbranded, neatly folded, on a warm beige stone surface, soft natural daylight from the top-left casting gentle shadows, a small olive sprig and a stone bowl as minimal props at the edges, premium apparel catalogue style, realistic fabric texture and stitching, no text, no logos, 4:5 portrait.

Do not use AI to depict factories or people as if they were real partner facilities.

---

## How to swap an image

1. Add the file to `public/images/` (WebP, around 200–400 KB).
2. In `app/images.ts`, point the shot at the new `src`, update the `alt` text, and adjust `focus` (the crop point) or remove `zoom` if it is no longer needed.
3. Every page using that shot updates automatically.
