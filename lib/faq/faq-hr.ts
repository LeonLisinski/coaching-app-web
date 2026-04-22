import type { FAQData } from './types'

export const faqHr: FAQData = {
  title: 'Često postavljana pitanja',
  subtitle: 'Sve što trebaš znati o UnitLiftu na jednom mjestu.',
  lastUpdated: 'Ožujak 2026.',
  categories: [
    {
      id: 'opcenito',
      title: 'Općenito',
      questions: [
        {
          q: 'Treba li mi kartica za registraciju?',
          a: 'Da, kartica je potrebna za aktivaciju, ali se ne naplaćuje odmah. Isprobaj UnitLift 14 dana besplatno. Naplata počinje tek ako nastaviš s plaćenim planom.',
        },
        {
          q: 'Koliko vremena treba za postavljanje?',
          a: 'Manje od 5 minuta. Postaviš profil, prilagodiš parametre i prvog klijenta možeš pozvati isti dan. Bez dugog onboardinga i kompleksne konfiguracije.',
        },
        {
          q: 'Na kojim uređajima radi UnitLift?',
          a: 'Web aplikacija radi u svim modernim preglednicima (Chrome, Firefox, Safari, Edge) i možeš je dodati na početni ekran kao PWA. Klijenti imaju zasebnu iOS i Android aplikaciju koja je besplatna.',
        },
        {
          q: 'Je li UnitLift GDPR sukladan?',
          a: 'Da. Svi podaci su na europskim serverima, zaštićeni TLS-om u prijenosu i AES-256 enkripcijom u pohrani. Više detalja u Politici privatnosti.',
        },
        {
          q: 'Koji jezici su podržani?',
          a: 'Web je dostupan na hrvatskom i engleskom. Klijentska aplikacija podržava iste jezike - klijent bira jezik pri prvom pokretanju.',
        },
      ],
    },
    {
      id: 'cijene-placanje',
      title: 'Cijene i plaćanje',
      questions: [
        {
          q: 'Koliko košta UnitLift?',
          a: 'Tri plana: Starter (29 €/mj - do 15 klijenata), Pro (59 €/mj - do 50 klijenata) i Scale (99 €/mj - do 150 klijenata). Svi planovi imaju iste funkcije, razlika je u broju klijenata. Svaki ima 14 dana besplatno.',
        },
        {
          q: 'Mogu li promijeniti plan?',
          a: 'Da, možeš ga promijeniti u bilo koje vrijeme iz postavki. Upgrade stupa na snagu odmah, naplata se obračunava proporcionalno za preostale dane.',
        },
        {
          q: 'Koji su načini plaćanja?',
          a: 'Prihvaćamo Visu, Mastercard, Apple Pay, Google Pay i SEPA izravno terećenje. Plaćanja idu kroz Stripe - jednu od pouzdanijih platformi za plaćanje.',
        },
        {
          q: 'Mogu li otkazati pretplatu?',
          a: 'Da, bez penala i bez obrazloženja. Otkažeš iz postavki u bilo koje vrijeme. I dalje imaš pristup do isteka plaćenog perioda.',
        },
        {
          q: 'Postoji li povrat novca?',
          a: 'Unutar 14 dana od prvog plaćanja imaš pravo na puni povrat bez obrazloženja (EU pravo na odustanak). Za povrat piši na support@unitlift.com.',
        },
      ],
    },
    {
      id: 'za-trenere',
      title: 'Za trenere',
      questions: [
        {
          q: 'Koliko klijenata mogu imati?',
          a: 'Starter - do 15, Pro - do 50, Scale - do 150 aktivnih klijenata. Iznad 150 na Scaleu plaća se dodatno 10 €/mj za svakih 25. Klijente možeš arhivirati i osloboditi mjesto za nove.',
        },
        {
          q: 'Mogu li imati vlastiti branding?',
          a: 'Da, branding je dostupan na Pro i Scale planu. U postavkama dodaš logo i odabereš primarne boje. Klijenti vide tvoj brand u aplikaciji umjesto UnitLifta.',
        },
        {
          q: 'Kako funkcioniraju check-ini?',
          a: 'Ti definiraš parametre check-ina za svakog klijenta (težina, koraci, san, raspoloženje, fotografija napretka). Klijenti ih ispunjavaju u aplikaciji, ti ih vidiš s grafovima u dashboardu. Sustav automatski šalje podsjetnike.',
        },
        {
          q: 'Kako pratim financije i plaćanja?',
          a: 'Imaš financijski pregled: prihode po periodu, status plaćanja svakog klijenta, dospjele uplate i ukupnu zaradu. Sve na jednom ekranu - znaš tko je platio i komu ističe pretplata.',
        },
        {
          q: 'Mogu li slati obavijesti klijentima?',
          a: 'Da, na svim planovima. Možeš slati ručne poruke ili postaviti automatske podsjetnike za check-in. Push obavijesti dolaze direktno u aplikaciju.',
        },
      ],
    },
    {
      id: 'za-klijente',
      title: 'Za klijente',
      questions: [
        {
          q: 'Moraju li klijenti plaćati za aplikaciju?',
          a: 'Ne. Klijentska aplikacija je besplatna za iOS i Android. Trener plaća pretplatu za pristup platformi - klijent ne vidi nikakve troškove.',
        },
        {
          q: 'Kako klijent dobiva pristup?',
          a: 'Trener šalje pozivnicu na email klijenta direktno iz platforme. Klijent klikne link, preuzme aplikaciju i napravi račun. Odmah ima pristup planovima, check-inu i chatu.',
        },
        {
          q: 'Mogu li klijenti komunicirati s trenerom?',
          a: 'Da. Aplikacija ima integrirani chat s trenerom. Sve poruke na jednom mjestu, bez razbacanih WhatsApp razgovora. Trener odgovara s mobitela ili računala.',
        },
        {
          q: 'Što se dogodi s podacima klijenta ako trener ugasi račun?',
          a: 'Svi osobni podaci brišu se u roku od 30 dana sukladno Politici privatnosti. Trener može izvesti planove prije gašenja računa da klijent zadrži sadržaj.',
        },
      ],
    },
    {
      id: 'tehnicko',
      title: 'Tehničko',
      questions: [
        {
          q: 'Je li pohrana podataka sigurna?',
          a: 'Da. Podaci su enkriptirani TLS-om u prijenosu i AES-256 enkripcijom u pohrani. Pristup je ograničen samo na ovlaštene osobe. Serveri su u EU, u skladu s GDPR-om.',
        },
        {
          q: 'Što se dogodi s podacima ako otkažem pretplatu?',
          a: 'Imaš pristup do kraja plaćenog perioda. Nakon toga podaci se čuvaju još 30 dana, pa se brišu. Sve podatke možeš izvesti iz postavki kad god želiš.',
        },
        {
          q: 'Radi li aplikacija bez interneta?',
          a: 'Web zahtijeva internet. Klijentska aplikacija može prikazati već učitane planove offline, ali za slanje check-ina i chat treba aktivna veza.',
        },
        {
          q: 'Kako kontaktirati podršku?',
          a: 'Piši na support@unitlift.com ili koristi obrazac na unitlift.com/kontakt. Odgovaramo unutar jednog radnog dana.',
        },
      ],
    },
  ],
}
