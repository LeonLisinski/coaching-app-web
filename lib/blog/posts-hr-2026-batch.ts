import type { BlogPost } from './types'
import { blogPostsHr2026Rest } from './posts-hr-2026-more'

const author = {
  author: 'Leon',
  authorRole: 'Osobni trener i vlasnik UnitLift-a',
} as const

/**
 * Nove HR objave (travanj 2026.). Redoslijed: najnovije prve na listi.
 * Interne poveznice: slug odredi s `blogRoot` = `/${locale}/blog/`
 */
export const blogPostsHr2026: BlogPost[] = [
  {
    slug: 'mypthub-alternative-hrvatska',
    title: 'MyPTHub alternative za trenere u Hrvatskoj',
    excerpt: 'Tražiš alternativu za MyPTHub? Evo iskrene usporedbe coaching aplikacija za trenere koji rade s klijentima u Hrvatskoj.',
    category: 'Alati',
    categorySlug: 'alati',
    readTime: 7,
    publishedAt: '20. travnja 2026.',
    ...author,
    metaTitle: 'MyPTHub alternative za HR trenere | Usporedba 2026',
    metaDescription: 'Tražiš alternativu za MyPTHub? Evo iskrene usporedbe coaching aplikacija za trenere koji rade s klijentima u Hrvatskoj.',
    cta: {
      text: 'Isprobaj UnitLift 14 dana besplatno. Postavljanje traje oko 5 minuta, bez tehničkog znanja. Aplikacija i podrška su na hrvatskom.',
      btn: 'Isprobaj UnitLift 14 dana besplatno →',
      href: '/cijene',
    },
    content: [
      { type: 'paragraph', text: 'MyPTHub je jedan od poznatijih alata za online trenere. Ako radiš s klijentima u Hrvatskoj, ključno pitanje je jedno: vrijedi li cijena i kompleksnost za ono što ti zapravo trebaš.' },
      { type: 'paragraph', text: 'U ovom tekstu prolazimo što MyPTHub radi dobro, gdje zapinje kod nas i kako izgleda hrvatska alternativa. Ista logika vrijedi i za Trainerize pa možeš usporediti oba članka.' },
      { type: 'internal-link', text: '→ Trainerize alternative za trenere u Hrvatskoj', href: '/hr/blog/trainerize-alternative-hrvatska' },

      { type: 'heading', text: 'Što MyPTHub radi dobro' },
      { type: 'paragraph', text: 'MyPTHub ima veliku bazu vježbi, video biblioteku i pakete. Integracije, izvještaji i grupni treninzi rade na razini velike platforme.' },
      { type: 'paragraph', text: 'Ako vodiš više od 50 klijenata i trebaš sve to, dobro pokriva posao. Pitanje je hoćeš li zaista koristiti većinu tih funkcija.' },

      { type: 'heading', text: 'Gdje MyPTHub ne odgovara HR tržištu' },
      { type: 'list', items: [
        'Sučelje i klijentska aplikacija su na engleskom',
        'Cijena je u američkim dolarima',
        'Računi i pretplate nisu prilagođeni za hrvatske klijente',
        'Podrška ne radi na hrvatskom',
        'Klijenti se ponekad muče s engleskim sučeljem',
      ]},

      { type: 'heading', text: 'Kako odabrati između dva alata' },
      { type: 'list', items: [
        'Koliko klijenata stvarno vodiš svaki mjesec',
        'Koliko puta tjedno otvaraš plan, pišeš poruku i gledaš uplate',
        'Treba li tvom klijentu sučelje na hrvatskom',
        'Koliko od ponuđenih funkcija zaista koristiš',
      ]},
      { type: 'internal-link', text: '→ TrueCoach alternative za online trenere', href: '/hr/blog/truecoach-alternative' },

      { type: 'heading', text: 'Kad ima smisla hrvatska aplikacija' },
      { type: 'paragraph', text: 'Ako vodiš do 50 klijenata, UnitLift ti daje planove, check-in, poruke i plaćanja na jednom mjestu. Aplikacija je na hrvatskom, cijene su u eurima, podrška odgovara na hrvatskom.' },
      { type: 'paragraph', text: 'Klijent dobije besplatnu mobilnu aplikaciju. Vidi svoj plan treninga i prehrane, šalje check-in i piše ti direktno iz aplikacije.' },

      { type: 'heading', text: 'Tri koraka ako razmišljaš o promjeni' },
      { type: 'list', items: [
        'Zapiši što trebaš svaki tjedan: plan, check-in, poruka, uplata',
        'Otvori jednu usporedbu (TrueCoach ili Trainerize) za širi pogled',
        'Probaj UnitLift 14 dana s dva stvarna klijenta',
      ]},
      { type: 'internal-link', text: '→ Zašto Excel nije dovoljan za online klijente', href: '/hr/blog/zasto-excel-nije-dovoljan' },

      { type: 'heading', text: 'Česta pitanja' },
      { type: 'subheading', text: 'Je li MyPTHub na hrvatskom?' },
      { type: 'paragraph', text: 'Nije. Sučelje i klijentska aplikacija su na engleskom.' },
      { type: 'subheading', text: 'Je li MyPTHub prevelik za 12 klijenata?' },
      { type: 'paragraph', text: 'Najčešće jest. Plaćaš funkcije koje nećeš koristiti, a učenje oduzima više vremena nego koristi.' },
      { type: 'subheading', text: 'Koliko stvarno košta MyPTHub?' },
      { type: 'paragraph', text: 'Osnovna cijena zvuči nisko, ali se dodaju stavke po klijentu i moduli. Izračunaj ukupan mjesečni trošak prije usporedbe.' },
      { type: 'subheading', text: 'Hoće li moji klijenti znati koristiti MyPTHub?' },
      { type: 'paragraph', text: 'Ako su navikli na engleski, da. Ako nisu, očekuj pitanja i tihe odustajalice.' },
      { type: 'subheading', text: 'Mogu li prebaciti klijente s MyPTHub-a?' },
      { type: 'paragraph', text: 'Da. Najvažnije je klijente najaviti tjedan dana ranije i pripremiti kratke upute za novu aplikaciju.' },
    ],
  },
  {
    slug: 'truecoach-alternative',
    title: 'TrueCoach alternative za online trenere',
    excerpt: 'Koristiš TrueCoach ali tražiš nešto jednostavnije ili jeftinije? Evo što drugi treneri koriste umjesto.',
    category: 'Alati',
    categorySlug: 'alati',
    readTime: 6,
    publishedAt: '20. travnja 2026.',
    ...author,
    metaTitle: 'TrueCoach alternative za fitness trenere | 2026',
    metaDescription: 'Koristiš TrueCoach ali tražiš nešto jednostavnije ili jeftinije? Evo što drugi treneri koriste umjesto.',
    cta: {
      text: 'Isprobaj UnitLift 14 dana besplatno. Planovi, check-in, poruke i plaćanja na jednom mjestu, na hrvatskom.',
      btn: 'Isprobaj UnitLift 14 dana besplatno →',
      href: '/cijene',
    },
    content: [
      { type: 'paragraph', text: 'TrueCoach je popularan kod trenera s 10 do 50 klijenata. Daje čist prikaz vježbi i videa, ali prehrana, uplate i check-in često žive u drugim alatima.' },
      { type: 'paragraph', text: 'Ako trošiš sate tjedno prebacujući između aplikacija, vrijedi pogledati alternative. U ovom tekstu uspoređujemo TrueCoach s hrvatskom aplikacijom UnitLift.' },
      { type: 'internal-link', text: '→ MyPTHub usporedba za trenere u Hrvatskoj', href: '/hr/blog/mypthub-alternative-hrvatska' },
      { type: 'internal-link', text: '→ Zašto Excel nije dovoljan kad broj klijenata raste', href: '/hr/blog/zasto-excel-nije-dovoljan' },

      { type: 'heading', text: 'Što TrueCoach radi dobro' },
      { type: 'paragraph', text: 'TrueCoach ima čisto sučelje za planove treninga i video vježbe. Klijenti lako prate trening iz mobitela.' },
      { type: 'paragraph', text: 'Ako su ti treninzi glavni dio posla, a prehranu i plaćanja vodiš drugdje, TrueCoach pokriva svoj dio solidno.' },

      { type: 'heading', text: 'Gdje TrueCoach zapinje' },
      { type: 'list', items: [
        'Sučelje i aplikacija su na engleskom',
        'Nema naplate ni plaćanja unutar aplikacije',
        'Prehrana se rješava kroz druge alate',
        'Cijena je u dolarima i raste po klijentu',
        'Podrška ne radi na hrvatskom',
      ]},

      { type: 'heading', text: 'Kad trener traži nešto jednostavnije' },
      { type: 'paragraph', text: 'Češći razlog za promjenu nije cijena, nego broj alata. Plan je u TrueCoach-u, prehrana u Google dokumentu, uplate u tablici, poruke u WhatsApp-u.' },
      { type: 'paragraph', text: 'U tri mjeseca trener izgubi sate na prebacivanje podataka. Tada ima smisla jedan alat koji pokriva cijeli tjedan.' },

      { type: 'heading', text: 'Kad ima smisla hrvatska aplikacija' },
      { type: 'paragraph', text: 'UnitLift drži plan treninga, prehranu, check-in, poruke i plaćanja na jednom mjestu. Aplikacija je na hrvatskom, klijent i ti gledate isti raspored.' },
      { type: 'paragraph', text: 'Klijent dobije besplatnu mobilnu aplikaciju. Otvara plan treninga, šalje check-in i piše ti bez instalacije dodatnih alata.' },
      { type: 'internal-link', text: '→ Online coaching platforma - što trener zapravo kupuje', href: '/hr/blog/online-coaching-treneri-platforma' },

      { type: 'heading', text: 'Što napraviti u 14 dana testa' },
      { type: 'list', items: [
        'Dodaj dva stvarna klijenta i napravi im plan',
        'Postavi jedan tjedni check-in s istim pitanjima',
        'Pošalji poruke i isprati jednu uplatu',
        'Nakon tjedan dana pogledaj koliko si alata otvorio',
      ]},

      { type: 'heading', text: 'Česta pitanja' },
      { type: 'subheading', text: 'Je li TrueCoach na hrvatskom?' },
      { type: 'paragraph', text: 'Nije. Sučelje i klijentska aplikacija su na engleskom.' },
      { type: 'subheading', text: 'Ima li TrueCoach plaćanja unutar aplikacije?' },
      { type: 'paragraph', text: 'Ne. Naplatu i pakete rješavaš vanjskim alatima.' },
      { type: 'subheading', text: 'Što ako klijent odbija još jednu aplikaciju?' },
      { type: 'paragraph', text: 'Jedna aplikacija s planom, check-inom i porukama obično je prihvatljivija od tri različita alata.' },
      { type: 'subheading', text: 'Hoće li prelazak obrisati povijest vježbi?' },
      { type: 'paragraph', text: 'Ovisi o formatu izvoza iz TrueCoach-a. Najvažnije podatke možeš prepisati u novi plan za nekoliko sati.' },
      { type: 'subheading', text: 'Je li ovo isto kao Trainerize u Hrvatskoj?' },
      { type: 'paragraph', text: 'Vrlo slično. Trainerize ima širu ponudu funkcija, ali isti problemi s jezikom i valutom vrijede.' },
    ],
  },
  ...blogPostsHr2026Rest,
]
