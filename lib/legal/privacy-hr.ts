import type { LegalDocument } from './types'

export const privacyHr: LegalDocument = {
  title: 'Politika privatnosti',
  lastUpdated: '20. ožujka 2025.',
  version: '1.0',
  intro: 'Ova Politika privatnosti opisuje kako prikupljamo, koristimo i štitimo vaše osobne podatke.',
  callout: 'Ukratko: tvoji podaci su sigurni. Ne dijelimo ih s trećima i ne prodajemo nikome. Otkaži kad hoćeš - detalji su u nastavku.',
  sections: [
    {
      id: 'tko-smo',
      title: '1. Tko smo',
      content: [
        { text: 'Voditelj obrade podataka je:' },
        {
          items: [
            'UnitLift, obrt za digitalne usluge, vl. Leon Lišinski',
            'Vijenac Ivana Meštrovića 80, Osijek, Hrvatska',
            'OIB: 61111415884',
            'Matični broj obrta: 99113821',
            'E-mail: support@unitlift.com',
          ],
        },
      ],
    },
    {
      id: 'koje-podatke',
      title: '2. Koje podatke prikupljamo',
      content: [
        { subsection: '2.1 Podaci koje vi izravno pružate' },
        {
          items: [
            'Ime i prezime',
            'E-mail adresa',
            'Fotografija profila (avatar) - opcionalno',
            'Podaci o treningu i prehrani (planovi, obroci, recepti, namirnice)',
            'Podaci za check-in koje trener definira - primjerice broj koraka, sati sna, raspoloženje i slično',
            'Poruke razmijenjene između trenera i klijenta unutar aplikacije',
          ],
        },
        { subsection: '2.2 Podaci koji se prikupljaju automatski' },
        {
          items: [
            'Tehnički podaci o uređaju (tip uređaja, operativni sustav, verzija aplikacije)',
            'Podaci o korištenju usluge (datum i vrijeme prijave, pregledane stranice)',
            'IP adresa',
          ],
        },
        { subsection: '2.3 Podaci o plaćanju' },
        { text: 'Plaćanja se obrađuju putem platforme Stripe. Mi ne pohranjujemo podatke o platnim karticama. Stripe obrađuje podatke u skladu sa standardom PCI DSS. Detalje možete pronaći na https://stripe.com/privacy.' },
        { note: 'UnitLift nije posrednik u plaćanjima između trenera i njihovih klijenata. Plaćanja između trenera i klijenata odvijaju se izvan platforme - trener ih evidentira u aplikaciji isključivo u svrhu vlastitog financijskog praćenja.' },
        { subsection: '2.4 Push obavijesti' },
        { text: 'Ako pristanete na primanje push obavijesti, prikupljamo token uređaja potreban za slanje obavijesti. Možete odustati u postavkama svog uređaja u bilo kojem trenutku.' },
      ],
    },
    {
      id: 'svrha-obrade',
      title: '3. Svrha i pravna osnova obrade',
      content: [
        { text: 'Vaše podatke obrađujemo za sljedeće svrhe:' },
        {
          items: [
            'Pružanje usluge - izvršenje ugovora (čl. 6. st. 1. toč. b) GDPR-a)',
            'Komunikacija između trenera i klijenta - izvršenje ugovora',
            'Slanje push obavijesti - vaš pristanak (čl. 6. st. 1. toč. a) GDPR-a)',
            'Sigurnost i prevencija prijevara - legitimni interes (čl. 6. st. 1. toč. f) GDPR-a)',
            'Ispunjenje zakonskih obveza - pravna obveza (čl. 6. st. 1. toč. c) GDPR-a)',
          ],
        },
      ],
    },
    {
      id: 'dijeljenje-podataka',
      title: '4. Dijeljenje podataka s trećim stranama',
      content: [
        { text: 'Vaše podatke ne prodajemo trećim stranama. Podatke možemo dijeliti s:' },
        {
          items: [
            'Supabase Inc. - pohrana podataka i autentifikacija (SAD; zaštita putem standardnih ugovornih klauzula)',
            'Vercel Inc. - hosting web aplikacije',
            'Stripe Inc. - obrada plaćanja',
            'Resend Inc. - transakcijska dostava e-pošte (kontakt obrazac)',
            'Davatelji push obavijesti - Apple (APNs) i Google (FCM)',
          ],
        },
        { text: 'Svi navedeni primatelji podataka obrađuju podatke isključivo prema našim uputama i obvezani su odgovarajućim ugovorima o obradi podataka.' },
      ],
    },
    {
      id: 'medunarodni-prijenos',
      title: '5. Međunarodni prijenos podataka',
      content: [
        { text: 'Neki od naših pružatelja usluga nalaze se izvan Europskog gospodarskog prostora (EGP), primjerice u SAD-u. U tim slučajevima primjenjuju se odgovarajuće zaštitne mjere sukladno GDPR-u, uključujući standardne ugovorne klauzule Europske komisije.' },
      ],
    },
    {
      id: 'cuvanje-podataka',
      title: '6. Čuvanje podataka',
      content: [
        { text: 'Vaše osobne podatke čuvamo onoliko dugo koliko je potrebno za ispunjenje svrha opisanih u ovoj Politici privatnosti, ili koliko nalaže zakon.' },
        { text: 'Nakon brisanja računa, osobni podaci se brišu u roku od 30 dana, osim podataka koje smo dužni čuvati prema zakonskim propisima.' },
      ],
    },
    {
      id: 'vasa-prava',
      title: '7. Vaša prava',
      content: [
        { text: 'Kao ispitanik u smislu GDPR-a imate sljedeća prava:' },
        {
          items: [
            'Pravo na pristup - možete zatražiti kopiju svojih osobnih podataka',
            'Pravo na ispravak - možete zatražiti ispravak netočnih podataka',
            'Pravo na brisanje ("pravo na zaborav") - možete zatražiti brisanje svojih podataka',
            'Pravo na ograničenje obrade - možete zatražiti privremenu obustavu obrade',
            'Pravo na prenosivost podataka - možete zatražiti podatke u strojno čitljivom formatu',
            'Pravo na prigovor - možete se protiviti obradi temeljenoj na legitimnom interesu',
            'Pravo na povlačenje pristanka - ako je obrada temeljena na pristanku, možete ga povući u bilo kojem trenutku',
          ],
        },
        { text: 'Zahtjeve upućujte na: support@unitlift.com' },
        { text: 'Također imate pravo podnijeti pritužbu nadzornom tijelu. U Republici Hrvatskoj nadležna je Agencija za zaštitu osobnih podataka (AZOP), www.azop.hr.' },
      ],
    },
    {
      id: 'brisanje-racuna',
      title: '8. Brisanje računa',
      content: [
        { text: 'Možete zatražiti brisanje svog računa i svih povezanih podataka:' },
        {
          items: [
            'Unutar aplikacije: Postavke → Moj račun → Izbriši račun',
            'E-mailom na: support@unitlift.com',
          ],
        },
        { text: 'Nakon potvrde zahtjeva, vaš račun i osobni podaci bit će izbrisani u roku od 30 dana.' },
      ],
    },
    {
      id: 'sigurnost',
      title: '9. Sigurnost podataka',
      content: [
        { text: 'Primjenjujemo tehničke i organizacijske mjere zaštite kako bismo zaštitili vaše podatke od neovlaštenog pristupa, gubitka ili uništenja.' },
        {
          items: [
            'Sve veze su zaštićene TLS enkripcijom',
            'Pristup podacima ograničen je na ovlaštene osobe',
          ],
        },
      ],
    },
    {
      id: 'kolacici',
      title: '10. Kolačići i slične tehnologije',
      content: [
        { text: 'Web aplikacija može koristiti nužne kolačiće za funkcioniranje usluge (autentifikacija, sesija). Ne koristimo kolačiće za praćenje ili oglašavanje.' },
      ],
    },
    {
      id: 'maloljetnici',
      title: '11. Maloljetnici',
      content: [
        { text: 'Usluga nije namijenjena osobama mlađim od 18 godina. Ne prikupljamo namjerno osobne podatke djece. Ako saznamo da smo prikupili podatke djeteta, odmah ćemo ih izbrisati.' },
      ],
    },
    {
      id: 'izmjene-politike',
      title: '12. Izmjene ove Politike privatnosti',
      content: [
        { text: 'Zadržavamo pravo izmjene ove Politike. O značajnim izmjenama obavijestit ćemo vas putem e-maila ili obavijesti unutar aplikacije. Nastavak korištenja usluge nakon objave izmjena smatra se prihvaćanjem novih uvjeta.' },
      ],
    },
    {
      id: 'kontakt',
      title: '13. Kontakt',
      content: [
        { text: 'Za sva pitanja u vezi s privatnošću kontaktirajte nas:' },
        {
          items: [
            'UnitLift, obrt za digitalne usluge, vl. Leon Lišinski',
            'Vijenac Ivana Meštrovića 80, Osijek, Hrvatska',
            'E-mail: support@unitlift.com',
          ],
        },
      ],
    },
  ],
}
