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
          q: 'Je li potrebna kreditna kartica za registraciju?',
          a: 'Da, kartica je potrebna za aktivaciju probnog razdoblja, ali se ne naplaćuje odmah. Isprobaj UnitLift 14 dana potpuno besplatno — naplata počinje tek nakon isteka probnog razdoblja ako odlučiš nastaviti s plaćenim planom.',
        },
        {
          q: 'Koliko vremena treba za postavljanje?',
          a: 'Manje od 5 minuta. Registracija je brza i intuitivna — odmah postavljaš profil, prilagođavaš parametre i možeš pozvati prvog klijenta isti dan. Nema dugih onboarding procesa ni kompleksnih konfiguracija.',
        },
        {
          q: 'Na kojim uređajima radi UnitLift?',
          a: 'Web aplikacija za trenere radi na svim modernim preglednicima (Chrome, Firefox, Safari, Edge) i potpuno je responzivna — možeš je dodati na početni ekran mobitela kao PWA. Klijenti imaju zasebnu nativnu iOS i Android aplikaciju koja je besplatna za preuzimanje.',
        },
        {
          q: 'Je li UnitLift GDPR sukladan?',
          a: 'Da. UnitLift je razvijen uz puno poštivanje GDPR regulative. Svi podaci pohranjeni su na sigurnim europskim serverima, zaštićeni TLS enkripcijom u prijenosu i AES-256 u pohrani. Više detalja u Politici privatnosti.',
        },
        {
          q: 'Koji jezici su podržani?',
          a: 'Web platforma dostupna je na hrvatskom i engleskom jeziku. Klijentska mobilna aplikacija podržava iste jezike — klijent odabire jezik pri prvom pokretanju.',
        },
      ],
    },
    {
      id: 'cijene-placanje',
      title: 'Cijene i plaćanje',
      questions: [
        {
          q: 'Koliko košta UnitLift?',
          a: 'UnitLift nudi tri plana: Starter (29 €/mj. — do 15 klijenata), Pro (59 €/mj. — do 50 klijenata) i Scale (99 €/mj. — do 150 klijenata). Svi planovi uključuju iste funkcije — razlika je samo u broju klijenata koje možeš voditi. Svaki plan uključuje 14-dnevno besplatno probno razdoblje.',
        },
        {
          q: 'Mogu li promijeniti plan u bilo koje vrijeme?',
          a: 'Da. Možeš upgradati ili downgradati plan u bilo koje vrijeme iz postavki računa. Upgrade stupa na snagu odmah, a cijena se obračunava proporcionalno za preostale dane u tekućem periodu.',
        },
        {
          q: 'Koji su načini plaćanja?',
          a: 'Prihvaćamo sve glavne platne kartice (Visa, Mastercard), Apple Pay, Google Pay i SEPA direktno terećenje. Plaćanja su sigurno procesuirana putem Stripe platforme — jedan od najsigurnijih payment providera na svijetu.',
        },
        {
          q: 'Mogu li otkazati pretplatu?',
          a: 'Da, bez ikakvih penala i bez obrazlaganja. Otkazivanje je moguće u bilo koje vrijeme iz postavki računa — jednostavnim klikom. Nakon otkazivanja i dalje imaš pristup svim funkcijama do isteka plaćenog perioda.',
        },
        {
          q: 'Postoji li povrat novca?',
          a: 'Unutar 14 dana od prvog plaćanja imaš pravo na puni povrat sredstava bez navođenja razloga (EU pravo na odustanak od ugovora), osim ako si aktivno koristio uslugu. Za povrat se javi na support@unitlift.com.',
        },
      ],
    },
    {
      id: 'za-trenere',
      title: 'Za trenere',
      questions: [
        {
          q: 'Koliko klijenata mogu imati?',
          a: 'Starter plan podržava do 15 aktivnih klijenata, Pro do 50, a Scale do 150. Ako imaš više od 150 klijenata na Scale planu, cijena raste za +€10/mj za svakih dodatnih 25. Klijente možeš arhivirati i osloboditi mjesto za nove unutar limita plana.',
        },
        {
          q: 'Mogu li imati vlastiti branding?',
          a: 'Da, branding opcija dostupna je na svim planovima. U postavkama dodaš logo, odabereš primarne boje i povežeš profile društvenih mreža. Klijenti tada vide tvoj brand unutar aplikacije umjesto UnitLift branda — izgleda kao da si razvio vlastitu aplikaciju.',
        },
        {
          q: 'Kako funkcioniraju check-ini?',
          a: 'Sam definiraš parametre check-ina za svakog klijenta (npr. tjedna tjelesna masa, broj koraka, sate sna, raspoloženje, fotografija napretka). Klijenti ih ispunjavaju u aplikaciji, a ti odmah vidiš odgovore s grafikonima napretka u dashboardu. Sustav automatski šalje podsjetnike klijentima koji kasne.',
        },
        {
          q: 'Kako pratim financije i plaćanja klijenata?',
          a: 'Na svim planovima imaš pristup financijskom pregledu: prihodi po periodu, status plaćanja svakog klijenta, dospjele fakture i ukupna zarada. Sve na jednom ekranu — znaš točno tko je platio i kad kome ističe pretplata.',
        },
        {
          q: 'Mogu li slati obavijesti klijentima?',
          a: 'Da, na svim planovima. Možeš slati ručne obavijesti ili postaviti automatske podsjetnike za check-in. Push obavijesti dolaze direktno na klijentov mobitel kroz aplikaciju.',
        },
      ],
    },
    {
      id: 'za-klijente',
      title: 'Za klijente',
      questions: [
        {
          q: 'Moraju li moji klijenti plaćati za aplikaciju?',
          a: 'Ne. Klijentska aplikacija potpuno je besplatna za preuzimanje i korištenje na iOS i Android uređajima. Plaćaš samo ti kao trener za pristup coaching platformi — klijenti nikad ne vide nikakve troškove.',
        },
        {
          q: 'Kako klijent dobiva pristup?',
          a: 'Trener šalje pozivnicu na email klijenta direktno iz platforme. Klijent klikne na link, preuzme aplikaciju na App Store ili Google Play, kreira račun i odmah ima pristup svim planovima, check-inovima i chatu. Cijeli proces traje manje od 2 minute.',
        },
        {
          q: 'Mogu li klijenti komunicirati s trenerom?',
          a: 'Da. Klijentska aplikacija ima integrirani chat s trenerom. Sve poruke su na jednom mjestu — nema više razbacanih WhatsApp razgovora. Trener vidi sve poruke u web platformi i može odgovarati s mobitela ili računala.',
        },
        {
          q: 'Što se dogodi s podacima klijenta ako trener ugasi račun?',
          a: 'Svi osobni podaci i sadržaj vezani uz klijenta bit će obrisani sukladno Politici privatnosti u roku od 30 dana. Trener može eksportirati planove za klijenta prije gašenja računa kako bi klijent zadržao pristup sadržaju.',
        },
      ],
    },
    {
      id: 'tehnicko',
      title: 'Tehničko',
      questions: [
        {
          q: 'Je li pohrana podataka sigurna?',
          a: 'Da. Svi podaci enkriptirani su TLS protokolom u prijenosu i AES-256 enkripcijom u pohrani. Pristup podacima ograničen je isključivo na ovlaštene osobe. Infrastruktura je hostana na EU serverima u skladu s GDPR zahtjevima.',
        },
        {
          q: 'Što se dogodi s podacima ako otkažem pretplatu?',
          a: 'Nakon otkazivanja i dalje imaš pristup podacima do kraja plaćenog perioda. Nakon toga podaci se čuvaju još 30 dana pa se trajno brišu. U bilo koje vrijeme možeš eksportirati sve podatke iz postavki računa.',
        },
        {
          q: 'Radi li aplikacija bez interneta?',
          a: 'Web platforma zahtijeva internet vezu. Klijentska mobilna aplikacija može prikazati prethodno učitane planove i offline, ali za slanje check-ina i chat potrebna je aktivna internet veza.',
        },
        {
          q: 'Kako kontaktirati podršku?',
          a: 'Podršku možeš kontaktirati putem emaila support@unitlift.com ili kroz kontakt obrazac na stranici unitlift.com/kontakt. Odgovaramo unutar jednog radnog dana.',
        },
      ],
    },
  ],
}
