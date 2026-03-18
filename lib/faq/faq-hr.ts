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
          a: 'Ne. Isprobaj UnitLift 14 dana potpuno besplatno, bez unosa kreditne kartice. Kartica se traži tek kad odlučiš nastaviti s plaćenim planom.',
        },
        {
          q: 'Koliko vremena treba za postavljanje?',
          a: 'Manje od 5 minuta. Registracija je brza, odmah postavljaš profil i možeš pozvati prvog klijenta isti dan. Nema dugih onboarding procesa.',
        },
        {
          q: 'Na kojim uređajima radi UnitLift?',
          a: 'Web aplikacija za trenere radi na svim modernim preglednicima (Chrome, Firefox, Safari, Edge) i potpuno je responzivna — možeš je dodati na početni ekran mobitela kao PWA. Klijenti imaju zasebnu iOS i Android app.',
        },
        {
          q: 'Je li UnitLift GDPR sukladan?',
          a: 'Da. UnitLift je razvijen uz puno poštivanje GDPR regulative. Svi podaci pohranjeni su na sigurnim serverima. Sve veze zaštićene su TLS enkripcijom. Više u Politici privatnosti.',
        },
        {
          q: 'Koji jezici su podržani?',
          a: 'Web platforma dostupna je na hrvatskom i engleskom jeziku. Klijentska mobilna aplikacija podržava iste jezike.',
        },
      ],
    },
    {
      id: 'cijene-placanje',
      title: 'Cijene i plaćanje',
      questions: [
        {
          q: 'Koliko košta UnitLift?',
          a: 'UnitLift nudi tri plana: Starter (29 €/mj.), Pro (59 €/mj.) i Scale (99 €/mj.). Svi planovi uključuju 14-dnevno besplatno probno razdoblje. Godišnjom pretplatom uštediš do 20 % — Starter 290 €, Pro 590 €, Scale 990 € godišnje.',
        },
        {
          q: 'Mogu li promijeniti plan u bilo koje vrijeme?',
          a: 'Da. Možeš upgradati ili downgradati plan u bilo koje vrijeme iz postavki računa. Upgrade stupa na snagu odmah, a cijena se obračunava proporcionalno za preostale dane.',
        },
        {
          q: 'Kako funkcionira godišnja pretplata?',
          a: 'Godišnjom pretplatom plaćaš unaprijed za 12 mjeseci i automatski dobivaš popust od 20 %. Račun se šalje jednom, a pretplata se obnavlja godišnje ako je ne otkaže.',
        },
        {
          q: 'Koji su načini plaćanja?',
          a: 'Prihvaćamo sve glavne platne kartice (Visa, Mastercard), Apple Pay, Google Pay i SEPA direktno terećenje. Plaćanja su sigurno procesuirana putem Stripe platforme.',
        },
        {
          q: 'Mogu li otkazati pretplatu?',
          a: 'Da, bez ikakvih penala i bez obrazlaganja. Otkazivanje je moguće u bilo koje vrijeme iz postavki računa. Nakon otkazivanja i dalje imaš pristup svim funkcijama do isteka plaćenog perioda.',
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
          a: 'Starter plan podržava do 5 aktivnih klijenata, Pro do 20, a Scale plan nema ograničenja. Klijente možeš arhivirati i osloboditi mjesto za nove unutar limita plana.',
        },
        {
          q: 'Mogu li imati vlastiti branding?',
          a: 'Da, na Pro i Scale planovima. Dodaješ logo, biraš primarne boje i povežeš društvene mreže. Klijenti vide tvoj brand unutar aplikacije.',
        },
        {
          q: 'Kako funkcioniraju check-ini?',
          a: 'Sam definiraš parametre check-ina za svakog klijenta (npr. tjedna tjelesna masa, broj koraka, sate sna, raspoloženje, fotografija napretka). Klijenti ih ispunjavaju u app-u, a ti odmah vidiš odgovore s grafikonima napretka u dashboardu.',
        },
        {
          q: 'Mogu li slati push obavijesti klijentima?',
          a: 'Da, na Pro i Scale planovima. Možeš slati ručne obavijesti ili postaviti automatske podsjetnike za check-in, plaćanje ili treninge.',
        },
        {
          q: 'Kako pratim financije i plaćanja klijenata?',
          a: 'Na Pro i Scale planovima imaš pristup financijskim izvještajima: pregled prihoda po periodu, status plaćanja svakog klijenta, dospjele fakture i ukupna zarada. Sve na jednom ekranu.',
        },
      ],
    },
    {
      id: 'za-klijente',
      title: 'Za klijente',
      questions: [
        {
          q: 'Moraju li moji klijenti plaćati za app?',
          a: 'Ne. Klijentska app je potpuno besplatna za preuzimanje i korištenje na iOS i Android. Plaćaš samo ti kao trener za pristup platformi.',
        },
        {
          q: 'Kako klijent dobiva pristup?',
          a: 'Trener šalje pozivnicu na email klijenta. Klijent klikne na link, preuzme app na App Store ili Google Play, kreira račun i odmah ima pristup svim planovima i check-inovima.',
        },
        {
          q: 'Mogu li klijenti komunicirati s trenerom?',
          a: 'Da. Klijentska app ima integrirani chat s trenerom. Sve poruke su na jednom mjestu — nema više razbacanih WhatsApp razgovora.',
        },
        {
          q: 'Što se dogodi s podacima klijenta ako trener ugasi račun?',
          a: 'Svi osobni podaci i sadržaj vezani uz klijenta bit će obrisani sukladno Politici privatnosti u roku od 30 dana. Trener može eksportirati planove za klijenta prije gašenja računa.',
        },
      ],
    },
    {
      id: 'tehnicko',
      title: 'Tehničko',
      questions: [
        {
          q: 'Je li pohrana podataka sigurna?',
          a: 'Da. Svi podaci enkriptirani su TLS protokolom u prijenosu i AES-256 enkripcijom u pohrani. Pristup podacima ograničen je isključivo na ovlaštene osobe.',
        },
        {
          q: 'Što se dogodi s podacima ako otkažem pretplatu?',
          a: 'Nakon otkazivanja i dalje imaš pristup podacima do kraja plaćenog perioda. Nakon toga podaci se čuvaju još 30 dana pa se trajno brišu. U bilo koje vrijeme možeš eksportirati podatke iz postavki računa.',
        },
        {
          q: 'Radi li aplikacija bez interneta?',
          a: 'Web platforma zahtijeva internet vezu. Klijentska mobilna app može prikazati prethodno učitane planove i offline, ali za slanje check-ina i chat potrebna je veza.',
        },
        {
          q: 'Kako kontaktirati podršku?',
          a: 'Podršku možeš kontaktirati putem emaila support@unitlift.com. Odgovaramo unutar jednog radnog dana. Korisnici Pro i Scale plana imaju prioritetnu podršku.',
        },
      ],
    },
  ],
}
