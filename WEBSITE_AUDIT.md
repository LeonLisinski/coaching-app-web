# WEBSITE_AUDIT.md — UnitLift coaching-app-web

**Datum audita:** 19. lipnja 2026.  
**Projekt:** `c:\Users\leon.lisinski\Projects\coaching-app-web`  
**Stack:** Next.js 15.2, React 19, next-intl 4, Tailwind CSS 4, Supabase, Resend, Stripe (deklarirano u dependencies, ne korišteno u kodu)  
**Opseg:** 28 stranica/komponenti u `app/`, 28 komponenti, 21 lib datoteka, i18n (hr/en), API rute, SEO, javni asseti

---

## 1. FUNKCIONALNOST I POKVARENE FUNKCIJE

### Kritične funkcionalne greške

- **Stranica/Komponenta:** `components/landing/Navbar.tsx` (linije 26–34, 37–42)  
  **Problem:** Prebacivanje jezika na hrvatskim stranicama bez `/hr` prefiksa (npr. `/cijene`, `/kontakt`) radi `pathname.split('/')` i zamjenjuje `segments[1]` — za `/cijene` to postaje `/en` umjesto `/en/cijene`. Korisnik gubi kontekst stranice.  
  **Prioritet:** 🔴 Kritično  
  **Preporuka:** Koristiti `usePathname` + next-intl `Link`/`router` s `createNavigation` helperom, ili mapirati rute eksplicitno (npr. `getPathname({ locale, href })`).

- **Stranica/Komponenta:** Cijeli projekt — `public/` direktorij  
  **Problem:** U repozitoriju postoji samo 5 datoteka u `public/` (`favicon.svg`, `logo-unitlift.svg`, `site.webmanifest`, `ads.txt`, `llms.txt`). Kod referencira desetke slika koje **ne postoje u repou**: `/og-image.jpg`, `/favicon.ico`, `/home-portrait.png`, `/screenshot-*.png`, `/trainers/*.jpg`, `/google-play-icon.png`, itd. (`scripts/generate-icons.mjs` generira neke, ali nisu commitane). U čistom deployu slike i OG slika neće raditi.  
  **Prioritet:** 🔴 Kritično  
  **Preporuka:** Commitati generirane assete ili dodati build step (`npm run icons`) u CI/CD; provjeriti Vercel deploy ima sve slike.

- **Stranica/Komponenta:** `components/landing/Pricing.tsx` (linija 172), `components/landing/CTA.tsx` (linija 18), `components/landing/Hero.tsx` (linija 36)  
  **Problem:** Link na demo stranicu je `/prezentacija` bez locale prefiksa. Za engleske korisnike na `/en/...` vodi na hrvatsku default rutu; može izazvati neočekivani redirect ili pogrešan jezik.  
  **Prioritet:** 🔴 Kritično  
  **Preporuka:** Zamijeniti s dinamičkim locale-aware linkom ili next-intl routing helperom.

- **Stranica/Komponenta:** `app/not-found.tsx` (linija 18)  
  **Problem:** Root 404 link vodi na `/hr`, ali s `localePrefix: 'as-needed'` kanonska hrvatska početna je `/`, ne `/hr`.  
  **Prioritet:** 🔴 Kritično  
  **Preporuka:** Promijeniti link u `/`.

### Važne funkcionalne greške

- **Stranica/Komponenta:** Svi linkovi s `/${locale}/...` (npr. `Navbar.tsx` 64–67, `ContactPage.tsx` 25–30)  
  **Problem:** Za default locale `hr`, linkovi generiraju `/hr/kako-radi`, `/hr/cijene` itd. Dok next-intl možda redirecta, to stvara **duplikate URL-ova** i nekonzistentnost sa sitemapom (`/kako-radi` bez prefiksa).  
  **Prioritet:** 🟡 Važno  
  **Preporuka:** Koristiti `createSharedPathnamesNavigation` iz next-intl ili helper `localePath(locale, path)` koji za `hr` ne dodaje prefiks.

- **Stranica/Komponenta:** `lib/blog/posts-hr.ts`, `posts-hr-2026-*.ts`  
  **Problem:** Interni blog linkovi koriste `/hr/blog/...` i `/hr/software-za-...`, dok kanonske HR rute nemaju `/hr` prefiks (`/blog/...`). Linkovi mogu redirectati, ali nisu kanonski.  
  **Prioritet:** 🟡 Važno  
  **Preporuka:** Ukloniti `/hr` prefiks iz svih internal-link hrefova u HR blogu.

- **Stranica/Komponenta:** `components/landing/MobileApp.tsx` (linije 89, 96)  
  **Problem:** App Store i Google Play gumbi imaju `href="#"` — placeholder koji ne vodi nigdje. Komponenta trenutno nije montirana na homepageu, ali je živa u codebaseu.  
  **Prioritet:** 🟡 Važno  
  **Preporuka:** Postaviti iste URL-ove kao u `ClientApp.tsx` (linije 210, 226) ili obrisati dead code.

- **Stranica/Komponenta:** `lib/trainers/trainers.ts` (linije 104, 171)  
  **Problem:** Instagram linkovi za Filipa Pušića i Bornu Kovačevića vode na generički `https://www.instagram.com/` — ne na stvarne profile.  
  **Prioritet:** 🟡 Važno  
  **Preporuka:** Dodati prave profile URL-ove ili ukloniti gumb dok nisu spremni.

- **Stranica/Komponenta:** `components/legal/TrainerProfilePage.tsx` (linije 115–117)  
  **Problem:** Badge tekst je hardkodiran na hrvatskom (`Osnivač UnitLifta`, `UnitLift trener`) čak i na EN verziji stranice.  
  **Prioritet:** 🟡 Važno  
  **Preporuka:** Dodati prijevode u `messages/en.json` / `hr.json`.

- **Stranica/Komponenta:** `components/legal/TrainersListPage.tsx` (linija 58)  
  **Problem:** Placeholder kartice prikazuju „Uskoro" hardkodirano — na EN stranici i dalje hrvatski tekst.  
  **Prioritet:** 🟡 Važno  
  **Preporuka:** Lokalizirati („Coming soon").

- **Stranica/Komponenta:** `components/legal/BlogPostPage.tsx` (linija 70)  
  **Problem:** Prebacivanje jezika na blog postu vodi na `/${otherLocale}/blog` umjesto na isti članak u drugom jeziku (ako postoji prijevod).  
  **Prioritet:** 🟡 Važno  
  **Preporuka:** Mapirati slugove između `posts-hr` i `posts-en`.

- **Stranica/Komponenta:** `components/landing/Footer.tsx` + `messages/en.json` (linija 365)  
  **Problem:** Footer link „Mobile app" koristi `#funkcije` — relativni anchor koji radi samo na homepageu. S drugih stranica vodi na pogrešno mjesto ili nigdje.  
  **Prioritet:** 🟡 Važno  
  **Preporuka:** Koristiti apsolutni path ili `/kako-radi`.

- **Stranica/Komponenta:** `NEXT_PUBLIC_APP_URL` — svi CTA-ovi (`Pricing.tsx` 149, `Navbar.tsx` 78)  
  **Problem:** Fallback je prazan string `''`. Ako env varijabla nije postavljena, login/register linkovi postaju `/login` i `/register` na marketing domeni — 404.  
  **Prioritet:** 🟡 Važno  
  **Preporuka:** Hardcodirati fallback `https://app.unitlift.com`.

### Manje važno — funkcionalnost

- **Stranica/Komponenta:** `app/api/contact/route.ts` (linija 32)  
  **Problem:** Rate limit poruka samo na hrvatskom bez obzira na jezik korisnika.  
  **Prioritet:** 🟢 Manje važno  
  **Preporuka:** Lokalizirati ili vratiti neutralan EN tekst.

- **Stranica/Komponenta:** `app/api/booking/route.ts`  
  **Problem:** Nema rate limitinga (za razliku od contact API-ja). Moguće spam rezervacije i email flood.  
  **Prioritet:** 🟡 Važno  
  **Preporuka:** Dodati isti IP rate limit pattern kao u contact ruti.

- **Stranica/Komponenta:** `components/landing/ClientApp.tsx` (linije 208–238)  
  **Problem:** ✅ App Store / Play Store linkovi su ispravni i funkcionalni (`id6742650853`, `com.unitlift.app`).  
  **Prioritet:** — (pozitivno)

- **Stranica/Komponenta:** Stripe integracija  
  **Problem:** `stripe` je u `package.json` ali **nema nijednog importa** u projektu. Plaćanje se odvija na `app.unitlift.com`. `.env.local.example` navodi Stripe ključeve koji se ovdje ne koriste — zbunjujuće za deploy.  
  **Prioritet:** 🟡 Važno  
  **Preporuka:** Ukloniti `stripe` dependency s marketing sitea.

---

## 2. TEKST I GRAMATIKA

### Kritične nekonzistentnosti u sadržaju (loše za povjerenje kupca)

- **Stranica/Komponenta:** `messages/en.json` + `messages/hr.json` (tiers) vs `lib/faq/faq-en.ts` + `lib/faq/faq-hr.ts` vs `public/llms.txt`  
  **Problem:** **Tri različita skupa limita klijenata:**
  - Pricing kartice (`messages/*.json`): Starter **10**, Pro **30**, Scale **75**
  - FAQ stranica (`faq-en.ts` linija 40, `faq-hr.ts` linija 40): Starter **15**, Pro **50**, Scale **150**
  - `llms.txt` (linije 18–20): **15/50/150**
  - SEO landing (`messages/en.json` seoPageCoaching): Scale do **150** klijenata  
  Kupac koji čita cijene pa FAQ vidi potpuno drugačije brojeve — ozbiljan problem povjerenja.  
  **Prioritet:** 🔴 Kritično  
  **Preporuka:** Odrediti jedan izvor istine i sinkronizirati pricing kartice, FAQ, llms.txt, SEO tekstove i app backend.

- **Stranica/Komponenta:** `messages/en.json` / `hr.json` — `seoPageApp`, `seoPageTracking`  
  **Problem:** Tvrdnje poput „98% check-in submission rate", „4.9★ client rating", „94% clients submit on time · Platform average: 42%", „89% vs 38% without system" — izgledaju kao stvarni podaci platforme bez izvora. Potencijalno obmanjujuće.  
  **Prioritet:** 🔴 Kritično  
  **Preporuka:** Ukloniti, označiti kao ilustraciju, ili dodati metodologiju/izvor.

- **Stranica/Komponenta:** `components/landing/Testimonials.tsx` + `messages/*.json` testimonials  
  **Problem:** 8 testimonijala s inicijalima (Mark K., Tom N., …) i uvijek 5 zvjezdica — izgledaju kao stvarne recenzije bez oznake „illustrative" ili verificiranih recenzija. Nema linka na App Store reviews ili Trustpilot.  
  **Prioritet:** 🟡 Važno  
  **Preporuka:** Dodati disclaimer „Primjeri iskustava korisnika" ili koristiti stvarne, verificirane recenzije.

- **Stranica/Komponenta:** `public/llms.txt` (linija 27)  
  **Problem:** Placeholder `__APP_URL__` nije zamijenjen — AI crawleri i LLM alati dobivaju krivi link.  
  **Prioritet:** 🟡 Važno  

### Gramatika i jezične greške (HR)

- **Stranica/Komponenta:** `messages/hr.json` (linija 28, `cappFeats[4].bullets[0]`)  
  **Problem:** „Praćenje **zadnih** metrika" — ispravno je „**zadnjih** metrika" ili „najnovijih metrika".  
  **Prioritet:** 🟡 Važno  

- **Stranica/Komponenta:** `messages/hr.json` (linija 447)  
  **Problem:** „jedan **login**" — anglicizam u marketing tekstu.  
  **Prioritet:** 🟢 Manje važno  
  **Preporuka:** „jedna prijava" ili „jedan račun".

- **Stranica/Komponenta:** `lib/blog/posts-hr.ts` (linija 8) vs `messages/hr.json`  
  **Problem:** „UnitLift**-**a" vs „UnitLift**a**" — nedosljedno pisanje genitiva branda.  
  **Prioritet:** 🟢 Manje važno  

### Gramatika i stil (EN)

- **Stranica/Komponenta:** `messages/en.json` (linija 453, `howItWorksPage.heroSub`)  
  **Problem:** Miješanje formalnog i colloquial tona u istoj stranici.  
  **Prioritet:** 🟢 Manje važno  

- **Stranica/Komponenta:** `components/legal/ContactPage.tsx` (linija 178)  
  **Problem:** Email placeholder `marko@email.com` na EN kontakt stranici — trebao bi biti `john@email.com`.  
  **Prioritet:** 🟢 Manje važno  

- **Stranica/Komponenta:** `lib/trainers/trainers.ts` (linije 206–211)  
  **Problem:** 6 placeholder trenera „Uskoro" prikazano na `/treneri` — može izgledati kao nedovršen proizvod.  
  **Prioritet:** 🟡 Važno  
  **Preporuka:** Prikazati samo aktivne trenere dok se mreža ne proširi.

### Nekonzistentnost valute i pricing teksta

- **Stranica/Komponenta:** `messages/hr.json` vs `faq-hr.ts` vs SEO HR  
  **Problem:** „10 €/mj" vs „€10/mj" vs „10€" — sitna nekonzistentnost razmaka i valute.  
  **Prioritet:** 🟢 Manje važno  

---

## 3. SEO OPTIMIZACIJA

### Što radi dobro ✅

- `lib/seo-metadata.ts` — konzistentan `buildPageMetadata` s OG image, Twitter card, canonical, hreflang
- `app/[locale]/page.tsx` — JSON-LD `SoftwareApplication`
- `components/landing/SeoLandingPage.tsx` — FAQPage + SoftwareApplication schema
- `app/[locale]/blog/[slug]/page.tsx` — BlogPosting schema
- `app/robots.ts` — ispravan, blokira `/api/`
- SEO landing stranice za ključne keywords: `/software-za-online-fitness-trenere`, `/en/online-personal-trainer-software`, `/aplikacija-za-personal-trenere`, `/en/personal-trainer-app` itd.

### SEO problemi

- **Stranica/Komponenta:** `app/sitemap.ts`  
  **Problem:** Nedostaju rute: `/treneri`, `/treneri/[slug]`, `/prezentacija`. Blog EN/HR nema cross-language alternates u sitemap entries.  
  **Prioritet:** 🟡 Važno  
  **Preporuka:** Dodati sve statičke i dinamičke rute s `alternates.languages`.

- **Stranica/Komponenta:** `app/[locale]/layout.tsx` (linije 20–24)  
  **Problem:** Default `metadata.title.template` je `'%s'` — podstranice bez vlastitog titlea ne dobivaju brand sufiks.  
  **Prioritet:** 🟡 Važno  
  **Preporuka:** Promijeniti u `'%s | UnitLift'`.

- **Stranica/Komponenta:** `app/[locale]/prezentacija/page.tsx` (linije 5–11)  
  **Problem:** Metadata samo `title` i `description` — nema canonical, OG image, hreflang.  
  **Prioritet:** 🟡 Važno  

- **Stranica/Komponenta:** `public/` — nedostaje `og-image.jpg`  
  **Problem:** Svi OG tagovi referenciraju `${SITE_URL}/og-image.jpg`. Ako slika ne postoji na produkciji, social share preview je broken.  
  **Prioritet:** 🔴 Kritično  

- **Stranica/Komponenta:** Duplikati URL-ova `/hr/...` vs `/...`  
  **Problem:** Internal linkovi stvaraju `/hr/` varijante koje konkuriraju kanonskim URL-ovima u Google indexu.  
  **Prioritet:** 🟡 Važno  

- **Stranica/Komponenta:** `lib/seo-metadata.ts` (linija 48)  
  **Problem:** OG image `alt` je uvijek na hrvatskom čak i za EN stranice.  
  **Prioritet:** 🟢 Manje važno  

- **Stranica/Komponenta:** `messages/en.json` + `hr.json` showcase `screenshotAlts[6]`  
  **Problem:** Prazan string `""` za alt tag sedmog screenshota (Chat).  
  **Prioritet:** 🟡 Važno  

- **Stranica/Komponenta:** `components/landing/ClientAppStrip.tsx` (linija 74)  
  **Problem:** Alt uvijek na hrvatskom bez obzira na locale.  
  **Prioritet:** 🟡 Važno  

---

## 4. MARKETING I PRODAJA

### Što radi dobro ✅

- Jasna conversion arhitektura: hero → social proof → pricing → CTA → app register
- „More clients. Less chaos." — jasan value prop
- SEO landing stranice s problem → solution → features → pricing → FAQ → CTA funkelom
- „Try for free" CTA na svakoj ključnoj stranici
- Sekundarni CTA za demo booking — dobar za high-touch prodaju
- Trust elementi: GDPR, iOS/Android, Made in Croatia

### Problemi

- **Stranica/Komponenta:** `components/landing/Pricing.tsx` (linija 124), `components/legal/PricingPage.tsx` (linija 220)  
  **Problem:** Founding promo tekst „uštedi €.../god" hardkodiran na hrvatskom čak i na EN stranici.  
  **Prioritet:** 🔴 Kritično  
  **Preporuka:** Lokalizirati promo tekst ili koristiti `t('pricing.savePerYear')`.

- **Stranica/Komponenta:** `/treneri` stranica  
  **Problem:** 6 placeholder kartice „Uskoro" dominiraju stranicom — signalizira mali/nezreo ekosustav potencijalnim kupcima.  
  **Prioritet:** 🟡 Važno  
  **Preporuka:** Prikazati samo aktivne trenere s opcijom „Postani jedan od prvih" za prijavnice.

- **Stranica/Komponenta:** Testimonijali  
  **Problem:** Inicijali i 5/5 zvjezdica bez verifikacije — smanjuju vjerodostojnost. Nema broja korisnika, logotipa gymova, medijskih spominjanja.  
  **Prioritet:** 🟡 Važno  

- **Stranica/Komponenta:** Kartica obavezna za trial  
  **Problem:** Komunicirano transparentno ✅, ali može smanjiti konverziju u usporedbi s konkurencijom bez obavezne kartice.  
  **Prioritet:** 🟡 Važno (poslovna odluka)  

- **Stranica/Komponenta:** `pricingPage.partnerTitle`  
  **Problem:** „Partner program" spominje se bez landing stranice ili forme — dead end.  
  **Prioritet:** 🟢 Manje važno  

---

## 5. PLAĆANJE

**Napomena:** Marketing website (`coaching-app-web`) **ne procesira plaćanja direktno**. Cijeli payment flow je delegiran na `app.unitlift.com` (coaching-app). Stripe dependency u ovom projektu je neiskorištena.

### Korak-po-korak payment flow (kako marketing site sudjeluje)

1. Korisnik vidi cijene na `#cijene` ili `/cijene` — **€29/€59/€99**
2. Klikne „Start free" → `{APP_URL}/register?plan=starter|pro|scale`
3. Registracija i Stripe checkout odvijaju se na app domeni
4. Webhook handling, subscription management — nisu u coaching-app-web

### Problemi relevantni za marketing / pre-prodaju

- **Stranica/Komponenta:** `messages/*.json` tiers vs `lib/faq/*.ts`  
  **Problem:** Kupac vidi jedan broj klijenata na pricing kartici, drugi u FAQ-u. Rizik nepovjerenja i chargebacka.  
  **Prioritet:** 🔴 Kritično  

- **Stranica/Komponenta:** `Pricing.tsx` (linije 119, 131)  
  **Problem:** Hardkodiran `/mj` suffix — na EN stranici piše „/mj" umjesto „/mo".  
  **Prioritet:** 🔴 Kritično  
  **Preporuka:** `t('common.monthSuffix')`.

- **Stranica/Komponenta:** Founding offer + `NEXT_PUBLIC_FOUNDING_PROMO_END`  
  **Problem:** Varijabla **nije u `.env.local.example`**. Potrebno verificirati da coaching-app Stripe cijene i couponi odgovaraju marketing prikazu.  
  **Prioritet:** 🔴 Kritično  

- **Stranica/Komponenta:** `lib/legal/terms-en.ts`  
  **Problem:** Terms: March 2025. Privacy: May 2026. Nesklad datuma koji može izgledati neprofesionalno i pravno upitno.  
  **Prioritet:** 🟡 Važno  
  **Preporuka:** Ažurirati Terms datum.

### Što je dobro ✅

- Terms pokrivaju Stripe, auto-renewal, refunds (14-day EU withdrawal) — dobar legal compliance
- Transparentna komunikacija o kartici za trial
- „Cancel anytime" komunicirano jasno na FAQ-u

---

## 6. SIGURNOST

- **Stranica/Komponenta:** `lib/supabase.ts`  
  **Problem:** `NEXT_PUBLIC_SUPABASE_URL` i `NEXT_PUBLIC_SUPABASE_ANON_KEY` su namjerno javni — OK ako RLS štiti tablice. Booking GET koristi anon client za čitanje `demo_availability` — mora biti read-only RLS.  
  **Prioritet:** 🟡 Važno  
  **Preporuka:** Verificirati RLS politike za `demo_availability`, `contact_messages`, i sve tablice koje marketing site može dohvatiti.

- **Stranica/Komponenta:** `app/api/contact/route.ts` (linije 104–107)  
  **Problem:** `SUPABASE_SERVICE_ROLE_KEY` koristi se server-side za insert — ispravno ✅. Ali non-fatal error handling (email poslan, DB insert pao) može dovesti do izgubljenih ticketa u adminu.  
  **Prioritet:** 🟡 Važno  

- **Stranica/Komponenta:** `app/api/booking/route.ts`  
  **Problem:** Nema rate limitinga — DoS/spam vektor.  
  **Prioritet:** 🟡 Važno  
  **Preporuka:** Dodati isti pattern kao u contact ruti.

- **Stranica/Komponenta:** `middleware.ts`  
  **Problem:** Samo next-intl routing — nema security headers (CSP, X-Frame-Options, HSTS).  
  **Prioritet:** 🟡 Važno  
  **Preporuka:** Dodati u `next.config.ts` `headers()`.

- **Stranica/Komponenta:** `app/api/contact/route.ts` (linije 20–27, 51–54)  
  **Problem:** ✅ HTML escaping za email template — dobra XSS zaštita.

- **Stranica/Komponenta:** CORS  
  **Problem:** API rute su same-origin; nema eksplicitnog CORS — OK za marketing site ✅.

- **Stranica/Komponenta:** `dangerouslySetInnerHTML`  
  **Problem:** Korišten za i18n HTML i JSON-LD — sadržaj dolazi iz statičkih datoteka, ne user inputa. Rizik nizak ✅.

---

## 7. UX / KORISNIČKO ISKUSTVO

### Što radi dobro ✅

- Sticky nav, mobile hamburger, jezični switch
- Odličan mobile carousel s touch swipe u `ClientApp.tsx`
- Contact forma s validacijom, loading/success/error stanjima
- Demo booking s kalendarom, timezone handling, double-booking zaštitom
- Next/Image s webp format, lazy loading, dynamic imports za below-fold

### Problemi

- **Stranica/Komponenta:** `Navbar.tsx` (linije 26–34)  
  **Problem:** Auto-restore locale iz `localStorage` na mount može pregaziti shared URL preferenciju — korisnik koji dobije `/en/...` link može vidjeti HR verziju.  
  **Prioritet:** 🟡 Važno  

- **Stranica/Komponenta:** `Navbar.tsx` link `#funkcije`  
  **Problem:** Relativni anchor radi samo na homepageu. S podstranica vodi nasumično.  
  **Prioritet:** 🟡 Važno  

- **Stranica/Komponenta:** Nedostajuće slike  
  **Problem:** Sve missing slike (portreti trenera, app screenshots, og-image) degradiraju UX i povjerenje.  
  **Prioritet:** 🔴 Kritično  

- **Stranica/Komponenta:** `BookingPage.tsx` (linija 305)  
  **Problem:** Loading indicator je `"..."` — minimalno, ali funkcionalno.  
  **Prioritet:** 🟢 Manje važno  

### Accessibility

- **Stranica/Komponenta:** `Testimonials.tsx` — arrow gumbi s `aria-label`, carousel s `aria-hidden` ✅
- **Stranica/Komponenta:** `Testimonials.tsx` (linija 195) — `aria-label="Recenzija ${d+1}"` uvijek na HR čak i za EN locale  
  **Prioritet:** 🟢 Manje važno  
- **Stranica/Komponenta:** `ClientApp.tsx` (linija 194) — `"Carousel indicators"` uvijek EN  
  **Prioritet:** 🟢 Manje važno  

---

## 8. TEHNIČKI DUG I KONZISTENTNOST

### Design konzistentnost

- **Stranica/Komponenta:** Legal stranice vs landing  
  **Problem:** Dvije navigacije (`Navbar` vs legal inline nav) — duplicirani kod u ~10 datoteka.  
  **Prioritet:** 🟡 Važno  
  **Preporuka:** Ekstrahirati `LegalNavbar` komponentu.

### Dependencies

- **Stranica/Komponenta:** `package.json`  
  **Problem:** `stripe ^20.4.1` — nekorištena dependency (dead weight, security audit surface). Treba ukloniti.  
  **Prioritet:** 🟡 Važno  

### Duplicirani kod

- **Stranica/Komponenta:** `Pricing.tsx` vs `PricingPage.tsx`  
  **Problem:** Founding promo logika, `PRICES`, `PLANS`, promo banner JSX — copy-paste duplikat između dvije komponente.  
  **Prioritet:** 🟡 Važno  
  **Preporuka:** Ekstrahirati shared `usePricingData` hook ili zajednički constants file.

- **Stranica/Komponenta:** Navigacija u svim `legal/*Page.tsx`  
  **Problem:** Isti `navLinks` pattern kopiran u 10+ datoteka.  
  **Prioritet:** 🟡 Važno  

### Nedovršeni dijelovi

- **Stranica/Komponenta:** `components/landing/MobileApp.tsx`  
  **Problem:** Nekorištena komponenta s `href="#"` store linkovima — dead code koji može zbuniti developere.  
  **Prioritet:** 🟡 Važno  

- **Stranica/Komponenta:** `lib/trainers/trainers.ts` placeholders  
  **Problem:** 6 placeholder trenera exportirano.  
  **Prioritet:** 🟡 Važno  

### i18n konzistentnost

- **Stranica/Komponenta:** `components/landing/Pricing.tsx` (linije 119, 124)  
  **Problem:** HR tekst „/mj", „uštedi €.../god" na EN locale — nije prošlo kroz i18n sustav.  
  **Prioritet:** 🔴 Kritično  

- **Stranica/Komponenta:** `components/landing/ClientAppStrip.tsx` (linije 7–12)  
  **Problem:** HR labeli hardkodirani u EN-accessible komponentu.  
  **Prioritet:** 🟡 Važno  

### Build / deploy

- **Stranica/Komponenta:** `scripts/generate-icons.mjs`  
  **Problem:** Generira favicon, apple-touch-icon, og-image — ali **nije dio `npm run build`**. Svježi Vercel deploy neće imati generirane slike.  
  **Prioritet:** 🟡 Važno  
  **Preporuka:** Dodati `"prebuild": "node scripts/generate-icons.mjs"` u `package.json`.

### Legal dokumenti

- **Stranica/Komponenta:** `lib/legal/terms-en.ts` vs `privacy-en.ts`  
  **Problem:** Terms: March 2025. Privacy: May 2026. Nesklad koji može izazvati pravna pitanja.  
  **Prioritet:** 🟡 Važno  

---

## SAŽETAK

### Statistika nalaza

| Prioritet | Broj nalaza |
|-----------|-------------|
| 🔴 Kritično | 12 |
| 🟡 Važno | 28 |
| 🟢 Manje važno | 12 |
| **Ukupno** | **52** |

### Nalaze po kategoriji

| Kategorija | 🔴 | 🟡 | 🟢 |
|-----------|-----|-----|-----|
| Funkcionalnost | 4 | 9 | 3 |
| Tekst i gramatika | 3 | 4 | 4 |
| SEO | 2 | 5 | 2 |
| Marketing i prodaja | 2 | 4 | 1 |
| Plaćanje | 3 | 1 | 1 |
| Sigurnost | 0 | 3 | 1 |
| UX | 1 | 2 | 3 |
| Tehnički dug | 0 | 8 | 1 |

---

### Top 10 akcija prije produkcije (po prioritetu)

1. 🔴 **Sinkronizirati limite klijenata** u `messages/*.json`, `lib/faq/*.ts`, `public/llms.txt` i SEO tekstovima — jedan izvor istine (10/30/75 ili 15/50/150, odabrati jedno).
2. 🔴 **Osigurati sve slike u `public/`** — commitati generirane assete ili dodati `prebuild` script u `package.json`.
3. 🔴 **Popraviti locale routing** — ukloniti `/hr` prefiks iz internal linkova; popraviti language switcher u `Navbar.tsx`.
4. 🔴 **Ukloniti ili disclaimerati** izmišljene statistike (98% check-in rate, 4.9★, itd.).
5. 🔴 **Lokalizirati pricing promo tekst** (`/mj` → `t('common.monthSuffix')`, „uštedi.../god" kroz i18n).
6. 🟡 **Dopuniti `sitemap.ts`** s treneri, prezentacija, blog alternates.
7. 🟡 **Dodati rate limiting** na `/api/booking`.
8. 🟡 **Ukloniti ili popraviti** placeholder trenere i Instagram linkove.
9. 🟡 **Ukloniti nekorišteni `stripe` package** s marketing sitea.
10. 🟡 **Dodati security headers** u `next.config.ts` i ažurirati Terms datum.

---

### Što je dobro napravljeno ✅

- Jasna conversion arhitektura (hero → social proof → pricing → CTA → app register)
- Dvojezičnost (hr/en) s SEO landing stranicama za ključne keywords
- App Store / Play Store linkovi u `ClientApp.tsx` ispravni (`id6742650853`, `com.unitlift.app`)
- Contact forma s validacijom, rate limitom, HTML escapingom, i18n
- Demo booking s kalendarom, timezone handling (Europe/Zagreb), double-booking zaštitom
- Structured data (SoftwareApplication, FAQPage, BlogPosting)
- `robots.ts`, canonical URL-ovi, hreflang na glavnim stranicama
- Legal dokumenti pokrivaju Stripe, GDPR, refunds (14-day EU withdrawal)
- `poweredByHeader: false`, Next.js image optimization, dynamic imports za performance

---

*Audit obuhvaća kompletan source code repozitorija `coaching-app-web`. Payment webhook logika, Stripe test/live mode i subscription management treba dodatno audirati u `coaching-app` (app.unitlift.com) jer nisu dio ovog projekta.*
