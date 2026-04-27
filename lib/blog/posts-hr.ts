import type { BlogPost } from './types'
import { blogPostsHr2026 } from './posts-hr-2026-batch'

export { blogPostsHr2026 }

const author = {
  author: 'Leon',
  authorRole: 'Osobni trener i vlasnik UnitLift-a',
} as const

export const postsHr: BlogPost[] = [
  ...blogPostsHr2026,
  {
    slug: 'kako-povecati-bazu-klijenata',
    title: 'Kako povećati bazu klijenata',
    excerpt: 'Devet provjerenih taktika kojima fitness treneri privlače nove klijente bez skupih reklama i marketinških agencija.',
    category: 'Vodič',
    categorySlug: 'vodic',
    readTime: 6,
    publishedAt: '14. ožujka 2026.',
    ...author,
    content: [
      { type: 'paragraph', text: 'Rast baze klijenata je najveći izazov svakog online trenera. Dobra vijest je da ti za to ne trebaju skupi oglasi.' },
      { type: 'paragraph', text: 'U ovom tekstu prolazimo devet taktika koje stvarno rade. Sve su testirane s trenerima koje pratimo na hrvatskom tržištu.' },

      { type: 'heading', text: '1. Definiraj idealnog klijenta' },
      { type: 'paragraph', text: 'Najčešća greška je pokušati raditi sa svima. Što uža niša, to bolja konverzija.' },
      { type: 'paragraph', text: 'Primjer: žene 35 do 45 godina koje žele trčati prvi polumaraton. Jasna skupina, jasan cilj.' },

      { type: 'heading', text: '2. Sadržaj koji rješava problem' },
      { type: 'paragraph', text: 'Instagram i TikTok ne plaćaju, ali donose klijente. Objavljuj sadržaj koji odgovara na pitanja tvog idealnog klijenta.' },
      { type: 'paragraph', text: 'Kratki video s jednim savjetom radi bolje od dugog posta. Objavi jednom dnevno, ne deset puta tjedno.' },

      { type: 'heading', text: '3. Traži preporuke postojećih klijenata' },
      { type: 'paragraph', text: 'Zadovoljan klijent je najbolji marketing. Ponudi mali popust svakome tko ti dovede novu osobu.' },
      { type: 'paragraph', text: 'Preporuka konvertira bolje od bilo kojeg oglasa. Samo se moraš sjetiti tražiti.' },

      { type: 'heading', text: '4. Besplatna probna sesija' },
      { type: 'paragraph', text: 'Ponudi jedan do dva tjedna probnog perioda. To smanjuje strah od ulaganja.' },
      { type: 'paragraph', text: 'Ako je tvoja usluga dobra, klijent ostaje. Ako nije, dobro je da si doznao rano.' },

      { type: 'heading', text: '5. Brzi onboarding' },
      { type: 'paragraph', text: 'Prvi tjedan gradi ili ruši odnos. Klijent koji odmah ima plan, upitnik i jasna pravila ostaje dulje.' },
      { type: 'list', items: [
        'Odgovori na upit unutar dva sata',
        'Pošalji welcome paket s planom i očekivanjima',
        'Postavi automatski podsjetnik za prvi check-in',
        'Traži povratnu informaciju nakon mjesec dana',
      ]},

      { type: 'heading', text: '6. Video testimonijali' },
      { type: 'paragraph', text: 'Pisani testimonijal manje vrijedi od kratkog videa klijenta. Traži video poruku nakon tri mjeseca rada.' },

      { type: 'heading', text: '7. Lokalna mreža' },
      { type: 'paragraph', text: 'Povezuj se s nutricionistima, fizioterapeutima i liječnicima. Oni šalju klijente jedni drugima.' },

      { type: 'heading', text: '8. Jasna cijena na profilu' },
      { type: 'paragraph', text: 'Skrivena cijena smanjuje broj upita. Napiši cijenu paketa vidljivo, makar i kao “od 99 eura”.' },

      { type: 'heading', text: '9. Redovito objavljivanje' },
      { type: 'paragraph', text: 'Tri do četiri objave tjedno kroz šest mjeseci donose rezultat. Jednokratne kampanje rijetko vrate uloženo.' },

      { type: 'paragraph', text: 'S ovim taktikama većina trenera koje pratimo dobije tri do pet novih klijenata u prvih 90 dana, bez plaćenih oglasa.' },
    ],
  },
  {
    slug: 'zasto-excel-nije-dovoljan',
    title: 'Zašto Excel nije dovoljan za vođenje klijenata',
    excerpt: 'Excel je dobar za početak, ali kad broj klijenata raste trebaš pravo rješenje. Evo zašto.',
    category: 'Alati',
    categorySlug: 'alati',
    readTime: 4,
    publishedAt: '11. ožujka 2026.',
    ...author,
    content: [
      { type: 'paragraph', text: 'Mnogi treneri počinju s Excelom. Jedan sheet po klijentu, formule za kalorije, boje za tjedne. Izgleda uredno dok ne dobiješ 12 klijenata.' },
      { type: 'paragraph', text: 'U ovom tekstu prolazimo zašto Excel prestaje raditi kod većeg broja klijenata i kad je pravo vrijeme za pravu aplikaciju.' },

      { type: 'heading', text: 'Gdje Excel pada' },
      { type: 'list', items: [
        'Nema automatskih podsjetnika za check-in',
        'Klijent ne može otvoriti plan iz mobitela',
        'Svaka promjena traži ručno ažuriranje',
        'Poruke su u WhatsAppu, uplate u posebnom dokumentu',
        'Nema mjesta za fotografije napretka klijenta',
      ]},

      { type: 'heading', text: 'Koliko vremena zaista gubiš' },
      { type: 'paragraph', text: 'Prosječan trener s 15 klijenata troši 8 do 12 sati tjedno na administraciju. To je gotovo jedan radni dan svaki tjedan.' },
      { type: 'paragraph', text: 'Prevodi to u novac: ako ti je sat vrijedan 30 eura, to je preko 1000 eura mjesečno koje daješ copy-paste poslu.' },

      { type: 'heading', text: 'Kad je vrijeme za promjenu' },
      { type: 'paragraph', text: 'Ako imaš pet ili više aktivnih klijenata i osjećaš da administracija jede vrijeme, imaš jasan signal.' },
      { type: 'paragraph', text: 'Aplikacija ti daje automatske podsjetnike, mobilni pristup za klijenta, komunikaciju na jednom mjestu i pregled uplata. Excel to ne može.' },

      { type: 'internal-link', text: '→ Pogledaj što UnitLift nudi za online trenere', href: '/hr/software-za-online-fitness-trenere' },
    ],
  },
  {
    slug: 'savjeti-za-check-in-razgovore',
    title: 'Pet savjeta za bolje check-in razgovore s klijentima',
    excerpt: 'Kako postaviti tjedni check-in tako da klijenti budu motivirani, a ti uvijek informiran.',
    category: 'Klijenti',
    categorySlug: 'klijenti',
    readTime: 5,
    publishedAt: '7. ožujka 2026.',
    ...author,
    content: [
      { type: 'paragraph', text: 'Check-in je srce online coachinga. Bez njega planovi ostaju teorija, a klijenti tiho odustaju.' },
      { type: 'paragraph', text: 'Evo pet savjeta kako postaviti check-in koji klijentima daje motivaciju, a tebi jasnu sliku.' },

      { type: 'heading', text: '1. Standardiziraj pitanja' },
      { type: 'paragraph', text: 'Različita pitanja za svakog klijenta zvuče lijepo, ali oduzimaju previše vremena. Napravi jedan standardni upitnik.' },
      { type: 'paragraph', text: 'Pokrij osnovu: težina, energija, san, broj odrađenih treninga i jedno slobodno polje. Šest pitanja je taman.' },

      { type: 'heading', text: '2. Automatski podsjetnik' },
      { type: 'paragraph', text: 'Klijenti zaboravljaju. To nije loš znak, samo su zauzeti. Automatski podsjetnik diže stopu odgovora sa 40 na 85 posto.' },

      { type: 'heading', text: '3. Odgovori unutar 24 sata' },
      { type: 'paragraph', text: 'Klijent koji brzo dobije odgovor ostaje dulje i lakše preporučuje. Rezerviraj blok vremena za check-inove svaki tjedan.' },

      { type: 'heading', text: '4. Hvali napredak, ne samo rezultate' },
      { type: 'paragraph', text: 'Kilogrami i centimetri su samo dio priče. Klijent koji se vratio nakon bolesti napreduje, čak i bez pada težine.' },

      { type: 'heading', text: '5. Čuvaj povijest' },
      { type: 'paragraph', text: 'Svaki check-in je podatak. Kroz tri do šest mjeseci vidiš obrasce: tko najčešće odustaje, što klijente motivira.' },

      { type: 'list', items: [
        'Standardni upitnik: manje vremena, više podataka',
        'Automatski podsjetnik: veći odaziv',
        'Brz odgovor: veće zadovoljstvo',
        'Hvaljenje truda: dulje zadržavanje',
        'Povijest check-inova: pametnije prilagodbe',
      ]},
    ],
  },
  {
    slug: 'kako-postaviti-cijene',
    title: 'Kako postaviti cijene kao online fitness trener',
    excerpt: 'Prestani se podcjenjivati. Vodič za postavljanje cijena koji uzima u obzir vrijednost i tržište.',
    category: 'Rast',
    categorySlug: 'rast',
    readTime: 7,
    publishedAt: '1. ožujka 2026.',
    ...author,
    content: [
      { type: 'paragraph', text: 'Cijena je tema gdje se najviše trenera blokira. Strah od odbijanja vodi u podcjenjivanje.' },
      { type: 'paragraph', text: 'U ovom tekstu prolazimo kako izračunati realnu cijenu i kako ju komunicirati bez straha.' },

      { type: 'heading', text: 'Zašto niska cijena ne privlači klijente' },
      { type: 'paragraph', text: 'Preniska cijena šalje krivi signal. Klijent koji plaća 50 eura mjesečno manje se angažira od klijenta koji plaća 200.' },
      { type: 'paragraph', text: 'Viša cijena privlači ozbiljnije klijente koji žele rezultat. Manje churna, manje objašnjavanja.' },

      { type: 'heading', text: 'Kako izračunati minimalnu cijenu' },
      { type: 'list', items: [
        'Koliko sati tjedno želiš raditi s klijentima',
        'Oduzmi 30 do 40 posto za administraciju i marketing',
        'Ostatak pomnoži s željenom satnicom',
        'Podijeli s brojem klijenata koje možeš voditi',
        'Dobiješ minimalnu cijenu po klijentu',
      ]},

      { type: 'heading', text: 'Koristi više paketa' },
      { type: 'paragraph', text: 'Jedan paket znači da svi dobivaju isto i plaćaju isto. S dva ili tri paketa ljudi sami biraju razinu.' },
      { type: 'paragraph', text: 'Primjer: Basic 99 eura, Pro 199 eura, VIP 399 eura. VIP klijenti drže prihod, Basic privlači nove.' },

      { type: 'heading', text: 'Kako komunicirati cijenu' },
      { type: 'paragraph', text: 'Cijena bez konteksta zvuči skupo. Stavi ju uz konkretnu uslugu i rezultat koji klijent dobiva.' },
      { type: 'paragraph', text: 'Umjesto “199 eura mjesečno”, napiši “program koji je pomogao 40 klijenata da smršave i ojačaju, 199 eura mjesečno”.' },

      { type: 'heading', text: 'Podizanje cijene postojećim klijentima' },
      { type: 'paragraph', text: 'Jednom godišnje, uz 30 dana najave, podigni cijenu za 10 do 20 posto. Većina lojalnih klijenata prihvaća bez problema.' },
    ],
  },
  {
    slug: 'automatizacija-u-coachingu',
    title: 'Što automatizirati u online fitness coachingu',
    excerpt: 'Koji zadaci oduzimaju najviše vremena i kako ih automatizirati bez gubitka osobnog pristupa.',
    category: 'Vodič',
    categorySlug: 'vodic',
    readTime: 6,
    publishedAt: '14. veljače 2026.',
    ...author,
    content: [
      { type: 'paragraph', text: 'Automatizacija ima lošu reputaciju. Treneri misle da će postati roboti koji šalju hladne poruke.' },
      { type: 'paragraph', text: 'Istina je drugačija: automatizira se rutina, ne odnos. Evo što automatizirati i što ostaviti sebi.' },

      { type: 'heading', text: 'Što smiješ automatizirati' },
      { type: 'list', items: [
        'Tjedni podsjetnik za check-in',
        'Poruka dobrodošlice za novog klijenta',
        'Podsjetnik za uplatu tri dana prije isteka',
        'Distribucija plana kad novi tjedan počne',
        'Potvrda online rezervacije sesije',
      ]},

      { type: 'heading', text: 'Što ne smiješ automatizirati' },
      { type: 'list', items: [
        'Osobna čestitka za postignut cilj',
        'Odgovor na tešku ili emocionalnu poruku',
        'Razgovor kad klijent razmišlja o odustajanju',
        'Prilagodba plana u iznimnoj situaciji',
        'Video pozivi i check-in uživo',
      ]},

      { type: 'heading', text: 'Princip: sustav radi, ti misliš' },
      { type: 'paragraph', text: 'Cilj nije manje kontakta s klijentom. Cilj je da ti ostane vremena za pravi coaching umjesto za slanje podsjetnika.' },

      { type: 'heading', text: 'Gdje početi' },
      { type: 'paragraph', text: 'Prvo podsjetnik za check-in. Kad to radi, dodaj onboarding i podsjetnik za uplatu. Korak po korak.' },
    ],
  },
  {
    slug: 'aplikacija-za-fitness-trenere',
    title: 'Aplikacija za fitness trenere: što tražiti',
    excerpt: 'Sve više trenera prelazi na digitalne alate. Evo ključnih funkcija koje moraju biti na popisu.',
    category: 'Alati',
    categorySlug: 'alati',
    readTime: 5,
    publishedAt: '10. veljače 2026.',
    ...author,
    content: [
      { type: 'paragraph', text: 'Potražnja za aplikacijama za trenere nikad nije bila veća. Postoji desetak rješenja, od generičkih alata do specijaliziranih platformi.' },
      { type: 'paragraph', text: 'U ovom tekstu prolazimo pet funkcija bez kojih aplikacija ne vrijedi tvojeg vremena.' },

      { type: 'heading', text: '1. Mobilna aplikacija za klijenta' },
      { type: 'paragraph', text: 'Klijent mora otvoriti plan s mobitela. Bez toga ideš korak unazad u odnosu na WhatsApp.' },
      { type: 'paragraph', text: 'Dobra aplikacija pokriva iOS i Android, a klijent ju dobiva besplatno.' },

      { type: 'heading', text: '2. Integrirano praćenje napretka' },
      { type: 'paragraph', text: 'Check-in podaci moraju se automatski spremati i prikazivati u grafu. Ručno prepisivanje nije održivo.' },

      { type: 'heading', text: '3. Planovi treninga i prehrane' },
      { type: 'paragraph', text: 'Mora postojati mogućnost predloška. Praviš jednom, mijenjaš za svakog klijenta u par minuta.' },

      { type: 'heading', text: '4. Komunikacija unutar aplikacije' },
      { type: 'paragraph', text: 'WhatsApp je popularan, ali poruke se gube i miješaju s privatnim razgovorima.' },
      { type: 'paragraph', text: 'Poruke unutar aplikacije drže povijest, uz plan i check-in istog klijenta.' },

      { type: 'heading', text: '5. Financijsko praćenje' },
      { type: 'paragraph', text: 'Pregled uplata, status pretplate i prihodi za mjesec moraju biti na jednom ekranu. Ručno vođenje uvijek propušta neku uplatu.' },

      { type: 'list', items: [
        'Mobilna aplikacija za klijente (iOS i Android)',
        'Automatski check-in i graf napretka',
        'Predlošci planova treninga i prehrane',
        'Poruke unutar aplikacije, ne WhatsApp',
        'Pregled uplata i prihoda',
        'GDPR usklađenost i sigurno čuvanje podataka',
      ]},

      { type: 'internal-link', text: '→ Pogledaj što UnitLift nudi za online trenere', href: '/hr/software-za-online-fitness-trenere' },
    ],
  },
  {
    slug: 'online-coaching-posao-vodic',
    title: 'Online trening: od nule do prvih klijenata',
    excerpt: 'Korak po korak: od registracije do prvih plaćenih klijenata. Što napraviti u prvom tjednu, mjesecu i kvartalu.',
    category: 'Rast',
    categorySlug: 'rast',
    readTime: 8,
    publishedAt: '3. veljače 2026.',
    ...author,
    content: [
      { type: 'paragraph', text: 'Online coaching posao djeluje komplicirano: stranica, mreže, planovi, komunikacija, naplata. Suština je jednostavna.' },
      { type: 'paragraph', text: 'Pomozi osobi postići cilj i naplati za to. Sve ostalo dolazi postupno. Evo plana za prvih 90 dana.' },

      { type: 'heading', text: 'Tjedan 1: temelji' },
      { type: 'paragraph', text: 'Prvo ide jasnoća. Kome pomažeš, s kojim problemom, na koji način. Bez toga je sve ostalo nasumično.' },
      { type: 'list', items: [
        'Definiraj idealnog klijenta',
        'Odredi jednu transformaciju koju nudiš',
        'Postavi aplikaciju za coaching (traje oko 5 minuta)',
        'Napravi jedan paket s jasnom cijenom',
      ]},

      { type: 'heading', text: 'Tjedan 2 do 4: prvi klijenti' },
      { type: 'paragraph', text: 'Prvi klijenti ne dolaze iz oglasa, nego iz mreže. Javi se osobama koje te već znaju.' },
      { type: 'paragraph', text: 'Pošalji poruku 20 do 30 kontakata. Ponudi kraći probni period. Cilj su dva do tri klijenta za testiranje.' },

      { type: 'heading', text: 'Mjesec 2 do 3: sustav i rast' },
      { type: 'paragraph', text: 'Kad imaš tri do pet plaćenih klijenata, postavi sustav koji radi bez tebe. Onboarding, check-in i podsjetnici.' },
      { type: 'paragraph', text: 'To oslobađa vrijeme za marketing i nove ljude. Bez sustava se zaglaviš na deset klijenata.' },

      { type: 'heading', text: 'Najčešće greške' },
      { type: 'list', items: [
        'Previše vremena na dizajn i logo, premalo na prodaju',
        'Preniska cijena iz straha od odbijanja',
        'Ručno slanje svega bez sustava',
        'Ne traženje recenzija od zadovoljnih klijenata',
        'Odustajanje prije šestog mjeseca',
      ]},

      { type: 'paragraph', text: 'UnitLift je napravljen za ovu fazu rasta. Postavljanje traje oko 5 minuta, a 14 dana besplatno je dovoljno da vidiš razliku.' },
    ],
  },
  {
    slug: 'online-coaching-treneri-platforma',
    title: 'Specijalizirane platforme naspram generičkih alata',
    excerpt: 'Google Docs, Notion i WhatsApp su besplatni. Ali koliko zapravo koštaju tvoje vrijeme?',
    category: 'Alati',
    categorySlug: 'alati',
    readTime: 5,
    publishedAt: '28. siječnja 2026.',
    ...author,
    content: [
      { type: 'paragraph', text: 'Generički alati imaju jednu prednost: besplatni su. Zato većina trenera počinje s njima.' },
      { type: 'paragraph', text: 'Plan u Google dokumentu, WhatsApp za komunikaciju, Revolut za uplatu. Funkcionira do određene razine.' },

      { type: 'heading', text: 'Problem s više alata' },
      { type: 'paragraph', text: 'S 10 klijenata podaci se šire po pet alata. Klijent A piše na WhatsApp, B na Instagram, C mailom.' },
      { type: 'paragraph', text: 'Check-ini u Google formi, planovi u dokumentima, uplate u Revolutu. Teško je znati tko što čeka.' },

      { type: 'heading', text: 'Što specijalizirana aplikacija donosi' },
      { type: 'list', items: [
        'Klijent, plan, poruke, check-in i uplate na jednom mjestu',
        'Automatski podsjetnici koji ne traže tvoju pažnju',
        'Profesionalan dojam: klijent ima svoju aplikaciju',
        'Podaci koji se čuvaju i postaju korisni za coaching',
        'GDPR usklađenost bez dodatnog posla',
      ]},

      { type: 'heading', text: 'Skriveni trošak dijeljenja alata' },
      { type: 'paragraph', text: 'Sat dnevno na administraciju je 365 sati godišnje. Uz 50 eura po satu to je preko 18 tisuća eura.' },
      { type: 'paragraph', text: 'Dobra aplikacija košta 20 do 50 eura mjesečno. Matematika je jasna.' },

      { type: 'paragraph', text: 'UnitLift je napravljen isključivo za online trenere. Svaka funkcija postoji jer ju je trener tražio.' },
    ],
  },
  {
    slug: 'kako-zaraditi-vise-kao-online-fitness-trener',
    title: 'Kako zaraditi više kao online trener',
    excerpt: 'Prihod ne ovisi samo o broju klijenata. Ovisi o sustavu, cijeni i vremenu po klijentu.',
    category: 'Rast',
    categorySlug: 'rast',
    readTime: 6,
    publishedAt: '20. siječnja 2026.',
    ...author,
    content: [
      { type: 'paragraph', text: 'Postoje dva puta do većeg prihoda: više klijenata ili veća cijena po klijentu. Oba rade, oba trebaju sustav.' },
      { type: 'paragraph', text: 'U ovom tekstu prolazimo tri strategije koje najbrže dižu zaradu, bez rada po 14 sati dnevno.' },

      { type: 'heading', text: 'Strategija 1: manje vremena po klijentu' },
      { type: 'paragraph', text: 'Izračunaj koliko sati tjedno trošiš po klijentu. Ako je više od dva sata, imaš prostor za optimizaciju.' },
      { type: 'paragraph', text: 'Predlošci i automatizacija smanje to na 30 do 45 minuta. S istim radom držiš dvostruko više klijenata.' },

      { type: 'heading', text: 'Strategija 2: više paketa' },
      { type: 'paragraph', text: 'Jedan paket znači svi plaćaju isto. Tri paketa (Basic, Pro, VIP) daju klijentima izbor.' },
      { type: 'paragraph', text: 'VIP klijenti plaćaju dva do četiri puta više za brži odgovor i mjesečni poziv. Isti ti, veći prihod.' },

      { type: 'heading', text: 'Strategija 3: dulje zadržavanje' },
      { type: 'paragraph', text: 'Novi klijent košta pet do sedam puta više od zadržavanja postojećeg. Ako klijent ostaje šest umjesto tri mjeseca, prihod je duplo veći.' },
      { type: 'paragraph', text: 'Ključ je sustav koji prati klijenta i reagira na vrijeme kad padne motivacija.' },

      { type: 'list', items: [
        'Automatiziraj rutinu: više klijenata za iste sate',
        'Uvedi više paketa: klijent sam bira razinu',
        'Produlji zadržavanje: manje akvizicije, veći prihod',
        'Naplati vrijednost, ne sate',
        'Ulaži u alat koji ti štedi pet sati tjedno',
      ]},
    ],
  },
  {
    slug: 'kako-naplatiti-online-coaching-hrvatska',
    title: 'Kako naplatiti online trening u Hrvatskoj',
    excerpt: 'Načini naplate, što je zakonski ispravno i kako ne propustiti ni jednu uplatu.',
    category: 'Posao',
    categorySlug: 'posao',
    readTime: 5,
    publishedAt: '18. ožujka 2026.',
    ...author,
    content: [
      { type: 'paragraph', text: 'Kako naplatiti klijente je jedno od prvih pitanja novih trenera. Odgovor ovisi o broju klijenata i statusu tvog posla.' },
      { type: 'paragraph', text: 'U ovom tekstu prolazimo tri najčešća načina i na što paziti kod svakog.' },

      { type: 'heading', text: '1. IBAN i bankovna doznaka' },
      { type: 'paragraph', text: 'Najjednostavnije. Klijent uplati na račun, ti izdaš potvrdu. Radi za mali broj klijenata.' },
      { type: 'paragraph', text: 'Problem: bez sustava teško je pratiti tko je platio i kome ističe paket.' },

      { type: 'heading', text: '2. PayPal i Revolut' },
      { type: 'paragraph', text: 'Praktični za jednokratne uplate. Klijent brzo plati, ti brzo vidiš.' },
      { type: 'paragraph', text: 'Nedostatak: nema automatske ponovne naplate. Klijent svaki mjesec mora ručno platiti.' },

      { type: 'heading', text: '3. Stripe' },
      { type: 'paragraph', text: 'Preporuka za ozbiljnije poslove. Klijent jednom unese karticu, sustav naplaćuje svaki mjesec.' },
      { type: 'paragraph', text: 'Nema propuštenih uplata, nema podsjećanja. Radi u cijeloj Europi, prihvaća sve kartice.' },

      { type: 'heading', text: 'Što s porezom i pravnom formom' },
      { type: 'list', items: [
        'Fiskalizacija je obavezna pri naplati usluga u Hrvatskoj',
        'Za ozbiljniji posao preporučuje se obrt ili j.d.o.o.',
        'PDV se ne plaća do 40 tisuća eura prometa godišnje',
        'Strane uplate kroz Stripe automatski se konvertiraju',
      ]},

      { type: 'heading', text: 'Praćenje uplata' },
      { type: 'paragraph', text: 'Najveći problem nije metoda, nego pregled. Tko je platio, tko kasni, kome ističe paket.' },
      { type: 'paragraph', text: 'UnitLift automatski prati status uplata po klijentu i prikazuje sve na jednom ekranu.' },
    ],
  },
  {
    slug: 'koliko-naplacivati-online-personal-trening',
    title: 'Koliko naplaćivati za online osobni trening',
    excerpt: 'Konkretni brojevi, faktori koji utječu na cijenu i kako prestati podcjenjivati vlastiti rad.',
    category: 'Posao',
    categorySlug: 'posao',
    readTime: 5,
    publishedAt: '20. ožujka 2026.',
    ...author,
    content: [
      { type: 'paragraph', text: 'Podcjenjivanje je najčešća greška novih online trenera. Postave nisku cijenu da ne bude preskupo i završe s previše posla za premalo novca.' },
      { type: 'paragraph', text: 'U ovom tekstu prolazimo realne brojeve na hrvatskom tržištu i kako izračunati cijenu koja ti odgovara.' },

      { type: 'heading', text: 'Što se zapravo prodaje' },
      { type: 'paragraph', text: 'Online osobni trening nije sat uživo s tobom. To je plan treninga, prehrana, tjedni check-in, poruke i prilagodbe.' },
      { type: 'paragraph', text: 'Kad klijent vidi sve to kao paket, lakše je opravdati cijenu nego uz “poslati ću ti PDF”.' },

      { type: 'heading', text: 'Realne cijene na hrvatskom tržištu' },
      { type: 'list', items: [
        'Početnik (do 2 godine iskustva): 50 do 80 eura mjesečno',
        'Srednji (2 do 5 godina, jasna niša): 80 do 150 eura',
        'Premium (5+ godina, specijalizacija): 150 do 300 eura',
        'VIP (video pozivi, dostupnost): 300 i više eura',
      ]},

      { type: 'heading', text: 'Što opravdava višu cijenu' },
      { type: 'paragraph', text: 'Specijalizacija podiže cijenu: postporođajni fitness, sportaši, stariji od 50.' },
      { type: 'paragraph', text: 'Fotografije i testimonijali klijenata rade više od samog broja godina iskustva.' },

      { type: 'heading', text: 'Kako izračunati svoju cijenu' },
      { type: 'paragraph', text: 'Želiš zaraditi 2500 eura mjesečno i imaš kapacitet za 30 klijenata. To je 83 eura po klijentu.' },
      { type: 'paragraph', text: 'Želiš raditi s 15 klijenata i isti prihod? Onda ti je cijena 167 eura po klijentu. Matematika je jednostavna.' },
    ],
  },
  {
    slug: 'kako-organizirati-online-klijente',
    title: 'Kako organizirati 20 online klijenata',
    excerpt: 'Konkretan sustav za upravljanje većim brojem klijenata. Što automatizirati i kako ne ispustiti nikoga.',
    category: 'Produktivnost',
    categorySlug: 'produktivnost',
    readTime: 6,
    publishedAt: '21. ožujka 2026.',
    ...author,
    content: [
      { type: 'paragraph', text: 'S pet klijenata Excel i WhatsApp rade. S dvadeset ne rade. Negdje između trener ili izgara ili izgradi sustav.' },
      { type: 'paragraph', text: 'U ovom tekstu prolazimo kako taj sustav izgleda u praksi.' },

      { type: 'heading', text: 'Princip: sustav, ne pamćenje' },
      { type: 'paragraph', text: 'Ne smiješ se sjetiti klijenta tek kad ti padne na pamet. Svaki klijent mora imati datum check-ina i datum uplate.' },
      { type: 'paragraph', text: 'Kad ti sustav govori što je na redu, ti radiš coaching umjesto pamćenja.' },

      { type: 'heading', text: 'Što automatizirati' },
      { type: 'list', items: [
        'Podsjetnici za check-in direktno klijentu',
        'Naplata kartice na dogovoreni datum',
        'Distribucija novog plana u aplikaciji',
        'Spremanje check-in podataka i fotografija',
      ]},

      { type: 'heading', text: 'Što ne automatizirati' },
      { type: 'paragraph', text: 'Prilagodbu plana, odgovore na osobna pitanja, razgovore kad klijent gubi motivaciju.' },
      { type: 'paragraph', text: 'Automatiziraj rutinu, osobni ton drži za pravi coaching.' },

      { type: 'heading', text: 'Tjedna rutina za 20 klijenata' },
      { type: 'list', items: [
        'Ponedjeljak ujutro: pregled pristiglih check-inova',
        'Ponedjeljak popodne: prilagodbe plana na temelju podataka',
        'Srijeda: odgovori na složenija pitanja',
        'Petak: tko nije predao check-in, tko nije platio',
      ]},

      { type: 'paragraph', text: 'S ovom rutinom 20 klijenata staje u 15 do 20 sati tjedno. Bez sustava isti broj pojede 40 sati.' },

      { type: 'paragraph', text: 'Ključ je alat napravljen za coaching, ne prilagođen iz generičkog alata za projekte.' },
    ],
  },
  {
    slug: 'trainerize-alternative-hrvatska',
    title: 'Trainerize alternative za trenere u Hrvatskoj',
    excerpt: 'Iskrena usporedba Trainerize-a i hrvatske aplikacije za online fitness trenere.',
    category: 'Alati',
    categorySlug: 'alati',
    readTime: 5,
    publishedAt: '22. ožujka 2026.',
    ...author,
    content: [
      { type: 'paragraph', text: 'Trainerize je jedna od najpoznatijih coaching platformi na svijetu. Pitanje je je li prava za trenera koji radi u Hrvatskoj.' },
      { type: 'paragraph', text: 'U ovom tekstu uspoređujemo Trainerize s hrvatskom aplikacijom UnitLift. Pošteno i bez uljepšavanja.' },

      { type: 'heading', text: 'Što je Trainerize' },
      { type: 'paragraph', text: 'Trainerize je kanadska platforma s velikim brojem funkcija: planovi, prehrana, check-ini, video, grupne sesije.' },
      { type: 'paragraph', text: 'Cijena počinje oko 5 dolara po klijentu mjesečno, s dodatcima može narasti do 200 dolara mjesečno.' },

      { type: 'heading', text: 'Prednosti Trainerize-a' },
      { type: 'list', items: [
        'Tisuće video vježbi u bazi',
        'Integracija s MyFitnessPal i drugim alatima',
        'Napredne grupne sesije',
        'Automatizacija i email kampanje',
      ]},

      { type: 'heading', text: 'Nedostaci za HR tržište' },
      { type: 'list', items: [
        'Sve je na engleskom, klijenti bez engleskog imaju problema',
        'Cijena u dolarima, komplicirani dodaci',
        'Previše funkcija koje većina trenera ne koristi',
        'Podrška samo na engleskom',
        'Nema prilagodbe za hrvatsku naplatu',
      ]},

      { type: 'heading', text: 'Kada birati Trainerize' },
      { type: 'paragraph', text: 'Trainerize ima smisla ako prodaješ programe međunarodnoj publici ili gradiš online školu s grupnim sesijama.' },

      { type: 'heading', text: 'Kada birati UnitLift' },
      { type: 'paragraph', text: 'UnitLift je za trenera koji radi s 5 do 150 klijenata. Sve je na hrvatskom, cijene u eurima, podrška na tvom jeziku.' },
      { type: 'paragraph', text: 'Ako počinješ ili rasteš na hrvatskom tržištu, jednostavnija aplikacija brže donosi rezultat. Uvijek možeš prijeći na kompleksniju.' },
    ],
  },
]
