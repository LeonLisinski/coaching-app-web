import type { BlogBlock, BlogPost, BlogPostCta } from './types'
import { blogPostsHr2026 } from './posts-hr'
import { blogPostsEn2026 } from './posts-en'

export const NEW_HR_SLUGS = new Set(blogPostsHr2026.map((p: BlogPost) => p.slug))
export const NEW_EN_SLUGS = new Set(blogPostsEn2026.map((p: BlogPost) => p.slug))

function blogRoot(locale: string) {
  return `/${locale}/blog/`
}

/** Injected right after the opening paragraph: context + 2 internal links (legacy posts). */
const AUG_HR: Record<string, (root: string) => BlogBlock[]> = {
  'kako-povecati-bazu-klijenata': (root) => [
    { type: 'paragraph', text: 'Prije nego u dublje taktike, dobro je imati jedno mjesto gdje klijenti žive u sustavu, ne samo u porukama. Ova dva vodiča dodaju kontekst: kako urediti online klijente i što u prvim mjesecima posla riješiti prvo.' },
    { type: 'internal-link', text: '→ Kako organizirati online klijente (jedan sustav, manje nereda)', href: `${root}kako-organizirati-online-klijente` },
    { type: 'internal-link', text: '→ Online coaching kao posao - što prvo riješiti u prvih mjeseci', href: `${root}online-coaching-posao-vodic` },
  ],
  'zasto-excel-nije-dovoljan': (root) => [
    { type: 'paragraph', text: 'Ako već gledaš posebne alate, isplati se usporediti kako to rade veliki strani proizvodi i što na domaćem tržištu za tebe ima smisla bez suvišnog šuma.' },
    { type: 'internal-link', text: '→ Trainerize alternative: što biraju treneri u Hrvatskoj', href: `${root}trainerize-alternative-hrvatska` },
    { type: 'internal-link', text: '→ Aplikacija za fitness trenere: što mali coaching posao stvarno treba', href: `${root}aplikacija-za-fitness-trenere` },
  ],
  'savjeti-za-check-in-razgovore': (root) => [
    { type: 'paragraph', text: 'Check-in drži online odnos na okupu kad ima jasna pitanja i kad znaš što s odgovorima. Sljedeći tekstovi pomažu ga postaviti i zadržati klijente dulje.' },
    { type: 'internal-link', text: '→ Što je check-in u online coachingu i kako ga postaviti', href: `${root}sto-je-check-in-online-coaching` },
    { type: 'internal-link', text: '→ Kako zadržati online klijenta dulje od nekoliko mjeseci', href: `${root}kako-zadrzati-online-klijenta` },
  ],
  'kako-postaviti-cijene': (root) => [
    { type: 'paragraph', text: 'Uz postavljanje cijena, korisno je znati i kako naplata funkcionira u praksi. Ova dva vodiča pokrivaju iste teme iz drugog kuta.' },
    { type: 'internal-link', text: '→ Koliko naplačivati online osobni trening (realne cifre za HR tržište)', href: `${root}koliko-naplacivati-online-personal-trening` },
    { type: 'internal-link', text: '→ Kako naplatiti online coaching: kanali, računi, rutina', href: `${root}kako-naplatiti-online-coaching-hrvatska` },
  ],
  'automatizacija-u-coachingu': (root) => [
    { type: 'paragraph', text: 'Automatizacija ima smisla kad vidiš koliko sati tjedno ode na administraciju i kako to povezuješ s redom oko klijenata, a ne samo s kratkim “ako ovo, ono” pravilima.' },
    { type: 'internal-link', text: '→ Koliko vremena tjedno treba za 10, 20 i 30 online klijenata', href: `${root}koliko-vremena-za-online-klijente` },
    { type: 'internal-link', text: '→ Kako organizirati online klijente', href: `${root}kako-organizirati-online-klijente` },
  ],
  'aplikacija-za-fitness-trenere': (root) => [
    { type: 'paragraph', text: 'Prije kupnje pročitaj i širu sliku: što platforma u poslu zapravo pokriva i kako je usporediti s drugim velikim imenima u tom prostoru.' },
    { type: 'internal-link', text: '→ Online coaching i platforma - što trener u praksi kupuje', href: `${root}online-coaching-treneri-platforma` },
    { type: 'internal-link', text: '→ MyPTHub alternative za trenere u Hrvatskoj (jezik, cijene, fokus)', href: `${root}mypthub-alternative-hrvatska` },
  ],
  'online-coaching-posao-vodic': (root) => [
    { type: 'paragraph', text: 'Dok radiš na vidljivosti i novim klijentima, paralelno vrijede taktike koje ne ovise o jednom oglasu i jasan sustav za rad s ljudima.' },
    { type: 'internal-link', text: '→ Kako povećati bazu klijenata (dugoročnije, ne “još 100 leadova u sat vremena”)', href: `${root}kako-povecati-bazu-klijenata` },
    { type: 'internal-link', text: '→ Kako postati online osobni trener u Hrvatskoj - korak po korak', href: `${root}kako-postati-online-personal-trener` },
  ],
  'online-coaching-treneri-platforma': (root) => [
    { type: 'paragraph', text: 'Usporedbe pomažu: jednom gledaš globalni alat, drugi put pitaš je li ti tablica još uvijek dovoljna za broj klijenata koje stvarno vodiš.' },
    { type: 'internal-link', text: '→ TrueCoach alternative za one koji traže manje bespotrebnog šuma u meniju', href: `${root}truecoach-alternative` },
    { type: 'internal-link', text: '→ Zašto Excel nije dugačak plan kad broj klijenata raste', href: `${root}zasto-excel-nije-dovoljan` },
  ],
  'kako-zaraditi-vise-kao-online-fitness-trener': (root) => [
    { type: 'paragraph', text: 'Brojke i cijene idu zajedno: često “više para” znači bolji paket i jasnija naplata, a ne nužno duži radni tjedan.' },
    { type: 'internal-link', text: '→ Kako postaviti cijene (i prestati se tretirati kao “jeftiniju opciju” po defaultu)', href: `${root}kako-postaviti-cijene` },
    { type: 'internal-link', text: '→ Kako naplatiti online coaching u praksi (kanali i očekivanja)', href: `${root}kako-naplatiti-online-coaching-hrvatska` },
  ],
  'kako-naplatiti-online-coaching-hrvatska': (root) => [
    { type: 'paragraph', text: 'Kad slažeš naplatu, pomaže imati u glavi i okvir cijena na tržištu, ne samo jednu brojku bez konteksta.' },
    { type: 'internal-link', text: '→ Koliko naplačivati online osobni trening (okviri, ne pogađanje)', href: `${root}koliko-naplacivati-online-personal-trening` },
    { type: 'internal-link', text: '→ Kako postaviti cijene - od očekivanja do paketa koje ljudima ima smisla platiti', href: `${root}kako-postaviti-cijene` },
  ],
  'koliko-naplacivati-online-personal-trening': (root) => [
    { type: 'paragraph', text: 'Kad fiksiraš cifru, korisno je znati kako je povezuješ s ponudom, naplatom i nastavkom suradnje - a ne “samo jedan račun mjesečno”.' },
    { type: 'internal-link', text: '→ Kako postaviti cijene', href: `${root}kako-postaviti-cijene` },
    { type: 'internal-link', text: '→ Kako naplatiti online coaching: što radi većina trenera s kojima pričamo', href: `${root}kako-naplatiti-online-coaching-hrvatska` },
  ],
  'kako-organizirati-online-klijente': (root) => [
    { type: 'paragraph', text: 'Organizacija nije samo imena u mapama: trebaju ti i tjedni signali od klijenta i jedno mjesto za njih koje nije 400 poruka u chatu.' },
    { type: 'internal-link', text: '→ Savjeti za bolje check-in razgovore (struktura pitanja, manje “što misliš o ovome danas?” u pet kanala)', href: `${root}savjeti-za-check-in-razgovore` },
    { type: 'internal-link', text: '→ Onboarding u prvom tjednu: što napraviti prije nego očekivanja puknu u “nisam znao što očekivati”', href: `${root}onboarding-novi-klijent` },
  ],
  'trainerize-alternative-hrvatska': (root) => [
    { type: 'paragraph', text: 'Ako čitaš usporedbe, otvori i druga velika imena i jednu jednostavniju opciju da ne biraš prvi rezultat na Googleu iz navike.' },
    { type: 'internal-link', text: '→ MyPTHub alternative za trenere u Hrvatskoj (fokus, jezik, cijene)', href: `${root}mypthub-alternative-hrvatska` },
    { type: 'internal-link', text: '→ TrueCoach alternative - kratko, bez diranja broja opcija u meniju koje nikad ne otvoriš', href: `${root}truecoach-alternative` },
  ],
}

const AUG_EN: Record<string, (root: string) => BlogBlock[]> = {
  'how-to-grow-your-client-base': (root) => [
    { type: 'paragraph', text: 'Growth tactics work better when plans and check-ins live in one place - so new clients are not just more DMs in another thread.' },
    { type: 'internal-link', text: '→ Online coaching business: what to fix first in the first 90 days', href: `${root}online-coaching-business-guide` },
    { type: 'internal-link', text: '→ A practical weekly check-in template (copy, paste, adapt)', href: `${root}client-check-in-template` },
  ],
  'why-excel-is-not-enough': (root) => [
    { type: 'paragraph', text: 'If you are already comparing software, a head-to-head comparison plus a purpose-built app help you tell a polished demo from something you will actually use every week.' },
    { type: 'internal-link', text: '→ Best personal trainer app for a small business (2026)', href: `${root}best-personal-trainer-app-2026` },
    { type: 'internal-link', text: '→ What a client-facing fitness app needs to do for a coach in practice', href: `${root}fitness-trainer-app` },
  ],
  'tips-for-better-check-ins': (root) => [
    { type: 'paragraph', text: 'Check-ins tie together habit and measurable progress - both are worth reading next, in either order.' },
    { type: 'internal-link', text: '→ How to track client progress without drowning in files', href: `${root}how-to-track-client-progress` },
    { type: 'internal-link', text: '→ A free check-in question list you can paste into your process', href: `${root}client-check-in-template` },
  ],
  'how-to-set-your-prices': (root) => [
    { type: 'paragraph', text: 'Pricing is easier to stand behind when you can point to the full client experience and how you run the business, not a single number with no context.' },
    { type: 'internal-link', text: '→ How to earn more as an online coach (systems, not more panic hours)', href: `${root}earn-more-as-online-fitness-trainer` },
    { type: 'internal-link', text: '→ A plain-language guide to the online coaching business', href: `${root}online-coaching-business-guide` },
  ],
  'automation-in-coaching': (root) => [
    { type: 'paragraph', text: 'Automation is only as useful as the data you feed it - weekly progress and rhythm matter as much as who gets which email.' },
    { type: 'internal-link', text: '→ How to track client progress as an online coach', href: `${root}how-to-track-client-progress` },
    { type: 'internal-link', text: '→ Best apps for a small coaching business in 2026 (honest comparison)', href: `${root}best-personal-trainer-app-2026` },
  ],
  'fitness-trainer-app': (root) => [
    { type: 'paragraph', text: 'You can compare feature lists faster when you also read a dedicated comparison and a straight explanation of what a full platform is meant to do.' },
    { type: 'internal-link', text: '→ Best personal trainer app (2026) for coaches with 5–50 clients', href: `${root}best-personal-trainer-app-2026` },
    { type: 'internal-link', text: '→ Online coaching platform guide: what you are actually buying', href: `${root}online-coaching-platform-guide` },
  ],
  'online-coaching-business-guide': (root) => [
    { type: 'paragraph', text: 'When the business model is clear, the work shifts to growing clients and keeping a weekly rhythm without drowning in busywork and loose files.' },
    { type: 'internal-link', text: '→ How to grow your online client base (practical tactics, not a lecture)', href: `${root}how-to-grow-your-client-base` },
    { type: 'internal-link', text: '→ Why Excel stops scaling for remote clients', href: `${root}why-excel-is-not-enough` },
  ],
  'online-coaching-platform-guide': (root) => [
    { type: 'paragraph', text: 'A platform article is easier to trust next to a focused app review and an honest look at whether generic office tools are still enough.' },
    { type: 'internal-link', text: '→ Best personal trainer app for a small business (2026 comparison)', href: `${root}best-personal-trainer-app-2026` },
    { type: 'internal-link', text: '→ Why spreadsheets are not a client hub once check-ins and plans live in five places at once', href: `${root}why-excel-is-not-enough` },
  ],
  'earn-more-as-online-fitness-trainer': (root) => [
    { type: 'paragraph', text: 'Earning more usually comes down to systems, price, and time per client - not a vague "I just need 12 more people" target.' },
    { type: 'internal-link', text: '→ How to set your prices (packages, positioning, not guilt pricing)', href: `${root}how-to-set-your-prices` },
    { type: 'internal-link', text: '→ How to track client progress (so you can change programs on evidence)', href: `${root}how-to-track-client-progress` },
  ],
}

const CTA_HR: Record<string, Omit<BlogPostCta, 'href'> & { path: string }> = {
  'kako-povecati-bazu-klijenata': { text: 'Jedan jasan sljedeći korak: isprobaj alat u kojem odmah dodaješ klijente i držiš ih u sustavu, umjesto da gubiš vrijeme u beskonačnim porukama.', btn: 'Kreni besplatno i dodaj prve klijente →', path: '/cijene' },
  'kako-zaraditi-vise-kao-online-fitness-trener': { text: 'Veći prihod često dolazi od boljeg sustava i cijene, a ne od dužeg tjedna. Poveži to s praksom gdje i ti i klijent radite u jednom mjestu.', btn: 'Kreni besplatno i dodaj prve klijente →', path: '/cijene' },
  'online-coaching-posao-vodic': { text: 'Kad vidiš kako posao funkcionira, sljedeći je korak alat koji ne pojede sav tvoj tjedan na administraciju - da ti ostane vremena za stvaran rad s ljudima.', btn: 'Kreni besplatno i dodaj prve klijente →', path: '/cijene' },
  'automatizacija-u-coachingu': { text: 'Automatizacija ima smisla kad cijela priča s klijentom nije u pet tabova. Pogledaj kako izgleda kad raspored, plan i poruke žive u jednom sustavu.', btn: 'Kreni besplatno i dodaj prve klijente →', path: '/cijene' },
  'kako-postaviti-cijene': { text: 'Kad cifra drži vodu, uskladi je s pretplatom i s onim što klijent u aplikaciji uopće vidi. Usporedba planova pomaže odluci.', btn: 'Izračunaj koji plan ti odgovara →', path: '/cijene' },
  'koliko-naplacivati-online-personal-trening': { text: 'Kad znaš brojke, odaberi plan koji ne kažnjava rano širenje. Pogledaj cijene u kontekstu onoga što UnitLift uključuje za treninge, check-ine i klijente.', btn: 'Izračunaj koji plan ti odgovara →', path: '/cijene' },
  'kako-naplatiti-online-coaching-hrvatska': { text: 'Kad znaš kako naplata funkcionira, sljedeći korak je imati plaćanja, planove i check-ine za svakog klijenta na jednom mjestu.', btn: 'Izračunaj koji plan ti odgovara →', path: '/cijene' },
  'kako-organizirati-online-klijente': { text: 'Organizacija nisu samo imena u tablici, nego i jasan tjedni ritam u jednom alatu. Pogledaj kako to izgleda u praksi: jedan ekran za tebe, jedan za klijenta.', btn: 'Vidi kako UnitLift organizira klijente →', path: '/kako-radi' },
  'savjeti-za-check-in-razgovore': { text: 'Check-in je središnji dio online rada: podsjetnici, povijest i tjedni pregled na jednom mjestu, umjesto pet kanala.', btn: 'Vidi kako check-in radi u UnitLiftu →', path: '/kako-radi' },
  'zasto-excel-nije-dovoljan': { text: 'Ne treba ti savršen setup prvog dana. Četrnaest dana dosta je da vidiš svakodnevni rad: klijent vidi jasno što ga čeka u tjednu, a ti vidiš isti plan i check-in na jednom mjestu.', btn: 'Isprobaj UnitLift 14 dana besplatno →', path: '/cijene' },
  'aplikacija-za-fitness-trenere': { text: 'Isprobaj u praksi što znači aplikacija za treninge i klijente kad oboje gledate isti raspored i plan, umjesto pet verzija u prilogu e-pošte.', btn: 'Isprobaj UnitLift 14 dana besplatno →', path: '/cijene' },
  'online-coaching-treneri-platforma': { text: 'Velike platforme često imaju meni dugačak kao katalog. UnitLift drži fokus na klijentima, tjednom radu i treningu - probaj 14 dana besplatno prije odluke.', btn: 'Isprobaj UnitLift 14 dana besplatno →', path: '/cijene' },
  'trainerize-alternative-hrvatska': { text: 'Usporedba u tekstu pomaže, ali odluku brže doneseš kad isprobaš domaći proizvod, hrvatsko sučelje i ista očekivanja za tebe i klijenta u jednom mjestu.', btn: 'Isprobaj UnitLift 14 dana besplatno →', path: '/cijene' },
}

const CTA_EN: Record<string, Omit<BlogPostCta, 'href'> & { path: string }> = {
  'how-to-grow-your-client-base': { text: 'Tactics are easier when you have one clear workflow for a client, not just another inbox. Start free, add a few people, and see the difference in a week.', btn: 'Start free and add your first clients →', path: '/cijene' },
  'earn-more-as-online-fitness-trainer': { text: 'Earning more is usually a systems and pricing job before it is a "work more hours" job. See how the full week feels when everything sits in one place.', btn: 'Start free and add your first clients →', path: '/cijene' },
  'online-coaching-business-guide': { text: 'Once the model is clear, the limit is how you run it day to day. Use a two-week trial to walk from sign-up to a real weekly check-in.', btn: 'Start free and add your first clients →', path: '/cijene' },
  'automation-in-coaching': { text: 'Automation is only as good as the data that lives in the same system as the client. See what a normal week looks like for both sides in UnitLift.', btn: 'Start free and add your first clients →', path: '/cijene' },
  'how-to-set-your-prices': { text: 'After you pick a number, line it up with a plan that matches your pace. The pricing page lays out the options without guesswork.', btn: 'Find the plan that matches you →', path: '/cijene' },
  'why-excel-is-not-enough': { text: 'You do not need a perfect stack on day one. Fourteen days is enough to feel a real week where the client sees a clear plan and you see the same check-in in one place.', btn: 'Try UnitLift free for 14 days →', path: '/cijene' },
  'tips-for-better-check-ins': { text: 'The check-in is the heart of the work: reminders, history, and a weekly review in one place, not five different apps.', btn: 'See how check-ins work in UnitLift →', path: '/kako-radi' },
  'fitness-trainer-app': { text: 'Try what a client app means in practice when both sides share the same week and plan instead of five email attachments.', btn: 'Try UnitLift free for 14 days →', path: '/cijene' },
  'online-coaching-platform-guide': { text: 'Big global platforms often ship a menu the size of a phone book. UnitLift keeps focus on clients, the week, and training - try 14 days free before you decide.', btn: 'Try UnitLift free for 14 days →', path: '/cijene' },
}

function withLocalePath(locale: string, path: string): string {
  return `/${locale}${path.startsWith('/') ? path : `/${path}`}`
}

function isNewPost(locale: string, slug: string) {
  return locale === 'hr' ? NEW_HR_SLUGS.has(slug) : NEW_EN_SLUGS.has(slug)
}

export function getAugmentedContent(post: BlogPost, locale: string): BlogBlock[] {
  if (isNewPost(locale, post.slug)) return post.content
  const root = blogRoot(locale)
  if (locale === 'hr') {
    const add = AUG_HR[post.slug]?.(root)
    if (add?.length) {
      return [post.content[0], ...add, ...post.content.slice(1)]
    }
  }
  if (locale === 'en') {
    const add = AUG_EN[post.slug]?.(root)
    if (add?.length) {
      return [post.content[0], ...add, ...post.content.slice(1)]
    }
  }
  return post.content
}

export function getResolvedCta(post: BlogPost, locale: string): BlogPostCta {
  if (post.cta) {
    return {
      text: post.cta.text,
      btn: post.cta.btn,
      href: withLocalePath(locale, post.cta.href.startsWith('/') ? post.cta.href : `/${post.cta.href}`),
    }
  }
  const row = locale === 'hr' ? CTA_HR[post.slug] : CTA_EN[post.slug]
  if (row) {
    return { text: row.text, btn: row.btn, href: withLocalePath(locale, row.path) }
  }
  return {
    text: '', // use fallbacks in UI
    btn: '',
    href: withLocalePath(locale, '/cijene'),
  }
}

export function getMetaPageTitle(post: BlogPost) {
  return post.metaTitle ?? post.title
}

export function getMetaPageDescription(post: BlogPost) {
  return post.metaDescription ?? post.excerpt
}
