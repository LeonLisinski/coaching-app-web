import type { LegalDocument } from './types'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'URL aplikacije nije konfiguriran'

export const termsHr: LegalDocument = {
  title: 'Uvjeti korištenja',
  lastUpdated: '18. ožujka 2025.',
  version: '1.0',
  intro: 'Ovi Uvjeti korištenja reguliraju korištenje aplikacije UnitLift. Molimo pročitajte ih pažljivo.',
  callout: 'Ukratko: korištenjem UnitLifta pristaješ na ove uvjete, način naplate i pravila korištenja. Otkaži kad hoćeš - detalji su u nastavku.',
  sections: [
    {
      id: 'prihvacanje',
      title: '1. Prihvaćanje uvjeta',
      content: [
        { text: `Ovi Uvjeti korištenja ("Uvjeti") reguliraju korištenje aplikacije UnitLift dostupne na ${APP_URL} i u mobilnoj aplikaciji (zajedno: "Usluga"). Uslugu pruža UnitLift, obrt za digitalne usluge, vl. Leon Lišinski ("mi", "Pružatelj usluge").` },
        { text: 'Registracijom ili korištenjem Usluge potvrđujete da ste pročitali, razumjeli i prihvatili ove Uvjete. Ako se ne slažete s Uvjetima, prestanite koristiti Uslugu.' },
      ],
    },
    {
      id: 'opis-usluge',
      title: '2. Opis usluge',
      content: [
        { text: 'UnitLift je platforma za online fitness trenerstvo. Omogućuje:' },
        {
          items: [
            'Trenerima: upravljanje klijentima, kreiranje planova treninga i prehrane, praćenje napretka klijenata, komunikaciju s klijentima i naplatu usluga.',
            'Klijentima: pristup planovima treninga i prehrane, prijave obroka i treninga, check-in praćenje te komunikaciju s trenerom.',
          ],
        },
        { text: 'Usluga je namijenjena punoljetnim osobama i profesionalnim trenerima. Osobama mlađim od 18 godina nije dopušteno korištenje Usluge bez suglasnosti roditelja ili zakonskog zastupnika.' },
      ],
    },
    {
      id: 'registracija',
      title: '3. Registracija i račun',
      content: [
        { text: 'Za korištenje Usluge potrebno je kreirati korisnički račun. Obvezujete se:' },
        {
          items: [
            'Pružiti točne i potpune podatke pri registraciji',
            'Redovito ažurirati podatke kako bi ostali točni',
            'Čuvati tajnost lozinke i ne dijeliti je s trećim osobama',
            'Odmah nas obavijestiti o neovlaštenom pristupu vašem računu',
          ],
        },
        { text: 'Odgovorni ste za sve aktivnosti na vašem računu. Mi ne preuzimamo odgovornost za štetu nastalu neovlaštenim korištenjem vašeg računa ako niste pravovremeno prijavili neovlašteni pristup.' },
      ],
    },
    {
      id: 'pretplate',
      title: '4. Pretplate i plaćanje',
      content: [
        { text: 'Pristup svim funkcijama Usluge zahtijeva aktivnu pretplatu. Pretplate su namijenjene trenerima. Plaćanja se obrađuju putem Stripe platforme. Prihvaćanjem ovih Uvjeta prihvaćate i Stripeove uvjete korištenja dostupne na https://stripe.com/legal.' },
        { text: 'UnitLift nije posrednik u plaćanjima između trenera i njihovih klijenata. Eventualni financijski odnos između trenera i klijenta odvija se izvan platforme i isključiva je odgovornost trenera.' },
        { subsection: '4.1 Naplata' },
        { text: 'Pretplata se naplaćuje unaprijed za odabrano razdoblje (mjesečno ili godišnje). Automatska obnova aktivna je ako je ne deaktivirate u postavkama računa.' },
        { subsection: '4.2 Povrat sredstava' },
        { text: 'Refundacije se obrađuju sukladno zakonskim propisima o zaštiti potrošača. Unutar 14 dana od prvog plaćanja imate pravo na povrat sredstava bez navođenja razloga (pravo na odustanak od ugovora za potrošače u EU), osim ako ste aktivno koristili Uslugu.' },
        { subsection: '4.3 Promjena cijena' },
        { text: 'Zadržavamo pravo promjene cijena uz prethodno obavještavanje od najmanje 30 dana.' },
      ],
    },
    {
      id: 'zabranjena-upotreba',
      title: '5. Zabranjena upotreba',
      content: [
        { text: 'Zabranjeno je:' },
        {
          items: [
            'Korištenje Usluge u nezakonite svrhe ili na način koji krši ove Uvjete',
            'Pristup sustavima ili podacima kojima nemate ovlaštenje',
            'Dijeljenje lažnih, varljivih ili štetnih sadržaja',
            'Ometanje rada Usluge ili infrastrukture',
            'Reverzno inženjering, dekompilacija ili pokušaj izvlačenja izvornog koda',
            'Preprodaja ili licenciranje Usluge trećim osobama bez našeg pisanog odobrenja',
            'Prikupljanje podataka o korisnicima bez njihovog pristanka',
          ],
        },
      ],
    },
    {
      id: 'sadrzaj-korisnika',
      title: '6. Sadržaj korisnika',
      content: [
        { text: 'Unosom sadržaja u Uslugu (planovi, komentari, poruke i sl.) zadržavate sva prava na tom sadržaju, ali nam dajete neisključivu, besplatnu licencu za pohranu i prikazivanje tog sadržaja u svrhu pružanja Usluge.' },
        { text: 'Odgovorni ste za sadržaj koji unosite. Zabranjeno je unositi sadržaj koji:' },
        {
          items: [
            'Krši prava trećih osoba (autorska prava, žigove itd.)',
            'Je uvredljiv, diskriminatoran, klevetničan ili prijeteći',
            'Sadrži zlonamjerni softver ili viruse',
          ],
        },
      ],
    },
    {
      id: 'intelektualno-vlasnistvo',
      title: '7. Intelektualno vlasništvo',
      content: [
        { text: 'Sva prava na Uslugu, uključujući softver, dizajn, logotipe, tekst i ostale materijale, vlasništvo su Pružatelja usluge ili njegovih davatelja licenci. Zabranjena je svaka upotreba bez prethodnog pisanog odobrenja.' },
      ],
    },
    {
      id: 'dostupnost',
      title: '8. Dostupnost usluge',
      content: [
        { text: 'Nastojimo osigurati visoku dostupnost Usluge, ali ne jamčimo neprekinuto ili pogreškama slobodno funkcioniranje. Zadržavamo pravo privremeno isključiti Uslugu radi održavanja ili nadogradnje, uz prethodno obavještavanje kad god je to moguće.' },
      ],
    },
    {
      id: 'odricanje-odgovornosti',
      title: '9. Odricanje od odgovornosti',
      content: [
        { text: 'Usluga se pruža "takva kakva jest" i "prema dostupnosti". Ne dajemo jamstva, izričita niti implicitna, u pogledu prikladnosti za određenu svrhu, pouzdanosti ili točnosti informacija.' },
        { note: 'UnitLift nije medicinska aplikacija. Sadržaj koji pruža trener u aplikaciji ne zamjenjuje profesionalni medicinski savjet. Koristite Uslugu na vlastitu odgovornost.' },
      ],
    },
    {
      id: 'ogranicenje-odgovornosti',
      title: '10. Ograničenje odgovornosti',
      content: [
        { text: 'U maksimalnoj mjeri dopuštenoj zakonom, Pružatelj usluge ne odgovara za:' },
        {
          items: [
            'Neizravnu, slučajnu ili posljedičnu štetu',
            'Gubitak podataka ili prihoda',
            'Štetu nastalu neovlaštenim pristupom vašem računu koji niste prijavili',
          ],
        },
        { text: 'Naša ukupna odgovornost prema vama ne može premašiti iznos koji ste platili za Uslugu u posljednjih 12 mjeseci.' },
      ],
    },
    {
      id: 'raskid',
      title: '11. Raskid',
      content: [
        { text: 'Možete raskinuti ugovor brisanjem svog računa u bilo kojem trenutku. Mi možemo suspendirati ili ukinuti vaš pristup Usluzi ako:' },
        {
          items: [
            'Kršite ove Uvjete',
            'Koristite Uslugu na način koji šteti drugim korisnicima ili nama',
            'Niste podmirili dospjele obveze plaćanja',
          ],
        },
        { text: 'U slučaju raskida od naše strane bez vaše krivice, refundirat ćemo razmjerni dio neiskorištene pretplate.' },
      ],
    },
    {
      id: 'izmjene-uvjeta',
      title: '12. Izmjene Uvjeta',
      content: [
        { text: 'Zadržavamo pravo izmjene ovih Uvjeta. O značajnim izmjenama obavijestit ćemo vas najmanje 14 dana unaprijed putem e-maila ili obavijesti u aplikaciji. Nastavak korištenja Usluge nakon izmjena smatra se prihvaćanjem novih Uvjeta.' },
      ],
    },
    {
      id: 'mjerodavno-pravo',
      title: '13. Mjerodavno pravo i nadležnost',
      content: [
        { text: 'Na ove Uvjete primjenjuje se pravo Republike Hrvatske. Za sve sporove koji bi mogli nastati iz ovih Uvjeta nadležan je sud u Osijeku, Hrvatska, osim ako prisilni propisi određuju drugačije nadležno tijelo.' },
        { text: 'Potrošači u EU imaju pravo koristiti platformu za online rješavanje sporova: https://ec.europa.eu/consumers/odr/' },
      ],
    },
    {
      id: 'kontakt',
      title: '14. Kontakt',
      content: [
        { text: 'Za pitanja vezana uz ove Uvjete kontaktirajte nas:' },
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
